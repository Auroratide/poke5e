import type { Skill, Attribute, Attributes } from "../dnd/types"
import type { Pokemon } from "../creatures/types"
import type { Move } from "$lib/moves/types"
import type { AbilityId, PokeType, TeraPokeType } from "$lib/pokemon/types"
import type { NonVolatileStatus } from "$lib/pokemon/status"
import type { StorageResource } from "./data"
import type { Nature } from "./nature"
import type { Specialization } from "./specializations"

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
	items: HeldItem[],
	notes: string,
	teraType: TeraPokeType | "",
	status: NonVolatileStatus | null,
	isShiny: boolean,
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
	proficiencies: Skill[],
	savingThrows: Attribute[],
	biography: TrainerBio,
	money: number,
	inventory: InventoryItem[],
	avatar?: StorageResource,
	specializations: Map<Specialization, number>,
}
export type Trainer = TrainerInfo & {
	id: TrainerId,
	readKey: ReadWriteKey,
}
export type WithWriteKey = {
	writeKey: ReadWriteKey,
}

export type Specializations = { [type in PokeType]?: number }
