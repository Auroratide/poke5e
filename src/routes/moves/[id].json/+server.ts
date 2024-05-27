import type { RequestHandler } from "./$types"
import data from "../../../../static/data/moves.json"
import contestData from "../../../../static/data/contest.json"

export const GET: RequestHandler = async ({ params }) => {
	const selected = data.moves.find(it => it.id === params.id)
	const contest = contestData.items.find(it => it.id === selected.id)

	const move = {
		...selected,
		contest,
	}

	if (selected !== undefined) {
		return new Response(JSON.stringify(move), { status: 200 })
	} else {
		return new Response(null, { status: 404 })
	}
}
