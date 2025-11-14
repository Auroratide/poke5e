
import type { RequestHandler } from "./$types"
import evolutions from "../../../../static/data/evolution.json"

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify(evolutions), {
		status: 200,
	})
}
