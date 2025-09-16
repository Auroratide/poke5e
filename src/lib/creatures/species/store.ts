import { base } from "$app/paths"
import { readable } from "svelte/store"
import type { PokemonJsonResponse } from "./PokemonJsonResponse"
import { PokemonSpecies } from "./PokemonSpecies"

export const SpeciesStore = readable<PokemonSpecies[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/pokemon.json`)
			.then((res) => res.json())
			.then((data: PokemonJsonResponse) => data.items.map((it) =>
				PokemonSpecies.fromJson(it),
			))
			.then((pokemon) => set(pokemon))
	}
})
