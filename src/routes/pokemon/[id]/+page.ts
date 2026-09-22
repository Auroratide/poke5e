import { PokemonSpecies } from "$lib/poke5e/species"
import { SrdClient } from "$lib/srd"
import { error } from "@sveltejs/kit"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
	const json = await SrdClient.forEachEdition((client) => client.pokemon.one(params.id), fetch)

	const json2018 = json["2018"]
	const json2024 = json["2024"]

	if (json2018 == null || json2024 == null) {
		error(404)
	}

	return {
		pokemon: {
			"2018": await PokemonSpecies.fromJson(json2018),
			"2024": await PokemonSpecies.fromJson(json2024),
		},
	}
}
