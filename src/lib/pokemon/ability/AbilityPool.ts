import { DataClass } from "$lib/DataClass"
import type { AbilityId } from "./Ability"

export type AbilityList = {
	id: string,
	hidden: boolean,
}[]

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
