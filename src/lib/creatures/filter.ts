import { type } from "./string"
import type { PokemonSpecies } from "../poke5e/species"

export const matchNameOrType = (value: string) => (pokemon: PokemonSpecies) =>
	pokemon.data.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
		type(pokemon.type.data).includes(value.toLocaleLowerCase())