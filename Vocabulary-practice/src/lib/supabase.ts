import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || null;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || null;


if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
