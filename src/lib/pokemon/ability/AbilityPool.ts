import type { PokemonSpecies } from "$lib/poke5e/species"
import { DataClass, type Data } from "$lib/DataClass"
import { Ability, type ReferenceAbilityId } from "./Ability"

type AvailableAbility = {
	value: Ability,
	hidden: boolean,
}

export type FindIndexResult = {
	exists: boolean,
	normal: number,
	hidden: number,
}

/**
 * Represents a list of POSSIBLE abilities a species may have
 */
export class AbilityPool extends DataClass<{
	normal: Data<Ability>[],
	hidden: Data<Ability>[],
}> {
	get normal() { return this.data.normal.map((it) => new Ability(it)) }
	get hidden() { return this.data.hidden.map((it) => new Ability(it)) }

	toList(): AvailableAbility[] {
		const list = this.data.normal.map((it) => ({
			value: new Ability(it),
			hidden: false,
		})).concat(this.data.hidden.map((it) => ({
			value: new Ability(it),
			hidden: true,
		})))

		// remove duplicates
		return list.filter((a, i) =>
			list.findIndex((b) => a.value.isExactlyTheSame(b.value)) === i
		)
	}

	/**
	 * This is not a strict get by index. It uses some heuristics to find the ability
	 * that most applies. This logic is used for evolution.
	 */
	findApplicableAbility(result: Pick<FindIndexResult, "normal" | "hidden">): AvailableAbility | undefined {
		const ns = this.normal
		const hs = this.hidden
		const normal = result.normal >= 0 ? ns[Math.min(ns.length - 1, result.normal)] : undefined
		const hidden = result.hidden >= 0 ? hs[Math.min(hs.length - 1, result.hidden)] : undefined

		if (result.hidden >= 0 && hidden == null) {
			const lastNormal = ns[ns.length - 1]
			return lastNormal ? {
				value: lastNormal,
				hidden: false,
			} : undefined
		}

		return normal ? {
			value: normal,
			hidden: false,
		} : hidden ? {
			value: hidden,
			hidden: true,
		} : undefined
	}

	findIndex(ability: Ability): FindIndexResult {
		const normal = this.indexInAbilityList(this.data.normal, ability.data)
		const hidden = this.indexInAbilityList(this.data.hidden, ability.data)

		return {
			exists: normal >= 0 || hidden >= 0,
			normal,
			hidden,
		}
	}

	private indexInAbilityList(list: Data<Ability>[], ability: Data<Ability>): number {
		for (let i = 0; i < list.length; ++i) {
			const inList = list[i]
			if ((ability.referenceId != null && ability.referenceId === inList.referenceId) || (ability.referenceId == null && ability.name === inList.name && ability.description === inList.description)) {
				return i
			}
		}

		return -1
	}

	isEmpty(): boolean {
		return this.data.normal.length === 0 && this.data.hidden.length === 0
	}

	static async fromList(list: { id: ReferenceAbilityId, hidden: boolean }[]): Promise<AbilityPool> {
		const normal = await Promise.all(
			list.filter((it) => !it.hidden).map((it) => Ability.resolve(it.id)),
		)

		const hidden = await Promise.all(
			list.filter((it) => it.hidden).map((it) => Ability.resolve(it.id)),
		)

		return new AbilityPool({
			normal: normal.map((it) => it.data),
			hidden: hidden.map((it) => it.data),
		})
	}

	static groupSpeciesByAbility(abilities: ReferenceAbilityId[], pokemon: PokemonSpecies[]): Record<ReferenceAbilityId, PokemonSpecies[]> {
		if (abilities == null || pokemon == null || abilities?.length === 0 || pokemon?.length === 0)
			return {}
	
		const pokemonHasAbility = (ability: ReferenceAbilityId) => (pokemon: PokemonSpecies) =>
			pokemon.abilities.findIndex(new Ability({ referenceId: ability, name: "", description: "" })).exists
	
		return abilities.reduce((all, ability) => ({
			...all,
			[ability]: pokemon.filter(pokemonHasAbility(ability)),
		}), {})
	}
}
