import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tclqqvbpdqefpjqbdfle.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjbHFxdmJwZHFlZnBqcWJkZmxlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4OTMwNDcsImV4cCI6MjAyMjQ2OTA0N30.RZ9dTfMZkBJb_tWjf9_h0mrNOsxqVuPrNXTZp0weXXs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'Content-Type': 'application/json'
    }
  }
});