import type { LevelUpEffect } from "./effects/LevelUpEffect";

export const LevelUp = {
	apply<T>(subject: T, effects: LevelUpEffect<any, any>[]): T {
		return effects.reduce((updated, effect) => {
			return effect.apply(updated)
		}, subject) as T
	}
} as const
