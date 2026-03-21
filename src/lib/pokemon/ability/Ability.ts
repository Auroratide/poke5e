import { DataClass, type Data } from "$lib/DataClass"
import { getWhenDefined } from "$lib/utils/store"
import { AbilityStore } from "./AbilityStore"

export type AbilityId = string

export class Ability extends DataClass<{
	id: AbilityId,
	name: string,
	description: string,
	deprecated?: boolean,
}> {
	get id() { return this.data.id }
	get name() { return this.data.name }
	get description() { return this.data.description }
	get deprecated() { return this.data.deprecated ?? false }

	static readonly resolveDescription = async (id: AbilityId): Promise<Ability> => {
		const abilityList = await getWhenDefined(AbilityStore)
		return abilityList.find((it) => it.id === id)
	}

	static readonly normalizeList = (allAbilities: Data<Ability>[]) => <T extends HasAbilities>(pokemon: T) => ({
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
		id: AbilityId,
		hidden: boolean,
	}[]
}
