import type { Ability } from "../types"

export function stubAbility(template: Partial<Ability>): Ability {
	return {
		id: "cute-charm",
		name: "Cute Charm",
		description: "Once per short rest, you can impose disadvantage on an enemy attack roll of your choice.",
		hidden: false,
		...template,
	}
}
