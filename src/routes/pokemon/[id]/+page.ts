import { PokemonSpecies } from "$lib/poke5e/species"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { Url } from "$lib/site/url"

export const load: PageLoad = async ({ fetch, params }) => {
	return fetch(Url.api.pokemon(params.id)).then(async res => {
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
