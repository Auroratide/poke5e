import type { Data } from "$lib/DataClass"
import { Ability } from "../Ability"

export function stubAbility(template: Partial<Data<Ability>> = {}): Ability {
	return new Ability({
		referenceId: "disguise",
		name: "Disguse",
		description: "Grants a disguise.",
		...template,
	})
}
