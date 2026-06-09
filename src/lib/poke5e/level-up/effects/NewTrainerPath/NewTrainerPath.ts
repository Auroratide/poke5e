import { convertToChosenTrainerPath, createEmptyChosenTrainerPath, type TrainerPath } from "$lib/trainers/paths"
import type { TrainerInfo } from "$lib/trainers/types"
import { LevelUpEffect } from "../LevelUpEffect"
import IncreaseHpField from "./NewTrainerPathField.svelte"

export type NewTrainerPathParams = {
	path: TrainerPath | undefined
}

export class NewTrainerPathEffect extends LevelUpEffect<{}, NewTrainerPathParams> {
	get Field() {
		return IncreaseHpField
	}

	apply(subject: TrainerInfo): TrainerInfo {
		const path = this.params.path
		const customPath = createEmptyChosenTrainerPath()
		customPath.name = "Custom"

		return {
			...subject,
			path: path ? convertToChosenTrainerPath(path, subject) : customPath,
		}
	}
}
