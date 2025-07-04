import type { PokeType, PokeEvolution, Ability } from "../pokemon/types"
import type { Attribute, Skill } from "../dnd/types"
import type { HitDice } from "$lib/dnd/HitDice"
import type { CreatureSize } from "$lib/dnd/CreatureSize"

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
		type: string,
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
		type: string,
		value: number,
	}[],
	abilities: Ability[],
	specialAbilityText?: string,
	evolution?: PokeEvolution,
	moves: MovePool,
	media: PokemonMedia,
}
