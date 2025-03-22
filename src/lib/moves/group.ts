import type { Pokemon } from "$lib/creatures/types"
import type { Move, Tm } from "./types"

export type MoveGroup = {
	name: string,
	moves: Move[],
}

const alphabetize = (a: string, b: string) => a.localeCompare(b)
const createGroup = (name: string): MoveGroup => ({ name, moves: [] })

export function groupByLearnability(moves: Move[], tms: Tm[], species: Pokemon): MoveGroup[] {
	const learnableMoves = species.moves.start.concat(
		species.moves.level2 ?? [],
		species.moves.level6 ?? [],
		species.moves.level10 ?? [],
		species.moves.level14 ?? [],
		species.moves.level18 ?? [],
	).toSorted(alphabetize)

	const tmMoves = species.moves.tm
		?.map((it) => tms.find((m) => m.id === it))
		.map((it) => it?.move)
		.filter((it) => it != null)
		.toSorted(alphabetize) ?? []

	const eggMoves = species.moves.egg?.toSorted(alphabetize) ?? []

	const learnableMovesGroup = createGroup("Learnable Moves")
	const tmMovesGroup = createGroup("TMs")
	const eggMovesGroup = createGroup("Egg Moves")
	const otherMovesGroup = createGroup("All Other Moves")

	moves.forEach((move) => {
		const addTo = []
		if (learnableMoves.includes(move.id)) {
			addTo.push(learnableMovesGroup)
		}

		if (tmMoves.includes(move.id)) {
			addTo.push(tmMovesGroup)
		}
		
		if (eggMoves.includes(move.id)) {
			addTo.push(eggMovesGroup)
		}

		addTo.forEach((it) => it.moves.push(move))

		if (addTo.length === 0) {
			otherMovesGroup.moves.push(move)
		}
	})

	return [
		learnableMovesGroup,
		tmMovesGroup,
		eggMovesGroup,
		otherMovesGroup,
	].filter((it) => it.moves.length > 0)
}
