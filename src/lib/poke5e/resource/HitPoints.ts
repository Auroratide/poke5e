import type { Level } from "$lib/dnd/level"
import { Resource } from "./Resource"

export type HitPoints = Resource

function improveViaConIncrease(hp: HitPoints, level: Level, conScoreIncrease: number): HitPoints {
	const modifierImprovement = Math.trunc(conScoreIncrease / 2)
	const newMax = hp.max + level.data * modifierImprovement

	return Resource.adjustMax(hp, newMax)
}

export const HitPoints = {
	improveViaConIncrease,
} as const