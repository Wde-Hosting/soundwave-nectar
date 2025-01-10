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
      const url = new URL(request.url);
      const targetUrl = url.searchParams.get('url');

      if (!targetUrl) {
        throw new Error('No target URL provided');
      }

      // Forward the request to the target URL with specific headers for Icecast
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: {
          'User-Agent': request.headers.get('User-Agent') || 'Cloudflare Worker',
          'Accept': '*/*',
          'Connection': 'keep-alive',
          'Icy-MetaData': '1',
        },
      });

      // Create a new response with CORS headers
      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...corsHeaders,
          'Content-Type': response.headers.get('Content-Type') || 'audio/mpeg',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });

      return modifiedResponse;
    } catch (error) {
      console.error('Proxy error:', error);
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