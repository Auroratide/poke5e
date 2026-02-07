
import type { RequestHandler } from "./$types"
import schema from "./schema.json"

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify(schema), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
