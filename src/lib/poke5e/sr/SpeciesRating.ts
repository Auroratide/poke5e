import { DataClass } from "$lib/DataClass"
import type { Level } from "$lib/dnd/level"

export class SpeciesRating extends DataClass<number> {
	toString = () => {
		if (this.data <= 0.125) {
			return "⅛"
		} else if (this.data <= 0.25) {
			return "¼"
		} else if (this.data <= 0.5) {
			return "½"
		} else {
			return Math.round(this.data).toString()
		}
	}

	static maxAllowed(level: Level): SpeciesRating {
		const sr = [2, 2, 5, 5, 5, 8, 8, 10, 10, 10, 12, 12, 12, 14, 14, 14, 15, 15, 15, 15][level.data - 1]
		return new SpeciesRating(sr)
	}
}
