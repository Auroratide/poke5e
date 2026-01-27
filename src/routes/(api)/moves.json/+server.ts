
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/moves.json"
import contestData from "../../../../static/data/contest.json"
import { translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async () => {
	const moves = await translateData(
		data.moves,
		async (locale) => (await import(`../../../../static/data/${locale}/moves.json`)).moves,
	)

	const movesWithContest = moves.map(it => ({
		...it,
		contest: contestData.items.find(c => c.id === it.id),
	}))

	return new Response(JSON.stringify({ moves: movesWithContest }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
