import { DataClass } from "$lib/DataClass"
import type { Attribute } from "$lib/dnd/attributes"

export class MovePower extends DataClass<Attribute[] | "none" | "any" | "varies"> {
	appliesToAttribute(attribute: Attribute): boolean {
		if (typeof this.data === "string") {
			return this.data === "any" || this.data === "varies"
		}

		return this.data.includes(attribute)
	}

	toString(): string {
		return typeof this.data === "string" ? this.data : this.data.join(", ")
	}
}
