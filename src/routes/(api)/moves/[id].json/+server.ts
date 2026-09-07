import type { EntryGenerator, RequestHandler } from "./$types"
import data from "../../../../../static/data/moves.json"
import tmData from "../../../../../static/data/tms.json"
import contestData from "../../../../../static/data/contest.json"
import contestEffectData from "../../../../../static/data/contest-effects.json"
import pokemonData from "../../../../../static/data/pokemon.json"
import { pokemonWhoLearnThisMove } from "$lib/moves/pokemon"
import { translateData } from "$lib/site/i18n"
import { ContestMoveEffect } from "$lib/moves/contest"

/**
 * Prerendered explicitly for backward compatibility. This endpoint used to be
 * written only because a page fetched it, and nothing does since the move pages
 * moved to the SRD — but clients loaded before that deploy still ask for it.
 */
export const prerender = true

/** The ids come from the legacy data this endpoint serves, not from the SRD. */
export const entries: EntryGenerator = () => data.moves.map((it) => ({ id: it.id }))

export const GET: RequestHandler = async ({ params }) => {
	const selected = data.moves.find(it => it.id === params.id)
	const contest = contestData.items.find(it => it.id === selected.id)
	const pokemon = selected != null ? pokemonWhoLearnThisMove(selected.id, tmData.tms, pokemonData.items.filter((it) => it.number !== 0)) : []

	const contestEffects = contestEffectData.items

	const move = {
		...selected,
		contest: contest == null ? undefined : ContestMoveEffect.normalizeContestId(contest, contestEffects),

		// kept for backward compatibility
		pokemon: pokemon.map(it => ({
			id: it.id,
			name: it.name,
		})),
	}

	if (selected !== undefined) {
		const translated = await translateData(
			[move],
			async (locale) => (await import(`../../../../../static/data/${locale}/moves.json`)).moves,
		)

		return new Response(JSON.stringify(translated[0]), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		})
	} else {
		return new Response(null, {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
}
