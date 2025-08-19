export const env = {
	SUPABASE_URL: Deno.env.get("SUPABASE_URL") ?? "",
	SUPABASE_KEY: Deno.env.get("SUPABASE_ANON_KEY") ?? "",
	S3_ENDPOINT: Deno.env.get("S3_ENDPOINT"),
	S3_ACCESS_KEY_ID: Deno.env.get("S3_ACCESS_KEY_ID"),
	S3_SECRET_ACCESS_KEY: Deno.env.get("S3_SECRET_ACCESS_KEY"),
	S3_BUCKET_NAME: Deno.env.get("S3_BUCKET_NAME") ?? "",
} as const