import { DataClass } from "$lib/DataClass"

export class Level extends DataClass<number> {
	get proficiencyBonus() { return 2 + Math.floor((this.data - 1) / 4) }
}
