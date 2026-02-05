import { DataClass } from "$lib/DataClass"

export class MoveAttack extends DataClass<{
	scope: "melee" | "ranged"
}> {
	get scope() { return this.data.scope }

	toHit(pb: number, mod: number): number {
		return pb + mod
	}
}
