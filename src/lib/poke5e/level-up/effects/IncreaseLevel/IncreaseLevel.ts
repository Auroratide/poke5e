import type { Level } from "$lib/dnd/level"
import type { Resource } from "$lib/poke5e/resource"
import { LevelUpEffect } from "../LevelUpEffect.svelte"
import IncreaseLevelField from "./IncreaseLevelField.svelte"

type HasLevel = {
	level: Level
	hitDice: Resource
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
			hitDice: {
				current: subject.hitDice.current + 1,
				max: subject.hitDice.max + 1,
			},
		}
	}
}
