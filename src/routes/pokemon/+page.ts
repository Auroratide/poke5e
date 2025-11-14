import { get } from "svelte/store"
import { base } from "$app/paths"
import { PokemonSpecies, SpeciesStore } from "$lib/creatures/species"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch }) => {
	const cached = get(SpeciesStore.canonList())

	if (cached != null && cached.length > 0) {
		return { pokemonList: cached }
	}

	const pokemon = await fetch(`${base}/pokemon/v2.json`)
		.then(res => res.json())
		.then((data) => data.items.map((it) => 
			PokemonSpecies.fromJson(it),
		))

	return { pokemonList: pokemon }
}
