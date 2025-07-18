import type { Attribute, Attributes } from "$lib/dnd/attributes"
import type { CreatureSize } from "$lib/dnd/CreatureSize"
import type { Pokemon } from "../creatures/types"
import type { Move } from "$lib/moves/types"
import type { AbilityId, PokeType, TeraPokeType } from "$lib/pokemon/types"
import type { NonVolatileStatus } from "$lib/pokemon/status"
import type { StorageResource } from "./data"
import type { Nature } from "./nature"
import type { Specializations } from "./specializations"
import type { ChosenTrainerPath } from "./paths/ChosenTrainerPath"
import type { ChosenFeat } from "$lib/feats/ChosenFeat"
import type { DndSpeeds } from "$lib/dnd/DndSpeeds"
import type { DndSenses } from "$lib/dnd/DndSenses"
import type { HitDice } from "$lib/dnd/HitDice"
import type { SkillRanks } from "$lib/dnd/types"

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

export type LearnedMove = {
	id: string,
	moveId: string,
	pp: Resource,
	notes?: string,
}

export type StandardHeldItem = {
	type: "standard",
	itemId: string,
}

export type CustomHeldItem = {
	type: "custom",
	name: string,
	description: string,
}

export type HeldItem = { id: string } & (StandardHeldItem | CustomHeldItem)
export type InventoryItem = HeldItem & { quantity: number }
export type MaybeQuantity = { quantity?: number }

export type PokemonBond = {
	level: number,
	points: Resource,
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
	exp: number,
	gender: Gender,
	attributes: Attributes,
	ac: number,
	hp: Resource,
	hitDice: Resource,
	ability: AbilityId,
	proficiencies: SkillRanks,
	savingThrows: Attribute[],
	moves: LearnedMove[],
	items: HeldItem[],
	notes: string,
	teraType: TeraPokeType | "",
	status: NonVolatileStatus | null,
	isShiny: boolean,
	feats: ChosenFeat[],
	customSize?: CreatureSize,
	customHitDiceSize?: HitDice,
	speeds: DndSpeeds,
	senses: DndSenses,
	bond: PokemonBond,
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

export type TrainerBio = {
	species: string | null,
	gender: string | null,
	age: number | null,
	homeRegion: string | null,
	background: string | null,
}

export type TrainerInfo = {
	name: string,
	description: string,
	level: number,
	ac: number,
	hp: Resource,
	hitDice: Resource,
	attributes: Attributes,
	proficiencies: SkillRanks,
	savingThrows: Attribute[],
	biography: TrainerBio,
	money: number,
	inventory: InventoryItem[],
	avatar?: StorageResource,
	specializations: Specializations,
	path: ChosenTrainerPath,
	feats: ChosenFeat[],
}
export type Trainer = TrainerInfo & {
	id: TrainerId,
	readKey: ReadWriteKey,
}
export type WithWriteKey = {
	writeKey: ReadWriteKey,
}
