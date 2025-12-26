import type { Pokemon } from "$lib/poke5e/legacy-types"
import type { MoveId } from "./Move"
import type { TmId } from "./TmDetails"
import type { Tm } from "./types"

export function pokemonWhoLearnThisMove(move: MoveId, tms: Pick<Tm, "id" | "move">[], pokemon: Pick<Pokemon, "id" | "name" | "moves">[]): Pick<Pokemon, "id" | "name">[] {
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

export function pokemonWhoLearnThisTm(tm: TmId, pokemon: Pick<Pokemon, "id" | "name" | "moves">[]): Pick<Pokemon, "id" | "name">[] {
	return pokemon.filter(poke => {
		const tmMoves = poke.moves.tm ?? []
		return tmMoves.includes(tm)
	})
}
