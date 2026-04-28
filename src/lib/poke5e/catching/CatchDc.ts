import type { Level } from "$lib/dnd/level"
import type { Resource } from "$lib/poke5e/resource"
import type { SpeciesRating } from "$lib/poke5e/sr"
import type { RulesVersion } from "$lib/site/rules-version"

export type CatchDc = number

export const CatchDc = {
	calculate({ level, sr, hp, version }: { level: Level, sr: SpeciesRating, hp: Resource, version: RulesVersion }): CatchDc {
		const baseDc = 10 + level.data + Math.floor(sr.data)
		const hpRatio = hp.current / hp.max
		const healthAdjustment = version === "2024"
			? -5 * (+(hpRatio < 0.5) + +(hpRatio < 0.1))
			: Math.floor(hp.current / 10)
		return baseDc + healthAdjustment
	},
} as const