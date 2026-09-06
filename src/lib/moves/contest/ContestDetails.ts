import { DataClass } from "$lib/DataClass"
import type { ContestEffectJson } from "$lib/srd/contest-effects/schema"
import type { ContestJson } from "$lib/srd/contest/schema"
import type { ContestMoveEffect } from "./ContestMoveEffect"
import type { ContestType } from "./ContestType"

export class ContestDetails extends DataClass<{
	contest: ContestType,
	appeal: number,
	jam: number,
	effect: ContestMoveEffect,
}> {
	get contest() { return this.data.contest }
	get appeal() { return this.data.appeal }
	get jam() { return this.data.jam }
	get effect() { return this.data.effect }

	static readonly fromJson = (json: ContestJson | undefined, effect: ContestEffectJson | undefined): ContestDetails | undefined => {
		if (json == null || effect == null) return undefined

		return new ContestDetails({
			contest: json.contest,
			appeal: json.appeal,
			jam: json.jam,
			effect: {
				id: effect.id,
				name: effect.name,
				effect: effect.effect,
			},
		})
	}
}
