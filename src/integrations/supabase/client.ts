import { createClient } from '@supabase/supabase-js';
import { Database } from './types';

const supabaseUrl = 'https://tclqqvbpdqefpjqbdfle.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbHFxdmJwZHFlZnBqcWJkZmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5NTM2MDAsImV4cCI6MjAyMTUyOTYwMH0.JBLGGHVuXwL2LxRwzqIxkGfZvKiK2yHGPrghC5I3mxM';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'soundmaster-auth',
    storage: window.localStorage,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
    },
  },
  db: {
    schema: 'public',
  },
});

// Add fetch interceptor for proper authentication and CORS handling
const originalFetch = window.fetch;
window.fetch = async (input: RequestInfo | URL, requestInit?: RequestInit) => {
  try {
    if (input.toString().includes(supabaseUrl)) {
      requestInit = {
        ...requestInit,
        headers: {
          ...requestInit?.headers,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey,
          'Content-Type': 'application/json',
        },
        mode: 'cors',
        credentials: 'include',
      };
    }

    const response = await originalFetch(input, requestInit);
    if (!response.ok) {
      console.error('Fetch error:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
    }
    return response;
  } catch (error) {
    console.error('Fetch interceptor error:', error);
    throw error;
  }
};