import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface AIResponse {
  text: string;
  type: 'text' | 'song' | 'event' | 'booking';
  data?: any;
}

export const generateAIResponse = async (topic: string, context?: string): Promise<AIResponse> => {
  try {
    const { data: settings } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'OPENROUTER_API_KEY')
      .maybeSingle();

    if (!settings?.value) {
      throw new Error('API key not configured');
    }

    const systemPrompt = `You are DJ John, a charismatic radio host and sound expert for Soundmaster. 
    You can help with:
    - Finding songs in the database
    - Making song recommendations
    - Booking appointments
    - Answering questions about services
    Keep responses engaging and fun - like a real radio DJ. Include emojis and sound-related terms.
    ${context || ''}`;

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
          { role: "system", content: systemPrompt },
          { role: "user", content: topic }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Check if response contains song-related content
    if (topic.toLowerCase().includes('song') || topic.toLowerCase().includes('music')) {
      const { data: songs } = await supabase
        .from('songs')
        .select('*')
        .textSearch('title', topic);

      if (songs && songs.length > 0) {
        return {
          text: aiResponse,
          type: 'song',
          data: songs
        };
      }
    }

    // Check if response is about booking
    if (topic.toLowerCase().includes('book') || topic.toLowerCase().includes('appointment')) {
      return {
        text: aiResponse,
        type: 'booking'
      };
    }

    // Check if response is about events
    if (topic.toLowerCase().includes('event')) {
      const { data: events } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
        .limit(3);

      if (events && events.length > 0) {
        return {
          text: aiResponse,
          type: 'event',
          data: events
        };
      }
    }

    return {
      text: aiResponse,
      type: 'text'
    };
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

export const processAIResponse = async (response: AIResponse) => {
  switch (response.type) {
    case 'song':
      // Handle song recommendations
      return `${response.text}\n\nFound these songs:\n${response.data.map((song: any) => 
        `- ${song.title} by ${song.artist}`).join('\n')}`;
    
    case 'booking':
      // Handle booking-related responses
      return `${response.text}\n\nWould you like me to help you schedule an appointment?`;
    
    case 'event':
      // Handle event-related responses
      return `${response.text}\n\nUpcoming events:\n${response.data.map((event: any) => 
        `- ${event.title} on ${new Date(event.date).toLocaleDateString()}`).join('\n')}`;
    
    default:
      return response.text;
  }
};