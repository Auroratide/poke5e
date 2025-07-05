import type { PokeType, PokeEvolution, Ability } from "../pokemon/types"
import type { Attribute, Skill } from "../dnd/types"
import type { HitDice } from "$lib/dnd/HitDice"
import type { CreatureSize } from "$lib/dnd/CreatureSize"
import type { DndSpeedType } from "$lib/dnd/DndSpeeds"
import type { DndSenseType } from "$lib/dnd/DndSenses"

export type PokemonMedia = {
	main?: string,
	mainShiny?: string,
	sprite?: string,
	spriteShiny?: string,
	attribution?: string,
}

export type MovePool = {
	start: string[],
	level2?: string[],
	level6?: string[],
	level10?: string[],
	level14?: string[],
	level18?: string[],
	egg?: string[],
	tm?: number[],
}

export type Pokemon = {
	id: string,
	name: string,
	number: number,
	type: PokeType[],
	size: CreatureSize,
	sr: number,
	minLevel: number,
	eggGroup: string[],
	gender: string,
	description: string,
	ac: number,
	hp: number,
	hitDice: HitDice,
	speed: {
		type: DndSpeedType,
		value: number,
	}[],
	attributes: {
		str: number,
		dex: number,
		con: number,
		int: number,
		wis: number,
		cha: number,
	},
	skills: Skill[],
	savingThrows: Attribute[],
	senses: {
		type: DndSenseType,
		value: number,
	}[],
	abilities: Ability[],
	specialAbilityText?: string,
	evolution?: PokeEvolution,
	moves: MovePool,
	media: PokemonMedia,
}

export function withCustomDistances<DistanceTypes extends Readonly<Record<string, string>>>(allDistanceTypes: DistanceTypes, nativeDistances: { type: DistanceTypes[keyof DistanceTypes], value: number }[], customDistances: Partial<Record<DistanceTypes[keyof DistanceTypes], number>>): Record<DistanceTypes[keyof DistanceTypes], number> {
	return Object.values(allDistanceTypes).reduce((total, current) => ({
		...total,
		[current]: customDistances[current] ?? nativeDistances.find((it) => it.type === current)?.value,
	}), {} as Record<keyof DistanceTypes, number>)
}
