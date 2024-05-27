import type { RequestHandler } from "./$types"
import pokemon from "../../../../static/data/pokemon.json"
import abilities from "../../../../static/data/abilities.json"
import * as normalize from "$lib/creatures/normalize"

export const GET: RequestHandler = async ({ params }) => {
	const selectedPokemon = pokemon.items.find(it => it.id === params.id)
	if (selectedPokemon !== undefined) {
		return new Response(JSON.stringify(normalize.abilities(abilities.items)(selectedPokemon)))
	} else {
		return new Response(null, {
			status: 404,
		})
	}
}
