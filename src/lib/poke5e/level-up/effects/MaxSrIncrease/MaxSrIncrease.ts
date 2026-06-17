import type { Level } from "$lib/dnd/level"
import { LevelUpEffect } from "../LevelUpEffect"
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

	apply<T extends HasLevel>(subject: T): T {
		return subject
	}
}
