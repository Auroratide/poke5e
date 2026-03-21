import { Ability } from "../Ability"
import type { Data } from "$lib/DataClass"

export function stubAbility(template: Partial<Data<Ability>> = {}): Ability {
	return new Ability({
		id: "disguise",
		name: "Disguse",
		description: "Grants a disguise.",
		...template,
	})
}
