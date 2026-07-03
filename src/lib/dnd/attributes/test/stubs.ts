import type { Data } from "$lib/DataClass"
import { AbilityScoreImprovement, Attributes } from ".."

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

export function stubAsi(template: Partial<AbilityScoreImprovement> = {}): AbilityScoreImprovement {
	return {
		str: 0,
		dex: 0,
		con: 0,
		int: 0,
		wis: 0,
		cha: 0,
		...template,
	}
}
