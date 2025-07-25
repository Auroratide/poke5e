import { supabase } from "$lib/supabase"
import { SupabaseFakemonDataProvider } from "./SupabaseFakemonDataProvider"

export const provider = new SupabaseFakemonDataProvider(supabase)
