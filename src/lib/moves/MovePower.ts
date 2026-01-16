import { DataClass } from "$lib/DataClass"
import type { Attribute, Attributes } from "$lib/dnd/attributes"

export class MovePower extends DataClass<Attribute[] | "none" | "any" | "varies"> {
	appliesToAttribute(attribute: Attribute): boolean {
		if (typeof this.data === "string") {
			return this.data === "any" || this.data === "varies"
		}

		return this.data.includes(attribute)
	}

	attributeList(): Attribute[] {
		if (this.data === "none" || this.data === "varies")
			return []

		return this.data === "any"
			? ["str", "dex", "con", "int", "wis", "cha"]
			: this.data
	}

	/**
	 * Returns multiple in case of a tie, or none if not applicable
	 */
	bestAttribute(attributes: Attributes): Attribute[] {
		let bestPowers: Attribute[] = []
		let bestScore: number = 0
		for (const power of this.attributeList()) {
			const score = attributes[power].score
			if (score === bestScore) {
				bestPowers.push(power)
			} else if (score > bestScore) {
				bestScore = score
				bestPowers = [power]
			}
		}

		return bestPowers
	}

	toString(): string {
		return typeof this.data === "string" ? this.data : this.data.join(", ")
	}
}
