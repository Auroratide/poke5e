import { DataClass } from "$lib/DataClass"
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
}