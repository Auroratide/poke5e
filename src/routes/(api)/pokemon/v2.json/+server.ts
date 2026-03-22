
import type { RequestHandler } from "./$types"
import pokemon from "../../../../../static/data/pokemon.json"
import abilities from "../../../../../static/data/abilities.json"
import { ReferenceAbility } from "$lib/pokemon/ability"

export const prerender = true

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({
		items: pokemon.items.map(ReferenceAbility.normalizeList(abilities.items)),
	}), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
