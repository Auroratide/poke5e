import { get } from "svelte/store"
import { PokemonSpecies, SpeciesStore } from "$lib/poke5e/species"
import type { PageLoad } from "./$types"
import { Url } from "$lib/site/url"
import { error } from "@sveltejs/kit"

export const load: PageLoad = async ({ fetch }) => {
	const cached = get(SpeciesStore.canonList())

	const biomes = await fetch(Url.api.biomes()).then(async res => {
		if (res.status === 404)
			error(404)
		else
			return {
				item: await res.json(),
			}
	})

	if (cached != null && cached.length > 0) {
		return { pokemonList: cached, biomes }
	}

	const pokemon = await fetch(Url.api.pokemon())
		.then(res => res.json())
		.then((data) => data.items.map((it) => 
			PokemonSpecies.fromJson(it),
		))
		.then((pokemon: PokemonSpecies[]) => pokemon.filter((it) => !it.wasNonCanonNonFakemon()))


	return { pokemonList: pokemon, biomes }
}