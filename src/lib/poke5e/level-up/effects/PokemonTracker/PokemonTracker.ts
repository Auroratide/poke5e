import type { SkillRanks } from "$lib/dnd/skills"
import { LevelUpEffect } from "../LevelUpEffect.svelte"
import PokemonTrackerField from "./PokemonTrackerField.svelte"

type HasSkills = {
	proficiencies: SkillRanks
}

export class PokemonTrackerEffect extends LevelUpEffect<Record<never, never>, Record<never, never>> {
	get Field() {
		return PokemonTrackerField
	}

	hasError(): string | undefined {
		return undefined
	}

	apply<T extends HasSkills>(subject: T): T {
		return {
			...subject,
			proficiencies: subject.proficiencies.addExpertise(["animal handling"]),
		}
	}
}
