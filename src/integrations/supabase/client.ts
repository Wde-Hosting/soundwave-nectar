import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = 'https://tclqqvbpdqefpjqbdfle.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbHFxdmJwZHFlZnBqcWJkZmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNDMyNDUsImV4cCI6MjA1MTYxOTI0NX0.IN7pl3pF02tUlTMbc2o5HiStWWT54Bujh1d7yRS6KPo';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'apikey': supabaseAnonKey
    },
  },
  db: {
    schema: 'public'
  }
});

// Add error handling and retry logic for fetch operations
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Add default headers to the request if it's a Supabase request
      if (typeof args[0] === 'string' && args[0].includes(supabaseUrl)) {
        const requestInit = args[1] || {};
        args[1] = {
          ...requestInit,
          headers: {
            ...requestInit.headers,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey,
            'Content-Type': 'application/json'
          }
        };
      }

      const response = await originalFetch(...args);
      
      // Log failed requests for debugging
      if (!response.ok) {
        console.error('Fetch error:', {
          status: response.status,
          statusText: response.statusText,
          url: args[0]
        });
      }
      
      return response;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);
      
      // If this is the last attempt, throw the error
      if (attempt === maxRetries - 1) {
        throw error;
      }
      
      // Wait before retrying, with exponential backoff
      await new Promise(resolve => setTimeout(resolve, baseDelay * Math.pow(2, attempt)));
    }
  }

  // This should never be reached due to the throw in the last iteration
  throw new Error('Failed to fetch after all retry attempts');
};