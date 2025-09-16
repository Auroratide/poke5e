import { DataClass } from "$lib/DataClass"
import type { AbilityId } from "./Ability"

export class AbilityPool extends DataClass<{
	normal: AbilityId[],
	hidden: AbilityId[],
}> {
	static fromList(list: { id: string, hidden: boolean}[]): AbilityPool {
		return new AbilityPool({
			normal: list.filter((it) => !it.hidden).map((it) => it.id),
			hidden: list.filter((it) => it.hidden).map((it) => it.id),
		})
	}
}
