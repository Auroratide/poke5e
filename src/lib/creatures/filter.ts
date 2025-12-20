import type { PokemonSpecies } from "../poke5e/species"

export const matchNameOrType = (value: string) => (pokemon: PokemonSpecies) =>
	pokemon.data.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
		pokemon.type.toString().toLocaleLowerCase().includes(value.toLocaleLowerCase())