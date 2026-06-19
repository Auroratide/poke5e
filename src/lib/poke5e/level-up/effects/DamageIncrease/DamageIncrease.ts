import type { Level } from "$lib/dnd/level"
import type { LearnedMove } from "$lib/trainers/types"
import { LevelUpEffect } from "../LevelUpEffect"
import DamageIncreaseField from "./DamageIncreaseField.svelte"

export type DamageIncreaseProps = {
	currentLevel: Level,
	moves: LearnedMove[],
}

export class DamageIncreaseEffect extends LevelUpEffect<DamageIncreaseProps, Record<never, never>> {
	get Field() {
		return DamageIncreaseField
	}

	apply<T>(subject: T): T {
		return subject
	}
}
