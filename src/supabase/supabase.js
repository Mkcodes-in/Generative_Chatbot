import { createClient } from "@supabase/supabase-js";

const api_key = import.meta.env.VITE_SUPABASE_API_KEY;
const base_url = 'https://xmxrxqekmlwhpqbypsvm.supabase.co';
export const supabase = createClient(base_url, api_key);