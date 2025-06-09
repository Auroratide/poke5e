import { derived } from "svelte/store"
import { PokemonFeats } from "./PokemonFeats"
import { DndFeats } from "./DndFeats"

export const AllFeats = derived(PokemonFeats, (pokemonFeats) => {
	return DndFeats.concat(pokemonFeats)
})
