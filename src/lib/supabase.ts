import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://gtgkakydsslriunwjcgg.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0Z2tha3lkc3Nscml1bndqY2dnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY4NDE2OTcsImV4cCI6MjEwMjQxNzY5N30.QKKvobk0WhLMhvI8kebOIeovkigSrh-3GEIS4jzcF7w';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  import.meta.env.MODE !== 'test' &&
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder')
);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
