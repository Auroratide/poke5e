import { DataClass, type Data } from "$lib/DataClass"

export type AbilityId = string

export class Ability extends DataClass<{
	id: AbilityId,
	name: string,
	description: string,
}> {
	get id() { return this.data.id }
	get name() { return this.data.name }
	get description() { return this.data.description }

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
