import { modifierForScore } from "$lib/dnd/attributes"
import { proficiencyBonus } from "$lib/dnd/proficiency"
import type { Attributes } from "$lib/dnd/types"
import type { PokeType } from "$lib/pokemon/types"
import type { Move } from "../types"

export type MovePowers = {
	toHit: number,
	dc: number,
	dmg: number,
}

export type MovePowerDependencies = {
	attributes: Attributes,
	level: number,
	type: PokeType[],
}

const maxBy = <T>(val: (o: T) => number) => (max: T, cur: T) => val(cur) > val(max) ? cur : max

export function deriveMovePowers(move: Move, deps: MovePowerDependencies): MovePowers | undefined {
	if (move.power === "none" || move.power === "varies") return undefined

	const power = move.power === "any"
		? ["str", "dex", "con", "int", "wis", "cha"]
		: move.power

	const bestPower = power.reduce(maxBy((power) => deps.attributes[power]))
	const attributeMod = modifierForScore(deps.attributes[bestPower])

	const pb = proficiencyBonus(deps.level)
	const hasStab = deps.type.includes(move.type)

	return {
		toHit: pb + attributeMod,
		dc: 8 + pb + attributeMod,
		dmg: attributeMod + (hasStab ? attributeMod : 0),
	}
}
