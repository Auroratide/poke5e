import type { RequestHandler } from "./$types"
import pokemon from "../../../../../static/data/pokemon.json"
import abilities from "../../../../../static/data/abilities.json"
import evolutions from "../../../../../static/data/evolution.json"
import { Ability } from "$lib/pokemon/ability"
import type { Data } from "$lib/DataClass"
import { Evolution } from "$lib/pokemon/evolution"

export const prerender = true

export const GET: RequestHandler = async ({ params }) => {
	const selectedPokemon = pokemon.items.find(it => it.id === params.id)
	if (selectedPokemon !== undefined) {
		const evolutionItems = evolutions.items as Data<Evolution>[]

		return new Response(JSON.stringify(
			Evolution.normalizeList(evolutionItems)(Ability.normalizeList(abilities.items)(selectedPokemon))
		))
	} else {
		return new Response(null, {
			status: 404,
		})
	}
}

export async function entries() {
	return pokemon.items.map((it) => ({ id: it.id }))
}
