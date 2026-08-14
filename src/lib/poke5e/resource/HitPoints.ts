import type { Level } from "$lib/dnd/level"
import { Resource } from "./Resource"

export type HitPoints = Resource

function improveViaConIncrease(hp: HitPoints, level: Level, conScoreFrom: number, conScoreTo: number): HitPoints {
	const modFrom = Math.floor(conScoreFrom / 2) - 5
	const modTo = Math.floor(conScoreTo / 2) - 5
	const modifierImprovement = modTo - modFrom
	const newMax = hp.max + level.data * modifierImprovement

	return Resource.adjustMax(hp, newMax)
}

export const HitPoints = {
	improveViaConIncrease,
} as const