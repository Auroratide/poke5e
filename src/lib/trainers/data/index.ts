import type {
	HeldItem,
	InventoryItem,
	LearnedMove,
	PokemonId,
	ReadWriteKey,
	Trainer,
	TrainerId,
	TrainerInfo,
	TrainerPokemon,
	WithWriteKey,
} from "../types"
import { SupabaseTrainerProvider } from "./supabase"
import { supabase } from "$lib/supabase"
import type { ChosenFeat } from "$lib/dnd/feats/ChosenFeat"
import { userAssets } from "$lib/site/user-assets"
import type { PokemonSpecies } from "$lib/poke5e/species"
import { DetailedError } from "$lib/site/errors"
import type { PostgrestError } from "@supabase/supabase-js"

export type TrainerData = {
	info: Trainer,
	pokemon: TrainerPokemon[],
	writeKey?: ReadWriteKey,
}

export type StorageResource = {
	name: string,
	href: string,
}

export class TrainerDataProviderError extends DetailedError {
	constructor(message: string, readonly diagnostics?: PostgrestError) {
		super(message + (diagnostics?.code ? ` Code: ${diagnostics?.code}` : ""), diagnostics ? `Code: ${diagnostics.code}; ${diagnostics.message}` : "", diagnostics)
	}
}

export interface TrainerDataProvider {
	allTrainers: () => Promise<Trainer[]>
	getTrainer: (readKey: ReadWriteKey) => Promise<TrainerData | undefined>
	newTrainer: (info: Pick<TrainerInfo, "name" | "description">) => Promise<TrainerData & WithWriteKey>
	removeTrainer: (id: TrainerId, readKey: ReadWriteKey) => Promise<void>
	deleteTrainer: (writeKey: ReadWriteKey, id: TrainerId, readKey: ReadWriteKey) => Promise<boolean>
	updateTrainerInfo: (writeKey: ReadWriteKey, readKey: ReadWriteKey, info: TrainerInfo) => Promise<boolean>
	updateTrainerAvatar: (writeKey: ReadWriteKey, readKey: ReadWriteKey, newAvatar: File, oldResource?: StorageResource) => Promise<StorageResource>
	removeTrainerAvatar: (writeKey: ReadWriteKey, readKey: ReadWriteKey, oldResource?: StorageResource) => Promise<void>
	updatePokemon: (writeKey: ReadWriteKey, readKey: ReadWriteKey, info: TrainerPokemon) => Promise<boolean>
	updatePokemonAvatar: (writeKey: ReadWriteKey, readKey: ReadWriteKey, info: TrainerPokemon, newAvatar: File) => Promise<StorageResource>
	removePokemonAvatar: (writeKey: ReadWriteKey, readKey: ReadWriteKey, info: TrainerPokemon) => Promise<void>
	addPokemonToTeam: (writeKey: ReadWriteKey, readKey: ReadWriteKey, trainerId: TrainerId, pokemon: PokemonSpecies, rank?: number) => Promise<TrainerPokemon>
	reorderPokemonTeam: (writeKey: ReadWriteKey, readKey: ReadWriteKey, order: TrainerPokemon[]) => Promise<boolean>
	removePokemon: (writeKey: ReadWriteKey, readKey: ReadWriteKey, id: string) => Promise<boolean>
	updateMoveset: (writeKey: ReadWriteKey, readKey: ReadWriteKey, pokemonId: PokemonId, moves: LearnedMove[]) => Promise<LearnedMove[]>
	updateOneMove: (writeKey: ReadWriteKey, move: LearnedMove) => Promise<boolean>
	updateAllHeldItems: (writeKey: ReadWriteKey, pokemonId: PokemonId, heldItems: HeldItem[]) => Promise<HeldItem[]>
	updateTrainerInventory: (writeKey: ReadWriteKey, readKeey: ReadWriteKey, inventory: InventoryItem[]) => Promise<InventoryItem[]>
	updateTrainerItem: (writeKey: ReadWriteKey, item: InventoryItem) => Promise<boolean>
	updateTrainerFeats: (writeKey: ReadWriteKey, readKey: ReadWriteKey, feats: ChosenFeat[]) => Promise<ChosenFeat[]>
	updatePokemonFeats: (writeKey: ReadWriteKey, pokemonId: PokemonId, feats: ChosenFeat[]) => Promise<ChosenFeat[]>
	verifyWriteKey: (trainer: Trainer, writeKey: ReadWriteKey) => Promise<boolean>
}

export const provider = new SupabaseTrainerProvider(supabase, userAssets)
