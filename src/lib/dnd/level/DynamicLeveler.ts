import type { Attributes } from "../attributes"
import type { HitDice } from "../hit-dice"
import type { Level } from "./Level"

export type Creature = {
	level: Level
	hp: number,
	hitDice: HitDice
	attributes: Attributes
}

function adjustStats(creature: Creature, targetLevel: Level): Creature {
	const deltaLevel = targetLevel.data - creature.level.data

	const adjustedHp = Math.max(8, creature.hp + deltaLevel * (creature.hitDice.averageValue() + creature.attributes.con.modifier))

	return {
		...creature,
		level: targetLevel,
		hp: adjustedHp,
	}
}

export const DynamicLeveler = {
	adjustStats,
} as const
