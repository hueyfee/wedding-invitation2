import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vuqspkeaxxyzffzjpvds.supabase.co";
const supabaseAnonKey = "sb_publishable_BuEO3dAgv9caIcBYefD7-g_uAbm03HA";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);