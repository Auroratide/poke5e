import { DataClass } from "$lib/DataClass"
import type { AbilityId } from "./Ability"

export type AbilityItem = {
	id: string,
	hidden: boolean,
}

export type AbilityList = AbilityItem[]

export type FindIndexResult = {
	exists: boolean,
	normal: number,
	hidden: number,
}

export class AbilityPool extends DataClass<{
	normal: AbilityId[],
	hidden: AbilityId[],
}> {
	toList(): AbilityList {
		return this.data.normal.map((it) => ({
			id: it,
			hidden: false,
		})).concat(this.data.hidden.map((it) => ({
			id: it,
			hidden: true,
		})))
	}

	/**
	 * This is not a strict get by index. It uses some heuristics to find the ability
	 * that most applies. This logic is used for evolution.
	 */
	findApplicableAbility(result: Pick<FindIndexResult, "normal" | "hidden">): AbilityItem | undefined {
		const ns = this.data.normal
		const hs = this.data.hidden
		const normal = result.normal >= 0 ? ns[Math.min(ns.length - 1, result.normal)] : undefined
		const hidden = result.hidden >= 0 ? hs[Math.min(hs.length - 1, result.hidden)] : undefined

		if (result.hidden >= 0 && hidden == null) {
			const lastNormal = ns[ns.length - 1]
			return lastNormal ? {
				id: lastNormal,
				hidden: false,
			} : undefined
		}

		return normal ? {
			id: normal,
			hidden: false,
		} : hidden ? {
			id: hidden,
			hidden: true,
		} : undefined
	}

	findIndex(ability: AbilityId): FindIndexResult {
		const normal = this.data.normal.indexOf(ability)
		const hidden = this.data.hidden.indexOf(ability)

		return {
			exists: normal >= 0 || hidden >= 0,
			normal,
			hidden,
		}
	}

	isEmpty(): boolean {
		return this.data.normal.length === 0 && this.data.hidden.length === 0
	}

	static fromList(list: AbilityList): AbilityPool {
		return new AbilityPool({
			normal: list.filter((it) => !it.hidden).map((it) => it.id),
			hidden: list.filter((it) => it.hidden).map((it) => it.id),
		})
	}
}
