import type { Level } from "$lib/dnd/level"
import type { ChosenTrainerPath } from "$lib/trainers/paths"
import { LevelUpEffect } from "../LevelUpEffect"
import AcquiredPathFeatureField from "./AcquiredPathFeature.svelte"

type HasLevel = {
	level: Level
}

export type AcquiredPathFeatureProps = {
	currentLevel: Level,
	path: ChosenTrainerPath,
}

export class AcquiredPathFeatureEffect extends LevelUpEffect<AcquiredPathFeatureProps, Record<never, never>> {
	get Field() {
		return AcquiredPathFeatureField
	}

	apply<T extends HasLevel>(subject: T): T {
		return subject
	}
}
