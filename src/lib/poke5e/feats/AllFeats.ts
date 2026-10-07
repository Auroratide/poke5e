import { derived } from "svelte/store"
import { PokemonFeats } from "./PokemonFeats"
import { PokemonFeats as PokemonFeats2018 } from "./PokemonFeats/2018"
import { PokemonFeats as PokemonFeats2024 } from "./PokemonFeats/2024"
import { DndFeats } from "$lib/dnd/feats"

export const AllFeats = derived(PokemonFeats, (pokemonFeats) => {
	const otherEditionFeats = pokemonFeats === PokemonFeats2018 ? PokemonFeats2024 : PokemonFeats2018
	return DndFeats.concat(pokemonFeats).concat(otherEditionFeats)
})
