import { supabase } from "$lib/supabase"
import { userAssets } from "$lib/site/user-assets"
import { SupabaseFakemonDataProvider } from "./SupabaseFakemonDataProvider"

export const provider = new SupabaseFakemonDataProvider(supabase, userAssets)
