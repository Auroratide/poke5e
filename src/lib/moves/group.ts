import type { PokemonSpecies } from "$lib/poke5e/species"
import type { Move, Tm } from "./types"

export type MoveGroup = {
	name: string,
	moves: Move[],
}

const alphabetize = (a: string, b: string) => a.localeCompare(b)
const createGroup = (name: string): MoveGroup => ({ name, moves: [] })

export function groupByLearnability(moves: Move[], tms: Tm[], species: PokemonSpecies, level: number): MoveGroup[] {
	const canLearn = (currentLevel: number, neededLevel: number, moves: string[] | undefined): string[] =>
		currentLevel >= neededLevel ? (moves ?? []) : []
	const cannotLearn = (currentLevel: number, neededLevel: number, moves: string[] | undefined): string[] =>
		currentLevel < neededLevel ? (moves ?? []) : []

	const learnableNowMoves = species.moves.data.start.concat(
		canLearn(level, 2, species.moves.data.level2),
		canLearn(level, 6, species.moves.data.level6),
		canLearn(level, 10, species.moves.data.level10),
		canLearn(level, 14, species.moves.data.level14),
		canLearn(level, 18, species.moves.data.level18),
	).toSorted(alphabetize)

	const learnableLaterMoves = [].concat(
		cannotLearn(level, 2, species.moves.data.level2),
		cannotLearn(level, 6, species.moves.data.level6),
		cannotLearn(level, 10, species.moves.data.level10),
		cannotLearn(level, 14, species.moves.data.level14),
		cannotLearn(level, 18, species.moves.data.level18),
	).toSorted(alphabetize)

	const tmMoves = species.moves.data.tm
		?.map((it) => tms.find((m) => m.id === it))
		.map((it) => it?.move)
		.filter((it) => it != null)
		.toSorted(alphabetize) ?? []

	const eggMoves = species.moves.data.egg?.toSorted(alphabetize) ?? []

	const learnableNowGroup = createGroup("Learnable at Current Level")
	const learnableLaterGroup = createGroup("Learnable at Later Levels")
	const tmMovesGroup = createGroup("TMs")
	const eggMovesGroup = createGroup("Egg Moves")
	const otherMovesGroup = createGroup("All Other Moves")

	moves.forEach((move) => {
		const addTo = []
		if (learnableNowMoves.includes(move.id)) {
			addTo.push(learnableNowGroup)
		}

		if (learnableLaterMoves.includes(move.id)) {
			addTo.push(learnableLaterGroup)
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
		learnableNowGroup,
		learnableLaterGroup,
		tmMovesGroup,
		eggMovesGroup,
		otherMovesGroup,
	].filter((it) => it.moves.length > 0)
}
