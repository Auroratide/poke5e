import { PokemonSpecies } from "$lib/poke5e/species"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"
import { Url } from "$lib/site/url"

export const load: PageLoad = async ({ fetch, params }) => {
	// TODO: Enable the SRD version of this when ready
	// const client2018 = new SrdClient("2018", fetch)
	// const client2024 = new SrdClient("2024", fetch)

	// const [value2018, value2024] = await Promise.all([
	// 	client2018.pokemon.one(params.id),
	// 	client2024.pokemon.one(params.id),
	// ])
		
	// if (value2018 == null && value2024 == null) {
	// 	error(404)
	// }

	// return {
	// 	pokemon: {
	// 		"2018": await PokemonSpecies.fromJson2(value2018),
	// 		"2024": await PokemonSpecies.fromJson2(value2024),
	// 	}
	// }

	return fetch(Url.api.pokemon(params.id)).then(async res => {
		if (res.status === 404)
			error(404)
		else {
			const pokemonData = await res.json()

			return {
				pokemon: await PokemonSpecies.fromJson(pokemonData),
			}
		}
	})
}
