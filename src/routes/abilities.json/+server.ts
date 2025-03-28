
import type { RequestHandler } from "./$types"
import data from "../../../static/data/abilities.json"

export const GET: RequestHandler = async () => {
	const abilities = data.items

	return new Response(JSON.stringify({ abilities }), { status: 200 })
}
