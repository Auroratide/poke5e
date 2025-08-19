import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { env } from "./env.ts"

export function initSupabase(): SupabaseClient {
	return createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
}
