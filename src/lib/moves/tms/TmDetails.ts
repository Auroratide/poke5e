import { DataClass } from "$lib/DataClass"
import type { Tm } from "./Tm"

export type TmId = number

export class TmDetails extends DataClass<{
	id: TmId,
	cost: number,
}> {
	get id() { return this.data.id }
	get cost() { return this.data.cost }

	static byTmId = (a: Tm, b: Tm) => a.tm.id - b.tm.id
}
