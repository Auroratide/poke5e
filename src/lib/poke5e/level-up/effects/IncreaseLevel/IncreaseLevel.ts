import type { Level } from "$lib/dnd/level"
import { LevelUpEffect } from "../LevelUpEffect.svelte"
import IncreaseLevelField from "./IncreaseLevelField.svelte"

type HasLevel = {
	level: Level
}

export type IncreaseLevelProps = {
	currentLevel: Level,
}

export class IncreaseLevelEffect extends LevelUpEffect<IncreaseLevelProps, Record<never, never>> {
	get Field() {
		return IncreaseLevelField
	}

	hasError(): string | undefined {
		return undefined
	}

	apply<T extends HasLevel>(subject: T): T {
		return {
			...subject,
			level: subject.level.next(),
		}
	}
}
