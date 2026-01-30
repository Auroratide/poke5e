import { get } from "svelte/store"
import { PokemonSpecies, SpeciesStore } from "$lib/poke5e/species"
import type { PageLoad } from "./$types"
import { Url } from "$lib/site/url"
import { error } from "@sveltejs/kit"

export const load: PageLoad = async ({ fetch }) => {
	const cached = get(SpeciesStore.canonList())

	if (cached != null && cached.length > 0) {
		return { pokemonList: cached }
	}

	const pokemon = await fetch(Url.api.pokemon())
		.then(res => res.json())
		.then((data) => data.items.map((it) => 
			PokemonSpecies.fromJson(it),
		))
		.then((pokemon: PokemonSpecies[]) => pokemon.filter((it) => !it.wasNonCanonNonFakemon()))

	const themes = await fetch(Url.api.themes()).then(async res => {
		if (res.status === 404)
			error(404)
		else
			return {
				item: await res.json(),
			}
	})

	return { pokemonList: pokemon, themes }
}