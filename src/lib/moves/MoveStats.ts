import type { Attribute } from "$lib/dnd/attributes"

export type MoveStats = {
	toHit?: number,
	save?: {
		attribute: Attribute[],
		dc: number,
	},
	damage?: {
		dice: string,
		mod: number,
		isHealing: boolean,
	},
}
