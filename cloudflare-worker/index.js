import { createClient } from '@supabase/supabase-js';
import { Ai } from '@cloudflare/ai';
import { corsHeaders } from './cors';

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
      
      if (request.method === 'POST') {
        const { searchQuery, type } = await request.json();
        
        if (type === 'chat') {
          // Use Cloudflare AI model for chat
          const messages = [
            {
              role: "system",
              content: `You are a helpful music assistant for Soundmaster. You can help with:
              - Finding songs in our database
              - Making song requests
              - Booking appointments
              - Answering questions about our services
              Always be friendly and professional. If you need to search for songs, use the database.`
            },
            { role: "user", content: searchQuery }
          ];

          // Call Cloudflare AI API
          const ai = new Ai(env.AI);
          const response = await ai.run('@cf/meta/llama-2-7b-chat-int8', {
            messages: messages,
            stream: false
          });

          let aiResponse = response.response;

          // If the message seems to be about searching for songs, also search the database
          if (searchQuery.toLowerCase().includes('song') || searchQuery.toLowerCase().includes('music')) {
            const { data: songs, error } = await supabase
              .from('songs')
              .select('*')
              .textSearch('title', searchQuery, {
                type: 'websearch',
                config: 'english'
              });

            if (songs && songs.length > 0) {
              aiResponse += "\n\nI found these songs in our database:\n" + 
                songs.map(song => `- ${song.title} by ${song.artist}`).join('\n');
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