import type { Attribute } from "$lib/dnd/attributes"
import type { Skill } from "$lib/dnd/skills"
import { applySpecialization, type Specialization } from "$lib/trainers/specializations"
import type { TrainerInfo } from "$lib/trainers/types"
import { LevelUpEffect } from "../LevelUpEffect"
import IncreaseHpField from "./AdditionalSpecializationField.svelte"

export type NewTrainerPathParams = {
	specialization: Specialization | undefined
	asi: Attribute | undefined,
	skill: Skill | undefined,
}

export class AdditionalSpecializationEffect extends LevelUpEffect<Record<never, never>, NewTrainerPathParams> {
	get Field() {
		return IncreaseHpField
	}

	apply(subject: TrainerInfo): TrainerInfo {
		if (this.params.specialization == null) return subject

		return applySpecialization(subject, this.params.specialization, {
			asi: this.params.asi,
			skill: this.params.skill,
		})
	}
}
