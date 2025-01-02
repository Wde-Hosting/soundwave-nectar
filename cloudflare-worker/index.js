import { createClient } from '@supabase/supabase-js';
import { corsHeaders } from './cors';

export default {
  async fetch(request, env) {
    // Handle CORS preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
      });
    }

    try {
      const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
      
      if (request.method === 'POST') {
        const { searchQuery } = await request.json();
        
        // Perform semantic search on the songs table
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
      console.error('Error in semantic search:', error);
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