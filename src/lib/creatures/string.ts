import type { Move } from "$lib/moves/types"
import type { PokeType } from "$lib/pokemon/types-2"
import type { PokemonSpecies } from "../poke5e/species"

/**
 * Pokemon can only have single- or dual-typing
 */
export const type = (value: PokeType[]): string => {
	return value.join("/")
}

export const pokeIndex = (value: number): string =>
	`#${value.toString().padStart(3, "0")}`

export const list = (value: string[]): string =>
	value.length > 0 ? value.join(", ") : "none"

export const evolutionWithLinks = (baseUrl: string, allPokemon: PokemonSpecies[], allMoves: Move[]) => (type: "pokemon" | "move", id: string) => {
	switch (type) {
	case "pokemon": return `<a href="${baseUrl}/pokemon/${id}">${allPokemon.find((it) => it.id.data === id)?.data.name ?? id}</a>`
	case "move": return `<a href="${baseUrl}/moves/${id}">${allMoves.find((it) => it.id === id)?.name ?? id}</a>`
	}
}
