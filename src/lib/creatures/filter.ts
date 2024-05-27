import type { Pokemon } from "./types"
import { type } from "./string"

export const matchNameOrType = (value: string) => (pokemon: Pokemon) =>
	pokemon.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
		type(pokemon.type).includes(value.toLocaleLowerCase())