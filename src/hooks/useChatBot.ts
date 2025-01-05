import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export type Message = {
  type: 'user' | 'bot';
  content: string;
};

export const useChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { type: 'user', content: message }]);

      // Get OpenRouter API key from settings
      const { data: settings, error: settingsError } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'OPENROUTER_API_KEY')
        .maybeSingle();

      if (settingsError || !settings?.value) {
        throw new Error('OpenRouter API key not configured');
      }

      // Call OpenRouter API directly
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
              content: "You are a helpful music assistant for Soundmaster, a professional sound and music service provider in Tzaneen & Limpopo."
            },
            { role: "user", content: message }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenRouter');
      }

      const data = await response.json();
      const botResponse = data.choices[0]?.message?.content || 'Sorry, I could not process your request.';
      
      setMessages(prev => [...prev, { type: 'bot', content: botResponse }]);
      setMessage("");
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Unable to connect to chat service. Please try again later.",
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