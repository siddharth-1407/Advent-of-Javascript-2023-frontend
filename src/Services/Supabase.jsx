import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_DATABASE_PROJECT_URL, import.meta.env.VITE_DATABASE_KEY);

export default supabase;
