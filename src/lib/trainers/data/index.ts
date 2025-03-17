import type { Pokemon } from "$lib/creatures/types"
import type {
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
import { InMemoryTrainerProvider } from "./in-memory"
import * as ENV from "$env/static/public"

export type TrainerData = {
	info: Trainer,
	pokemon: TrainerPokemon[],
	writeKey?: ReadWriteKey,
}

export type StorageResource = {
	name: string,
	href: string,
}

export type ErrorDiagnostics = {
	code?: string,
	details?: string,
}

export class TrainerDataProviderError extends Error {
	constructor(message: string, readonly diagnostics?: ErrorDiagnostics) {
		super(message + (diagnostics?.code ? ` Code: ${diagnostics.code}` : ""))
	}
}

export interface TrainerDataProvider {
	allTrainers: () => Promise<Trainer[]>
	getTrainer: (readKey: ReadWriteKey) => Promise<TrainerData | undefined>
	newTrainer: (info: Pick<TrainerInfo, "name" | "description">) => Promise<TrainerData & WithWriteKey>
	removeTrainer: (id: TrainerId, readKey: ReadWriteKey) => Promise<void>
	deleteTrainer: (writeKey: ReadWriteKey, id: TrainerId, readKey: ReadWriteKey) => Promise<boolean>
	updateTrainerInfo: (writeKey: ReadWriteKey, info: TrainerInfo) => Promise<boolean>
	updateTrainerAvatar: (writeKey: ReadWriteKey, newAvatar: File, oldResource?: StorageResource) => Promise<StorageResource>
	removeTrainerAvatar: (writeKey: ReadWriteKey, oldResource?: StorageResource) => Promise<void>
	updatePokemon: (writeKey: ReadWriteKey, info: TrainerPokemon) => Promise<boolean>
	addPokemonToTeam: (writeKey: ReadWriteKey, trainerId: TrainerId, pokemon: Pokemon) => Promise<TrainerPokemon>
	removePokemon: (writeKey: ReadWriteKey, id: string) => Promise<boolean>
	updateMoveset: (writeKey: ReadWriteKey, pokemonId: PokemonId, moves: LearnedMove[]) => Promise<LearnedMove[]>
	updateOneMove: (writeKey: ReadWriteKey, move: LearnedMove) => Promise<boolean>
	verifyWriteKey: (trainer: Trainer, writeKey: ReadWriteKey) => Promise<boolean>
}

export const provider = ENV.PUBLIC_OFFLINE === "true"
	? new InMemoryTrainerProvider()
	: new SupabaseTrainerProvider(supabase)
