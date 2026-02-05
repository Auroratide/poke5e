import { DataClass } from "$lib/DataClass"
import type { Level } from "$lib/dnd/level"
import type { PokeType } from "$lib/pokemon/types"

export class MoveDamage extends DataClass<{
	dice: {
		"1": string,
		"5": string,
		"10": string,
		"17": string,
	},
	modifier: string | number,
	type: PokeType[] | "typeless" | "healing" | "stellar",
}> {
	damage(mod: number, hasStab: boolean, level: Level): {
		dice: string,
		mod: number,
		isHealing: boolean,
	} {
		let trueModifier = 0
		const modifierCode = this.data.modifier
		if (typeof modifierCode === "number") {
			trueModifier = modifierCode
		} else {
			const patternMatch = modifierCode.match(/MOVE(\s*\+\s*(\d+))?/i)
			if (patternMatch) {
				trueModifier = mod + (hasStab ? mod : 0)
				trueModifier += parseInt(patternMatch[2] ?? "0")
			}
		}

		return {
			dice: this.getDamageDice(level.data),
			mod: trueModifier,
			isHealing: this.data.type === "healing",
		}
	}

	private getDamageDice(level: number) {
		const keys = Object.keys(this.data.dice).map(Number)
		const validKeys = keys.filter(key => key <= level)
		const closestKey = Math.max(...validKeys)
		return this.data.dice[closestKey]
	}
}