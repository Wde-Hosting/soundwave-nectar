import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export const generateAIResponse = async (topic: string): Promise<string> => {
  try {
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
            content: "You are DJ John, a charismatic radio host and sound expert. Keep responses short, engaging, and fun - like a real radio DJ. Include emojis and sound-related terms."
          },
          {
            role: "user",
            content: `Tell me about ${topic} in an entertaining radio DJ style.`
          }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
    
  } catch (error) {
    console.error('AI Response error:', error);
    toast({
      title: "Error",
      description: "Couldn't connect to our AI DJ right now. Please try again later!",
      variant: "destructive",
    });
    throw error;
  }
};