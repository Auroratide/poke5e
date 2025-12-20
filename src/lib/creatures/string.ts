import type { Move } from "$lib/moves/types"
import type { PokemonSpecies } from "../poke5e/species"

export const evolutionWithLinks = (baseUrl: string, allPokemon: PokemonSpecies[], allMoves: Move[]) => (type: "pokemon" | "move", id: string) => {
	switch (type) {
	case "pokemon": return `<a href="${baseUrl}/pokemon/${id}">${allPokemon.find((it) => it.id.data === id)?.data.name ?? id}</a>`
	case "move": return `<a href="${baseUrl}/moves/${id}">${allMoves.find((it) => it.id === id)?.name ?? id}</a>`
	}
}
