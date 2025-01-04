import { createClient } from '@supabase/supabase-js';
import { Ai } from '@cloudflare/ai';
import { corsHeaders } from './cors';

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders
      });
    }

    try {
      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
      
      if (request.method === 'POST') {
        const { searchQuery, type } = await request.json();
        
        if (type === 'chat') {
          // Enhanced system prompt for better context
          const messages = [
            {
              role: "system",
              content: `You are a helpful music assistant for Soundmaster, a professional sound and music service provider in Tzaneen & Limpopo. You can help with:
              - Finding songs in our database
              - Making song requests
              - Booking appointments
              - Answering questions about our services
              - Providing music recommendations
              - Explaining music terminology
              Always be friendly, professional and knowledgeable about music. If you need to search for songs, use the database.`
            },
            { role: "user", content: searchQuery }
          ];

          // Call Cloudflare AI API with enhanced parameters
          const ai = new Ai(env.AI);
          const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
            messages: messages,
            stream: false,
            max_tokens: 500,
            temperature: 0.7,
            top_p: 0.95
          });

          let aiResponse = response.response;

          // Enhanced song search integration
          if (searchQuery.toLowerCase().includes('song') || 
              searchQuery.toLowerCase().includes('music') || 
              searchQuery.toLowerCase().includes('play')) {
            const { data: songs, error } = await supabase
              .from('songs')
              .select('*')
              .textSearch('title', searchQuery, {
                type: 'websearch',
                config: 'english'
              });

            if (songs && songs.length > 0) {
              aiResponse += "\n\nI found these songs in our database:\n" + 
                songs.map(song => `- ${song.title} by ${song.artist}${song.is_karaoke ? ' (Karaoke version available)' : ''}`).join('\n');
            }
          }

          return new Response(JSON.stringify({ response: aiResponse }), {
            headers: {
              ...corsHeaders,
              'Content-Type': 'application/json',
            },
          });
        }

        // Keep existing semantic search functionality
        const { data: songs, error } = await supabase
          .from('songs')
          .select('*')
          .textSearch('title', searchQuery, {
            type: 'websearch',
            config: 'english'
          });

        if (error) throw error;

        return new Response(JSON.stringify({ songs }), {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        });
      }

      return new Response('Method not allowed', {
        status: 405,
        headers: corsHeaders,
      });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      });
    }
  },
};