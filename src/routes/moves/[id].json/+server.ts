import type { RequestHandler } from "./$types"
import data from "../../../../static/data/moves.json"
import tmData from "../../../../static/data/tms.json"
import contestData from "../../../../static/data/contest.json"
import pokemonData from "../../../../static/data/pokemon-v2.json"
import { pokemonWhoLearnThisMove } from "$lib/moves/pokemon"

export const GET: RequestHandler = async ({ params }) => {
	const selected = data.moves.find(it => it.id === params.id)
	const contest = contestData.items.find(it => it.id === selected.id)
	const pokemon = selected != null ? pokemonWhoLearnThisMove(selected.id, tmData.tms, pokemonData.items.filter((it) => it.number !== 0)) : []

	const move = {
		...selected,
		contest,

		// kept for backward compatibility
		pokemon: pokemon.map(it => ({
			id: it.id,
			name: it.name,
		})),
	}

	if (selected !== undefined) {
		return new Response(JSON.stringify(move), { status: 200 })
	} else {
		return new Response(null, { status: 404 })
	}
}
