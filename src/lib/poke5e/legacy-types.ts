import type { Ability } from "../pokemon/types"
import type { HitDice } from "$lib/dnd/hit-dice"
import type { CreatureSize } from "$lib/dnd/CreatureSize"
import type { Attributes, Attribute } from "$lib/dnd/attributes"
import type { SkillRanks } from "$lib/dnd/skills"
import type { SenseType } from "$lib/dnd/senses"
import type { SpeedType } from "$lib/dnd/movement"
import type { PokemonType } from "$lib/pokemon/types-2"
import type { GenderRatio } from "../pokemon/gender"
import type { SpeciesRating } from "./sr"
import type { EggGroup } from "../pokemon/egg-group"

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
	type: PokemonType,
	size: CreatureSize,
	sr: SpeciesRating,
	minLevel: number,
	eggGroup: EggGroup,
	gender: GenderRatio,
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
	moves: MovePool,
	media: PokemonMedia,
}
