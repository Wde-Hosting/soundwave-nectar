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
        .eq('key', 'OPENAI_API_KEY')
        .maybeSingle();

      if (!settings?.value) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.value}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: "system",
              content: `You are a friendly DJ assistant with the personality of a wise lion. 
              Your responses should be energetic and include lion-themed metaphors when appropriate.
              Keep responses under 50 words. Focus on:
              - Music recommendations with roaring enthusiasm
              - Event booking with pride
              - Technical support with lion's courage
              Always be helpful and maintain your lion personality!`
            },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 150,
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
          .limit(3);

        if (songs && songs.length > 0) {
          const songList = songs
            .map(song => `${song.title} - ${song.artist}`)
            .join('\n');
          setMessages(prev => [...prev, { 
            type: 'bot', 
            content: `${botResponse}\n\nROAR! Here are some tracks from my pride:\n${songList}`
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
        description: "The lion's connection to the pride is temporarily down. Please try again later! 🦁",
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