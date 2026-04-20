import { DataClass, type Data } from "$lib/DataClass"
import { getWhenDefined } from "$lib/utils/store"
import { AbilityStore, type AbilityJson } from "./AbilityStore"

export type ReferenceAbilityId = string

// useful for db storage
export type CollapsedAbility = {
	referenceId: ReferenceAbilityId,
} | {
	name: string,
	description: string,
}

export class Ability extends DataClass<{
	referenceId?: ReferenceAbilityId
	name: string,
	description: string,
	deprecated?: boolean,
}> {
	get referenceId() { return this.data.referenceId }
	get name() { return this.data.name }
	get description() { return this.data.description }
	get deprecated() { return this.data.deprecated ?? false }
	get custom() { return this.data.referenceId == null }

	isSameName(other: Ability): boolean {
		if (this.referenceId != null || other.referenceId != null) {
			return this.referenceId === other.referenceId
		} else {
			return this.name === other.name
		}
	}

	isExactlyTheSame(other: Ability): boolean {
		if (this.referenceId != null || other.referenceId != null) {
			return this.referenceId === other.referenceId
		} else {
			return this.name === other.name && this.description === other.description
		}
	}

	collapse(): CollapsedAbility {
		return this.data.referenceId ? {
			referenceId: this.data.referenceId,
		} : {
			name: this.data.name,
			description: this.data.description,
		}
	}

	static readonly resolve = async (referenceId: ReferenceAbilityId): Promise<Ability> => {
		const abilityList = await getWhenDefined(AbilityStore, [])
		const referenceAbility = abilityList.find((it) => it.referenceId === referenceId)

		return new Ability({
			referenceId: referenceId,
			name: referenceAbility?.name ?? referenceId,
			description: referenceAbility?.description ?? "",
		})
	}

	static readonly createNewStandard = (referenceId: ReferenceAbilityId): Ability => {
		return new Ability({
			referenceId: referenceId,
			name: "",
			description: "",
		})
	}

	static readonly createNewCustom = (): Ability => {
		return new Ability({
			referenceId: undefined,
			name: "",
			description: "",
		})
	}

	static readonly normalizeList = (allAbilities: AbilityJson[]) => <T extends HasAbilities>(pokemon: T) => ({
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
