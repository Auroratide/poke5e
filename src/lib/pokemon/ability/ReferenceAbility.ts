import { DataClass, type Data } from "$lib/DataClass"
import { getWhenDefined } from "$lib/utils/store"
import { Ability, type AbilityId } from "./Ability"
import { AbilityStore } from "./AbilityStore"

export type ReferenceAbilityId = string

export class ReferenceAbility extends DataClass<{
	id: ReferenceAbilityId,
	name: string,
	description: string,
	deprecated?: boolean,
}> {
	get id() { return this.data.id }
	get name() { return this.data.name }
	get description() { return this.data.description }
	get deprecated() { return this.data.deprecated ?? false }

	static readonly resolve = async (id: AbilityId, referenceId: ReferenceAbilityId): Promise<Ability> => {
		const abilityList = await getWhenDefined(AbilityStore)
		const referenceAbility = abilityList.find((it) => it.id === referenceId)

		if (!referenceAbility) return undefined

		return new Ability({
			id: id,
			referenceId: referenceId,
			name: referenceAbility.name,
			description: referenceAbility.description,
		})
	}

	static readonly normalizeList = (allAbilities: Data<ReferenceAbility>[]) => <T extends HasAbilities>(pokemon: T) => ({
		...pokemon,
		abilities: pokemon.abilities.map(ability => {
			const matchedAbility = allAbilities.find(it => ability.id === it.id)
			if (matchedAbility == null) {
				console.warn(`Missing ability: ${ability.id}`)
			}

			return {
				id: ability.id,
				name: matchedAbility.name,
				description: matchedAbility.description,
				hidden: ability.hidden,
			}
		}),
	})
}

type HasAbilities = {
	abilities: {
		id: ReferenceAbilityId,
		hidden: boolean,
	}[]
}
