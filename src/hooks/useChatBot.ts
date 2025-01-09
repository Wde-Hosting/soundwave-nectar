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
      setMessages(prev => [...prev, { type: 'bot', content: "You don't have permission to use admin commands." }]);
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

      // Check for admin commands
      if (message.startsWith('/admin')) {
        const isAdminCommand = await handleAdminCommand(message);
        if (isAdminCommand) {
          setMessage("");
          return;
        }
      }

      const { data: settings, error: settingsError } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'OPENROUTER_API_KEY')
        .maybeSingle();

      if (settingsError) {
        console.error('Settings error:', settingsError);
        throw new Error('Failed to fetch API key from settings');
      }

      if (!settings?.value) {
        throw new Error('OpenRouter API key not found in settings. Please configure it in the settings.');
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${settings.value}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Soundmaster Assistant',
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            {
              role: "system",
              content: `You are a helpful music assistant for Soundmaster, a professional sound and music service provider in Tzaneen & Limpopo. You help with:
              - Finding songs in our database
              - Making song requests
              - Booking appointments
              - Answering questions about our services
              - Providing music recommendations
              Always be friendly and professional.`
            },
            { role: "user", content: message }
          ],
          temperature: 0.7,
          max_tokens: 1000,
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('OpenRouter API error:', errorData);
        throw new Error(`OpenRouter API error: ${response.statusText || 'Failed to get response'}`);
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
      
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      setMessage("");
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unable to connect to chat service",
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