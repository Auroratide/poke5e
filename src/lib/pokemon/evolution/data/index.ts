import { supabase } from "$lib/supabase"
import { SupabaseEvolutionDataProvider } from "./SupabaseEvolutionDataProvider"

export const provider = new SupabaseEvolutionDataProvider(supabase)
