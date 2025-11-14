
import type { RequestHandler } from "./$types"
import pokemon from "../../../../static/data/pokemon-v2.json"
import abilities from "../../../../static/data/abilities.json"
import * as normalize from "$lib/creatures/normalize"

export const prerender = true

export const GET: RequestHandler = async () => {
	return new Response(JSON.stringify({
		items: pokemon.items.map(normalize.abilities(abilities.items)),
	}), {
		status: 200,
	})
}
