import { rulesVersion } from "$lib/design/rules-version"
import { derived } from "svelte/store"
import { DndFeatsForPokemon as DndFeatsForPokemon2018, PokemonFeats as PokemonFeats2018 } from "./2018"
import { DndFeatsForPokemon as DndFeatsForPokemon2024, PokemonFeats as PokemonFeats2024 } from "./2024"
import { DndFeats } from "../DndFeats"

export const PokemonFeats = derived(rulesVersion, (version) =>
	version === "2018" ? PokemonFeats2018 : PokemonFeats2024,
)

export const DndFeatsForPokemon = derived(rulesVersion, (version) =>
	version === "2018" ? DndFeatsForPokemon2018 : DndFeatsForPokemon2024,
)

export const DndAndPokemonFeats = derived([PokemonFeats, DndFeatsForPokemon], (([pokemonFeats, dndFeatsForPokemon]) => {
	return DndFeats.filter((dndFeat) => dndFeatsForPokemon.some((forPokemon) => forPokemon.name === dndFeat.name)).concat(pokemonFeats).toSorted((a, b) => a.name.localeCompare(b.name))
}))
