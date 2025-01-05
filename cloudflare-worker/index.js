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
          // Get OpenRouter API key from settings
          const { data: settings, error: settingsError } = await supabase
            .from('settings')
            .select('value')
            .eq('key', 'OPENROUTER_API_KEY')
            .maybeSingle();

          if (settingsError || !settings?.value) {
            throw new Error('OpenRouter API key not configured');
          }

          // Call OpenRouter API
          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${settings.value}`,
              'HTTP-Referer': request.headers.get('origin') || 'https://lovable.dev',
            },
            body: JSON.stringify({
              model: 'mistralai/mistral-7b-instruct',
              messages: [
                {
                  role: "system",
                  content: `You are a helpful music assistant for Soundmaster, a professional sound and music service provider in Tzaneen & Limpopo. You can help with:
                  - Finding songs in our database
                  - Making song requests
                  - Booking appointments
                  - Answering questions about our services
                  - Providing music recommendations
                  - Explaining music terminology
                  Always be friendly, professional and knowledgeable about music.`
                },
                { role: "user", content: searchQuery }
              ]
            })
          });

          if (!response.ok) {
            throw new Error('Failed to get response from OpenRouter');
          }

          const aiResponse = await response.json();
          let responseText = aiResponse.choices[0]?.message?.content || 'Sorry, I could not process your request.';

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
              responseText += "\n\nI found these songs in our database:\n" + 
                songs.map(song => `- ${song.title} by ${song.artist}${song.is_karaoke ? ' (Karaoke version available)' : ''}`).join('\n');
            }
          }

          return new Response(JSON.stringify({ response: responseText }), {
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