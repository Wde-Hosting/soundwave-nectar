import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tclqqvbpdqefpjqbdfle.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbHFxdmJwZHFlZnBqcWJkZmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NTY1NzcsImV4cCI6MjAyNTIzMjU3N30.qwpzm_Ez7Iw_EAnchUT8Jh3J4HyUXvPmQsZJGqoXDtE";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce'
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    }
  }
);