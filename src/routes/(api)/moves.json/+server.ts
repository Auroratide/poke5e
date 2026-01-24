
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/moves.json"
import contestData from "../../../../static/data/contest.json"

export const GET: RequestHandler = async () => {
	const moves = data.moves.map(it => ({
		...it,
		contest: contestData.items.find(c => c.id === it.id),
	}))

	return new Response(JSON.stringify({ moves }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
