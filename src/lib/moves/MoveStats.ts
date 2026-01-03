import type { Attributes, Attribute } from "$lib/dnd/attributes"
import type { Level } from "$lib/dnd/level"
import type { PokeType } from "$lib/pokemon/types"
import type { Move } from "./Move"

export type MoveStats = {
	toHit: number,
	dc: number,
	dmg: number,
}

export type MoveStatsDependencies = {
	attributes: Attributes,
	level: Level,
	type: PokeType[],
}

const maxBy = <T>(val: (o: T) => number) => (max: T, cur: T) => val(cur) > val(max) ? cur : max

export function deriveMoveStats(move: Move, deps: MoveStatsDependencies): MoveStats | undefined {
	if (move.power.data === "none" || move.power.data === "varies") return undefined

	const power: Attribute[] = move.power.data === "any"
		? ["str", "dex", "con", "int", "wis", "cha"]
		: move.power.data

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
