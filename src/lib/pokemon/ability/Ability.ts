import { DataClass } from "$lib/DataClass"

export type AbilityId = string

export class Ability extends DataClass<{
	id: AbilityId,
	name: string,
	description: string,
}> {}
