import { DataClass } from "$lib/DataClass"
import type { Attribute } from "$lib/dnd/attributes"

export class MoveSave extends DataClass<{
	attribute: Attribute[],
	dc: string, // it's always "MOVE" for now
}> {
	withDc(pb: number, mod: number): {
		attribute: Attribute[],
		dc: number,
	} {
		return {
			attribute: this.data.attribute,
			dc: 8 + pb + mod,
		}
	}
}
