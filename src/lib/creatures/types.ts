import type { PokeType, PokeEvolution, Ability } from "../pokemon/types"
import type { HitDice } from "$lib/dnd/HitDice"
import type { CreatureSize } from "$lib/dnd/CreatureSize"
import type { Attributes, Attribute } from "$lib/dnd/attributes"
import type { SkillRanks } from "$lib/dnd/skills"
import type { SenseType } from "$lib/dnd/senses"
import type { SpeedType } from "$lib/dnd/movement"

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
		type: SpeedType,
		value: number,
	}[],
	attributes: Attributes,
	skills: SkillRanks,
	savingThrows: Attribute[],
	senses: {
		type: SenseType,
		value: number,
	}[],
	abilities: Ability[],
	specialAbilityText?: string,
	evolution?: PokeEvolution,
	moves: MovePool,
	media: PokemonMedia,
}
