import type { Attributes, Attribute } from "$lib/dnd/attributes"
import type { Level } from "$lib/dnd/level"
import type { PokeType } from "$lib/pokemon/types-2"
import type { Move } from "../types"

export type MovePowers = {
	toHit: number,
	dc: number,
	dmg: number,
}

export type MovePowerDependencies = {
	attributes: Attributes,
	level: Level,
	type: PokeType[],
}

const maxBy = <T>(val: (o: T) => number) => (max: T, cur: T) => val(cur) > val(max) ? cur : max

export function deriveMovePowers(move: Move, deps: MovePowerDependencies): MovePowers | undefined {
	if (move.power === "none" || move.power === "varies") return undefined

	const power: Attribute[] = move.power === "any"
		? ["str", "dex", "con", "int", "wis", "cha"]
		: move.power

	const bestPower = power.reduce(maxBy((power) => deps.attributes[power].score))
	const attributeMod = deps.attributes[bestPower].modifier

	const pb = deps.level.proficiencyBonus
	const hasStab = deps.type.includes(move.type)

	return {
		toHit: pb + attributeMod,
		dc: 8 + pb + attributeMod,
		dmg: attributeMod + (hasStab ? attributeMod : 0),
	}
}
