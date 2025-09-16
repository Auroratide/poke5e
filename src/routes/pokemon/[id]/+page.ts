import { base } from "$app/paths"
import { PokemonSpecies } from "$lib/creatures/species"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
	return fetch(`${base}/pokemon/${params.id}.json`).then(async res => {
		if (res.status === 404)
			error(404)
		else {
			const pokemonData = await res.json()

			return {
				pokemon: PokemonSpecies.fromJson(pokemonData),
			}
		}
	})
}
