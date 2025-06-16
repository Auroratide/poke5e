import type { RequestHandler } from "./$types"
import moves from "../../../../static/data/moves.json"
import tms from "../../../../static/data/tms.json"
import pokemon from "../../../../static/data/pokemon.json"
import { pokemonWhoLearnThisTm } from "$lib/moves/pokemon"

export const GET: RequestHandler = async ({ params }) => {
	const selected = tms.tms.find(it => it.id === parseInt(params.id))
	const move = moves.moves.find(it => it.id === selected.move)
	const pokemonThatCanLearnThis = selected != null ? pokemonWhoLearnThisTm(selected.id, pokemon.items) : []

	if (selected !== undefined) {
		return new Response(JSON.stringify({
			...selected,
			moveInfo: {
				...move,
				name: `${selected.id} - ${move.name}`,
				pokemon: pokemonThatCanLearnThis.map(it => ({
					id: it.id,
					name: it.name,
				})),
			},
			// kept for backward compatibility, since it's a public api technically
			pokemon: pokemonThatCanLearnThis.map(it => ({
				id: it.id,
				name: it.name,
			})),
		}), {
			status: 200,
		})
	} else {
		return new Response(null, { status: 404 })
	}
}
