import { DataClass, type Data } from "$lib/DataClass"

export type AbilityId = string

export class Ability extends DataClass<{
	id: AbilityId,
	name: string,
	description: string,
}> {
	static readonly normalizeList = (allAbilities: Data<Ability>[]) => (pokemon: {
		abilities: {
			id: AbilityId,
			hidden: boolean,
		}[]
	}) => ({
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
