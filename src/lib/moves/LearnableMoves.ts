import type { Level } from "$lib/dnd/level"
import type { PokemonSpecies } from "$lib/poke5e/species"
import { FeatureToggles } from "$lib/site/FeatureToggles"
import type { Move } from "./Move"

export type MoveGroup = {
	name: string,
	moves: Move[],
}

const alphabetize = (a: string, b: string) => a.localeCompare(b)
const createGroup = (name: string): MoveGroup => ({ name, moves: [] })

export class LearnableMoves {
	constructor(private readonly groups: MoveGroup[]) {}

	nonemptyGroups(): MoveGroup[] {
		return this.groups.filter((it) => it.moves.length > 0)
	}

	static groupMoves(moves: Move[], species: PokemonSpecies, level: Level): LearnableMoves {
		const tms = moves.filter((it) => it.isTm())

		const canLearn = (currentLevel: number, neededLevel: number, moves: string[] | undefined): string[] =>
			currentLevel >= neededLevel ? (moves ?? []) : []
		const cannotLearn = (currentLevel: number, neededLevel: number, moves: string[] | undefined): string[] =>
			currentLevel < neededLevel ? (moves ?? []) : []

		const learnableNowMoves = species.moves.data.start.concat(
			canLearn(level.data, 2, species.moves.data.level2),
			canLearn(level.data, 6, species.moves.data.level6),
			canLearn(level.data, 10, species.moves.data.level10),
			canLearn(level.data, 14, species.moves.data.level14),
			canLearn(level.data, 18, species.moves.data.level18),
		).toSorted(alphabetize)

		const learnableLaterMoves = [].concat(
			cannotLearn(level.data, 2, species.moves.data.level2),
			cannotLearn(level.data, 6, species.moves.data.level6),
			cannotLearn(level.data, 10, species.moves.data.level10),
			cannotLearn(level.data, 14, species.moves.data.level14),
			cannotLearn(level.data, 18, species.moves.data.level18),
		).toSorted(alphabetize)

		const tmMoves = species.moves.data.tm
			?.filter((it) => it <= 101 || FeatureToggles.MoreTms())
			?.map((it) => tms.find((m) => m.tm.id === it))
			.map((it) => it?.id)
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

		return new LearnableMoves([
			learnableNowGroup,
			learnableLaterGroup,
			tmMovesGroup,
			eggMovesGroup,
			otherMovesGroup,
		])
	}
}
