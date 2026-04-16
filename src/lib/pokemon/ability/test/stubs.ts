import type { Data } from "$lib/DataClass"
import { Ability } from "../Ability"
import { AbilityPool } from "../AbilityPool"

export function stubAbility(template: Partial<Data<Ability>> = {}): Ability {
	return new Ability({
		referenceId: "disguise",
		name: "Disguise",
		description: "This Pokémon has a disguise which gives it a temporary hp boost equal to twice its level. When the temporary hit points fall to zero, the disguise breaks and requires a short rest to repair.",
		...template,
	})
}

export function stubAbilityPool(template: Partial<Data<AbilityPool>> = {}): AbilityPool {
	return new AbilityPool({
		normal: [stubAbility().data],
		hidden: [stubAbility({
			referenceId: "inner-focus",
			name: "Inner Focus",
			description: "This Pokémon is immune to flinching.",
		}).data],
		...template,
	})
}
