import { DataClass } from "$lib/DataClass"

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
}
