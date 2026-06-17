import { derived } from "svelte/store"
import { SpecializationList as List2018 } from "./2018/SpecializationList"
import { SpecializationList as List2024 } from "./2024/SpecializationList"
import { rulesVersion } from "$lib/site/rules-version"
import { capitalize } from "$lib/utils/string"
import type { Attribute } from "$lib/dnd/attributes"
import type { Skill } from "$lib/dnd/skills"
import type { PokeType } from "$lib/pokemon/types"
import type { TrainerInfo } from "../types"

export type Specialization = {
	id: string,
	name: string,
	effect: SpecializationEffect[],
	type: PokeType,
}

export type SpecializationEffect = {
	type: "asi",
	value: Attribute[],
} | {
	type: "proficiency",
	value: Skill[],
} | {
	type: "other",
	value: string,
}

export type Specializations = Record<PokeType, number>

export const SpecializationList = derived([rulesVersion], ([rulesVersion]) => 
	rulesVersion === "2018" ? List2018 : List2024,
)

export function specializationDescription(specialization: Specialization): string {
	const description = []

	specialization.effect.forEach((it) => {
		switch (it.type) {
		case "asi":
			description.push(`Increase your ${new Intl.ListFormat("en", { type: "disjunction" }).format(it.value.map((word) => word.toLocaleUpperCase()))} by 1, to a maximum of 20.`)
			break
		case "proficiency":
			description.push(`You gain proficiency in ${new Intl.ListFormat("en", { type: "disjunction" }).format(it.value.map(capitalize))}, or if you already had proficiency, you gain expertise.`)
			break
		case "other":
			description.push(it.value)
			break
		}
	})

	description.push(`Add a +1 bonus to all skill checks made by any of your ${capitalize(specialization.type)}-type Pokémon.`)

	return description.join(" ")
}

export function skillModifiersFromSpecializations(specializations: Specializations, types: PokeType[]): Record<Skill, number> {
	const modifier = Object.entries(specializations).reduce((sum, [type, value]) => {
		return sum + (types.includes(type as PokeType) ? value : 0)
	}, 0)

	return {
		"athletics": modifier,
		"acrobatics": modifier,
		"sleight of hand": modifier,
		"stealth": modifier,
		"arcana": modifier,
		"history": modifier,
		"investigation": modifier,
		"nature": modifier,
		"religion": modifier,
		"animal handling": modifier,
		"insight": modifier,
		"medicine": modifier,
		"perception": modifier,
		"survival": modifier,
		"deception": modifier,
		"intimidation": modifier,
		"performance": modifier,
		"persuasion": modifier,
	}
}

export function hasSpecialization(specializations: Specializations): boolean {
	return Object.values(specializations).some((it) => it > 0)
}

export function applySpecialization(trainer: TrainerInfo, specialization: Specialization, choices: {
	asi?: Attribute,
	skill?: Skill,
}): TrainerInfo {
	trainer.specializations[specialization.type] = Math.min(5, trainer.specializations[specialization.type] + 1)

	const asiToIncrease = choices.asi ?? specialization.effect.find((it) => it.type === "asi")?.value[0]
	const skillToIncrease = choices.skill ?? specialization.effect.find((it) => it.type === "proficiency")?.value[0]

	if (asiToIncrease != null) {
		trainer.attributes.data[asiToIncrease] = Math.min(20, trainer.attributes.data[asiToIncrease] + 1)
	}

	if (skillToIncrease != null) {
		trainer.proficiencies.data[skillToIncrease] = Math.min(2, trainer.proficiencies.data[skillToIncrease] + 1)
	}

	return trainer
}
