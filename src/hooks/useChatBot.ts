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
      
      const { data, error } = await supabase
        .from('settings')
        .select('value')
        .eq('key', 'OPENROUTER_API_KEY')
        .maybeSingle();

      if (error) {
        throw new Error('Failed to fetch API key from settings');
      }

      if (!data?.value) {
        toast({
          title: "Configuration Error",
          description: "OpenRouter API key is not configured. Please contact the administrator.",
          variant: "destructive",
        });
        return;
      }

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${data.value}`,
          'HTTP-Referer': window.location.origin,
        },
        body: JSON.stringify({
          model: 'mistralai/mistral-7b-instruct',
          messages: [
            { role: 'system', content: 'You are a helpful music teaching assistant.' },
            { role: 'user', content: message }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from OpenRouter API');
      }
      
      const responseData = await response.json();
      const aiResponse = responseData.choices[0]?.message?.content || 'Sorry, I could not process your request.';
      
      setMessages(prev => [...prev, { type: 'bot', content: aiResponse }]);
      setMessage("");
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
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