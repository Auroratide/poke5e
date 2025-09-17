import type { Attribute } from "$lib/dnd/attributes"
import type { CreatureSize } from "$lib/dnd/CreatureSize"
import type { HitDiceSize } from "$lib/dnd/hit-dice"
import type { SpeedType } from "$lib/dnd/movement"
import type { SenseType } from "$lib/dnd/senses"
import type { Skill } from "$lib/dnd/skills"
import type { PokeEvolution } from "$lib/pokemon/types"
import type { PokeType } from "$lib/pokemon/types-2"

export type SinglePokemonJsonResponse = {
	id: string,
	name: string,
	number: number,
	type: PokeType[],
	size: CreatureSize,
	sr: number,
	minLevel: number,
	eggGroup: string[],
	gender: string,
	evolution?: PokeEvolution,
	description: string,
	ac: number,
	hp: number,
	hitDice: HitDiceSize,
	speed: {
		type: SpeedType,
		value: number,
	}[],
	attributes: {
		str: number,
		dex: number,
		con: number,
		int: number,
		wis: number,
		cha: number
	},
	skills: Skill[],
	savingThrows: Attribute[],
	senses: {
		type: SenseType,
		value: number,
	}[],
	abilities: {
		id: string,
		hidden: boolean,
	}[],
	moves: {
		start: string[],
		level2: string[],
		level6: string[],
		level10: string[],
		level14: string[],
		level18: string[],
		egg?: string[],
		tm: number[],
	},
	media: {
		main: string,
		sprite?: string,
		mainShiny?: string,
		spriteShiny?: string,
	}
}

export type PokemonJsonResponse = {
	items: SinglePokemonJsonResponse[],
}