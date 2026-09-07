
import type { RequestHandler } from "./$types"
import data from "../../../../static/data/moves.json"
import contestData from "../../../../static/data/contest.json"
import contestEffectData from "../../../../static/data/contest-effects.json"
import { translateData } from "$lib/site/i18n"
import { ContestMoveEffect } from "$lib/moves/contest"

/**
 * Prerendered explicitly for backward compatibility. This endpoint used to be
 * written only because a page fetched it, and nothing does since the move pages
 * moved to the SRD — but clients loaded before that deploy still ask for it.
 */
export const prerender = true

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
