import { createClient } from "@supabase/supabase-js";

// Retrieve the URL and anonymous key from your Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; // e.g., https://your-instance.supabase.co
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Your public anon key

// Initialize and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
