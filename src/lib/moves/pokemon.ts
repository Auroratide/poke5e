import type { Pokemon } from "$lib/creatures/types"
import type { Move, Tm } from "./types"

export function pokemonWhoLearnThisMove(move: Move["id"], tms: Pick<Tm, "id" | "move">[], pokemon: Pick<Pokemon, "id" | "name" | "moves">[]): Pick<Pokemon, "id" | "name">[] {
	const relevantTmIds = tms
		.filter(tm => tm.move === move)
		.map(tm => tm.id)

	return pokemon.filter(poke => {
		const moves = poke.moves
		
		const learnsAtLevel = [
			...(moves.start ?? []),
			...(moves.level2 ?? []),
			...(moves.level6 ?? []),
			...(moves.level10 ?? []),
			...(moves.level14 ?? []),
			...(moves.level18 ?? []),
		].includes(move)
		
		const learnsAsEgg = (moves.egg ?? []).includes(move)
		
		const learnsViaTm = relevantTmIds.some(tmId => 
			(moves.tm ?? []).includes(tmId),
		)
		
		return learnsAtLevel || learnsAsEgg || learnsViaTm
	})
}

export function pokemonWhoLearnThisTm(tm: Tm["id"], pokemon: Pick<Pokemon, "id" | "name" | "moves">[]): Pick<Pokemon, "id" | "name">[] {
	return pokemon.filter(poke => {
		const tmMoves = poke.moves.tm ?? []
		return tmMoves.includes(tm)
	})
}
