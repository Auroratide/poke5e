
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/moves.json"
import contestData from "../../../../static/data/contest.json"
import contestEffectData from "../../../../static/data/contest-effects.json"
import { translateData } from "$lib/site/i18n"
import { ContestMoveEffect } from "$lib/moves/contest"

export const GET: RequestHandler = async () => {
	const moves = await translateData(
		data.moves,
		async (locale) => (await import(`../../../../static/data/${locale}/moves.json`)).moves,
	)

	const contestEffects = contestEffectData.items

	const movesWithContest = moves.map(it => {
		const contest = contestData.items.find(c => c.id === it.id)

		return {
			...it,
			contest: contest == null ? undefined : ContestMoveEffect.normalizeContestId(contest, contestEffects),
		}
	})

	return new Response(JSON.stringify({ moves: movesWithContest }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
