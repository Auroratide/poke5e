import type { Level } from "$lib/dnd/level"
import type { Stab } from "$lib/pokemon/stab"
import { LevelUpEffect } from "../LevelUpEffect"
import StabIncreaseField from "./StabIncreaseField.svelte"

export type StabIncreaseProps = {
	currentLevel: Level,
	stab: Stab,
}

export class StabIncreaseEffect extends LevelUpEffect<StabIncreaseProps, Record<never, never>> {
	get Field() {
		return StabIncreaseField
	}

	apply<T>(subject: T): T {
		return subject
	}
}
