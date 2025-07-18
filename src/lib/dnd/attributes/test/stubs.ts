import type { Data } from "$lib/DataClass"
import { Attributes } from ".."

export function stubAttributes(template: Partial<Data<Attributes>> = {}): Attributes {
	return new Attributes({
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10,
		...template,
	})
}