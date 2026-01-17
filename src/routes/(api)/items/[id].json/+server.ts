import type { RequestHandler } from "./$types"
import data from "../../../../../static/data/items.json"

export const GET: RequestHandler = async ({ params }) => {
	const item = data.items.find(it => it.id === params.id)

	if (item !== undefined) {
		return new Response(JSON.stringify(item), { status: 200 })
	} else {
		return new Response(null, { status: 404 })
	}
}
