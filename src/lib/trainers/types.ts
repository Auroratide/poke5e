import type { Skill, Attribute, Attributes } from "../dnd/types"
import type { Pokemon } from "../creatures/types"
import type { Move } from "$lib/moves/types"
import type { AbilityId, PokeType, TeraPokeType } from "$lib/pokemon/types"

export type Resource = {
	current: number,
	max: number,
}

export enum Gender {
	Male = "male",
	Female = "female",
	None = "none",
	Other = "other",
}

export const Natures = [
	"reckless",
	"rash",
	"brave",
	"arrogant",
	"skittish",
	"hasty",
	"energetic",
	"clumsy",
	"apathetic",
	"stubborn",
	"grumpy",
	"relaxed",
	"careful",
	"curious",
	"naughty",
	"cheerful",
	"sassy",
	"innocent",
	"hardy",
	"nimble",
] as const
export type Nature = (typeof Natures)[number] | string

export type LearnedMove = {
	id: string,
	moveId: string,
	pp: Resource,
	notes?: string,
}

export type PokemonId = string
export type TrainerPokemon = {
	id: PokemonId,
	trainerId: TrainerId,
	pokemonId: string,
	nickname: string,
	type: PokeType[],
	nature: Nature,
	level: number,
	gender: Gender,
	attributes: Attributes,
	ac: number,
	hp: Resource,
	hitDice: Resource,
	ability: AbilityId,
	proficiencies: Skill[],
	savingThrows: Attribute[],
	moves: LearnedMove[],
	notes: string,
	teraType: TeraPokeType | "",
}

export type WithPokemonData = {
	pokemonData: Pokemon,
}

export type WithMoveData = {
	moveData: {
		[key: string]: Move
	}
}

export type TrainerId = string
export type ReadWriteKey = string

export type TrainerInfo = {
	name: string,
	description: string,
	level: number,
	ac: number,
	hp: Resource,
	hitDice: Resource,
	attributes: Attributes,
	proficiencies: Skill[],
	savingThrows: Attribute[],
}
export type Trainer = TrainerInfo & {
	id: TrainerId,
	readKey: ReadWriteKey,
}
export type WithWriteKey = {
	writeKey: ReadWriteKey,
}

export type Specializations = { [type in PokeType]?: number }
