import type { LevelUpEffect } from "./effects/LevelUpEffect.svelte"

export const LevelUp = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	apply<T>(subject: T, effects: LevelUpEffect<any, any>[]): T {
		return effects.reduce((updated, effect) => {
			return effect.apply(updated)
		}, subject) as T
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	listErrors(effects: LevelUpEffect<any, any>[]): string[] {
		return effects.map((it) => it.hasError()).filter((it) => it != null)
	},
} as const
