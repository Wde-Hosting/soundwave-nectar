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
      'apikey': supabaseAnonKey,
      'Authorization': `Bearer ${supabaseAnonKey}`,
      'Content-Type': 'application/json'
    }
  },
  db: {
    schema: 'public'
  },
  // Add retry configuration
  retryAttempts: 3,
  retryInterval: 1000
});

// Add better error handling for fetch operations
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);
    if (!response.ok) {
      console.error('Fetch error:', {
        status: response.status,
        statusText: response.statusText,
        url: args[0]
      });
    }
    return response;
  } catch (error) {
    console.error('Network error:', error);
    // Retry logic for network errors
    for (let i = 0; i < 3; i++) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        const retryResponse = await originalFetch(...args);
        if (retryResponse.ok) {
          return retryResponse;
        }
      } catch (retryError) {
        console.error(`Retry ${i + 1} failed:`, retryError);
      }
    }
    throw error;
  }
};