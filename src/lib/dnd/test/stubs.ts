import type { Attributes } from "../types"

export function stubAttributes(template: Partial<Attributes> = {}): Attributes {
	return {
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10,
		...template,
	}
}
