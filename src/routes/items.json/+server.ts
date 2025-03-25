import type { RequestHandler } from "./$types"
import data from "../../../static/data/items.json"

export const GET: RequestHandler = async () => {
	const items = data.items.filter((it) => it.description != null)

	return new Response(JSON.stringify({ items }), { status: 200 })
}
