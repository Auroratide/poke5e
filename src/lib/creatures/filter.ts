import type { Pokemon } from "./types"
import { type } from "./string"
import type { PokemonSpecies } from "./species"

export const matchNameOrType = (value: string) => (pokemon: Pokemon) =>
	pokemon.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
		type(pokemon.type.data).includes(value.toLocaleLowerCase())

export const matchNameOrType2 = (value: string) => (pokemon: PokemonSpecies) =>
	pokemon.data.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
		type(pokemon.type.data).includes(value.toLocaleLowerCase())