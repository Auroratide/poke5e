import { rulesVersion } from "$lib/design/rules-version"
import { derived } from "svelte/store"
import { DndFeatsForPokemon as DndFeatsForPokemon2018, PokemonFeats as PokemonFeats2018 } from "./2018"
import { DndFeatsForPokemon as DndFeatsForPokemon2024, PokemonFeats as PokemonFeats2024 } from "./2024"

export const PokemonFeats = derived(rulesVersion, (version) =>
	version === "2018" ? PokemonFeats2018 : PokemonFeats2024,
)

export const DndFeatsForPokemon = derived(rulesVersion, (version) =>
	version === "2018" ? DndFeatsForPokemon2018 : DndFeatsForPokemon2024,
)
