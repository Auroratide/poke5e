import type { LevelUpEffect } from "./effects/LevelUpEffect"

export const LevelUp = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apply<T>(subject: T, effects: LevelUpEffect<any, any>[]): T {
		return effects.reduce((updated, effect) => {
			return effect.apply(updated)
		}, subject) as T
	},
} as const
