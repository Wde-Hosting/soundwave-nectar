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

      // Forward the request to the target URL
      const response = await fetch(targetUrl, {
        method: request.method,
        headers: {
          'User-Agent': request.headers.get('User-Agent') || 'Cloudflare Worker',
          'Accept': '*/*',
          'Connection': 'keep-alive',
        },
      });

      // Create a new response with CORS headers
      const modifiedResponse = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          ...corsHeaders,
          'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
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