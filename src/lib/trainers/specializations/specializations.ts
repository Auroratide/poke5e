import { derived } from "svelte/store"
import type { Attribute, Skill } from "$lib/dnd/types"
import type { PokeType } from "$lib/pokemon/types"
import { SpecializationList as List2018 } from "./2018/SpecializationList"
import { SpecializationList as List2024 } from "./2024/SpecializationList"
import { rulesVersion } from "$lib/design/rules-version"
import { capitalize } from "$lib/string"

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
	rulesVersion === "2018" ? List2018 : List2024
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
