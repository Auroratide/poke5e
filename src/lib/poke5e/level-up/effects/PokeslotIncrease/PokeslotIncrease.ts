import type { Level } from "$lib/dnd/level"
import { LevelUpEffect } from "../LevelUpEffect"
import PokeslotIncreaseField from "./PokeslotIncreaseField.svelte"

type HasLevel = {
	level: Level
}

export type IncreaseLevelProps = {
	currentLevel: Level,
}

export class PokeslotIncreaseEffect extends LevelUpEffect<IncreaseLevelProps, Record<never, never>> {
	get Field() {
		return PokeslotIncreaseField
	}

	apply<T extends HasLevel>(subject: T): T {
		return subject
	}
}
