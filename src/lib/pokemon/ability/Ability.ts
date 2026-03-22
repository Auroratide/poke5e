import { DataClass } from "$lib/DataClass"
import type { ReferenceAbilityId } from "./ReferenceAbility"

export type AbilityId = string

export class Ability extends DataClass<{
	id: AbilityId,
	referenceId?: ReferenceAbilityId
	name: string,
	description: string,
}> {
	get id() { return this.data.id }
	get referenceId() { return this.data.referenceId }
	get name() { return this.data.name }
	get description() { return this.data.description }
	get custom() { return this.data.referenceId == null }

	static readonly createNewStandard = (tmpId: AbilityId, referenceId: ReferenceAbilityId): Ability => {
		return new Ability({
			id: tmpId,
			referenceId: referenceId,
			name: "",
			description: "",
		})
	}

	static readonly createNewCustom = (tmpId: AbilityId): Ability => {
		return new Ability({
			id: tmpId,
			referenceId: undefined,
			name: "",
			description: "",
		})
	}
}
