import type { Level } from "$lib/dnd/level"
import { LevelUpEffect } from "../LevelUpEffect.svelte"
import MaxSrIncreaseField from "./MaxSrIncreaseField.svelte"

type HasLevel = {
	level: Level
}

export type IncreaseLevelProps = {
	currentLevel: Level,
}

export class MaxSrIncreaseEffect extends LevelUpEffect<IncreaseLevelProps, Record<never, never>> {
	get Field() {
		return MaxSrIncreaseField
	}

	hasError(): string | undefined {
		return undefined
	}

	apply<T extends HasLevel>(subject: T): T {
		return subject
	}
}
