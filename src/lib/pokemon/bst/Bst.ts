import { DataClass } from "$lib/DataClass"

export class Bst extends DataClass<{
	hp: number,
	attack: number,
	defense: number,
	specialAttack: number,
	specialDefense: number,
	speed: number,
}> {
	total() {
		return Object.values(this.data).reduce((sum, cur) => sum + cur, 0)
	}
}
