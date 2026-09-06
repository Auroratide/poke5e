import type { Level } from "$lib/dnd/level"
import type { Stab } from "$lib/pokemon/stab"
import { PokemonType, type PokeType, type TeraType } from "$lib/pokemon/types"
import type { Edition } from "$lib/srd/editions"
import type { MoveJson } from "$lib/srd/moves/schema"
import { DiceClass, type DiceRoll, type DiceTiers } from "./DiceClass"

export type MoveDiceType = "damage" | "healing" | "reduction"

export type MoveDice = {
	class: DiceClass | "custom",
	tiers: DiceTiers,
	modifier: string,
	type: MoveDiceType,
}

function getDamageDice(dice: MoveDice, level: number): DiceRoll {
	const index = (level >= 5 ? 1 : 0) + (level >= 10 ? 1 : 0) + (level >= 17 ? 1 : 0)

	return dice.tiers[index]
}

export const MoveDice = {
	fromJson: (json: MoveJson["dice"] | undefined): MoveDice | undefined => json != null
		? {
			class: json.class,
			tiers: json.class === "custom" ? json.tiers as unknown as DiceTiers : DiceClass.getTier(json.class),
			modifier: json.modifier,
			type: json.type,
		}
		: undefined,

	damage: (dice: MoveDice, stab: Stab, mod: number, moveType: TeraType | "varies" | "typeless", pokemonType: PokeType[], level: Level, rulesVersion: Edition): {
		dice: string,
		mod: number,
		isHealing: boolean,
		stabApplied: boolean,
	} => {
		let hasStab = dice.type === "damage" && PokemonType.isPokeType(moveType) ? pokemonType.includes(moveType) : false

		let trueModifier = hasStab ? stab.calculate(mod, level, rulesVersion) : 0
		const modifierCode = dice.modifier
		if (typeof modifierCode === "number") {
			trueModifier += modifierCode
		} else {
			const patternMatch = modifierCode.match(/MOVE(\s*\+\s*(\d+))?/i)
			if (modifierCode === "LEVEL") {
				trueModifier += level.data
			} else if (modifierCode === "MOVE + STAB") {
				trueModifier += mod + stab.calculate(mod, level, rulesVersion)
				hasStab = true
			} else if (patternMatch) {
				trueModifier += mod
				trueModifier += parseInt(patternMatch[2] ?? "0")
			}
		}

		return {
			dice: getDamageDice(dice, level.data),
			mod: trueModifier,
			isHealing: dice.type === "healing",
			stabApplied: hasStab,
		}
	},

	getDamageDice,
}