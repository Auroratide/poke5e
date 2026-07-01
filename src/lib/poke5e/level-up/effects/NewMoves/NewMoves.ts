import type { Level } from "$lib/dnd/level"
import type { MovePool } from "$lib/pokemon/move-pool"
import { LevelUpEffect } from "../LevelUpEffect.svelte"
import NewMovesField from "./NewMovesField.svelte"

export type NewMovesProps = {
	currentLevel: Level,
	movePool: MovePool,
}

export class NewMovesEffect extends LevelUpEffect<NewMovesProps, Record<never, never>> {
	get Field() {
		return NewMovesField
	}

	hasError(): string | undefined {
		return undefined
	}

	apply<T>(subject: T): T {
		return subject
	}
}
