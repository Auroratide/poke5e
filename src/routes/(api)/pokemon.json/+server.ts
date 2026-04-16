
import type { RequestHandler } from "./$types"
import pokemon from "../../../../static/data/pokemon.json"
import abilities from "../../../../static/data/abilities.json"
import evolutions from "../../../../static/data/evolution.json"
import { Evolution } from "$lib/pokemon/evolution"
import type { Data } from "$lib/DataClass"
import { Ability } from "$lib/pokemon/ability"

export const prerender = true

export const GET: RequestHandler = async () => {
	const evolutionItems = evolutions.items as Data<Evolution>[]

	return new Response(JSON.stringify({
		items: pokemon.items
			.map(Ability.normalizeList(abilities.items))
			.map(Evolution.normalizeList(evolutionItems)),
	}), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
