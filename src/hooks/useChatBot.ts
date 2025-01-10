import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAdmin } from "@/contexts/AdminContext";
import { useNavigate } from "react-router-dom";

export type Message = {
  type: 'user' | 'bot';
  content: string;
};

export const useChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleAdminCommand = async (command: string) => {
    if (!isAdmin) {
      setMessages(prev => [...prev, { type: 'bot', content: "Admin access required." }]);
      return true;
    }

    const adminCommands = {
      '/admin stats': () => navigate('/admin/stats'),
      '/admin users': () => navigate('/admin/users'),
      '/admin settings': () => navigate('/admin/settings'),
    };

    const commandFn = adminCommands[command as keyof typeof adminCommands];
    if (commandFn) {
      commandFn();
      return true;
    }

    return false;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { type: 'user', content: message }]);

      if (message.startsWith('/admin')) {
        const isAdminCommand = await handleAdminCommand(message);
        if (isAdminCommand) {
          setMessage("");
          setIsLoading(false);
          return;
        }
      }

      const { data: settings } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'OPENROUTER_API_KEY')
        .maybeSingle();

      if (!settings?.value) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.value}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: "system",
              content: `You are a DJ assistant. Keep responses under 20 words. Be direct and helpful. Focus on:
              - Quick song suggestions
              - Brief booking help
              - Short music tips
              Always be concise and practical.`
            },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 100, // Reduced for shorter responses
        })
      });

      if (!response.ok) {
        throw new Error('API error');
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'Error occurred';
      
      // Check for song-related queries
      if (message.toLowerCase().includes('song') || 
          message.toLowerCase().includes('music') || 
          message.toLowerCase().includes('play')) {
        const { data: songs } = await supabase
          .from('songs')
          .select('*')
          .textSearch('title', message)
          .limit(3); // Limit to top 3 matches

        if (songs && songs.length > 0) {
          const songList = songs
            .map(song => `${song.title} - ${song.artist}`)
            .join('\n');
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: `${botResponse}\n\nFound these songs:\n${songList}`
          }]);
        } else {
          setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
        }
      } else {
        setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      }

      setMessage("");
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: "Chat service unavailable",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    message,
    messages,
    isLoading,
    setMessage,
    handleSendMessage,
  };
};