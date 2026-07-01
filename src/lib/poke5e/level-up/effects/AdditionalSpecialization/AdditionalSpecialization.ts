import type { Attribute } from "$lib/dnd/attributes"
import type { Skill } from "$lib/dnd/skills"
import { applySpecialization, type Specialization } from "$lib/trainers/specializations"
import type { TrainerInfo } from "$lib/trainers/types"
import { LevelUpEffect } from "../LevelUpEffect.svelte"
import AdditionalSpecializationField from "./AdditionalSpecializationField.svelte"

export type AdditionalSpecializationParams = {
	specialization: Specialization | undefined
	asi: Attribute | undefined,
	skill: Skill | undefined,
}

export class AdditionalSpecializationEffect extends LevelUpEffect<Record<never, never>, AdditionalSpecializationParams> {
	get Field() {
		return AdditionalSpecializationField
	}

	hasError(): string | undefined {
		if (this.params.specialization == null) {
			return "Must choose a specialization."
		}

		for (const effect of this.params.specialization.effect) {
			const requiresAsi = effect.type === "asi" && effect.value.length > 1 && this.params.asi == null
			const requiresSkill = effect.type === "proficiency" && effect.value.length > 1 && this.params.skill == null
			if (requiresAsi || requiresSkill) {
				return "Specialization requires choosing an ability or proficiency."
			}
		}

		return undefined
	}

	apply(subject: TrainerInfo): TrainerInfo {
		if (this.params.specialization == null) return subject

		return applySpecialization(subject, this.params.specialization, {
			asi: this.params.asi,
			skill: this.params.skill,
		})
	}
}
