import { DataClass } from "$lib/DataClass"

export class Level extends DataClass<number> {
	static readonly MIN = 1
	static readonly MAX = 20

	get proficiencyBonus() { return 2 + Math.floor((this.data - 1) / 4) }

	next() {
		return new Level(this.data + 1)
	}

	isValid() {
		return Level.MIN <= this.data && this.data <= Level.MAX
	}

	isBelowMax() {
		return this.data < Level.MAX
	}
}
