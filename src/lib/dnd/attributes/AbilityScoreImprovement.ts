import type { Attribute } from "./Attributes"

export type AbilityScoreImprovement = Record<Attribute, number>

export const AbilityScoreImprovement = {
	zero: (): AbilityScoreImprovement => ({
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0,
	}),
	decrease: (pointsSpent: AbilityScoreImprovement, attr: Attribute): AbilityScoreImprovement => ({
		...pointsSpent,
		[attr]: pointsSpent[attr] - 1,
	}),
	increase: (pointsSpent: AbilityScoreImprovement, attr: Attribute): AbilityScoreImprovement => ({
		...pointsSpent,
		[attr]: pointsSpent[attr] + 1,
	}),
} as const
