import type { Pokemon } from '$lib/creatures/types'
import type {
    LearnedMove,
    PokemonId,
    ReadWriteKey,
    Trainer,
    TrainerId,
    TrainerInfo,
    TrainerPokemon,
    WithWriteKey,
} from '../types'
import { SupabaseTrainerProvider } from './supabase'
import { supabase } from '$lib/supabase'
import { InMemoryTrainerProvider } from './in-memory'
import * as ENV from '$env/static/public'

export type TrainerData = {
    info: Trainer,
    pokemon: TrainerPokemon[],
    writeKey?: ReadWriteKey,
}

export interface TrainerDataProvider {
    allTrainers: () => Promise<Trainer[]>
    getTrainer: (readKey: ReadWriteKey) => Promise<TrainerData | undefined>
    newTrainer: (info: TrainerInfo) => Promise<TrainerData & WithWriteKey>
    updateTrainerInfo: (writeKey: ReadWriteKey, info: TrainerInfo) => Promise<boolean>
    updatePokemon: (writeKey: ReadWriteKey, info: TrainerPokemon) => Promise<boolean>
    addPokemonToTeam: (writeKey: ReadWriteKey, trainerId: TrainerId, pokemon: Pokemon) => Promise<TrainerPokemon>
    updateMoveset: (writeKey: ReadWriteKey, pokemonId: PokemonId, moves: LearnedMove[]) => Promise<LearnedMove[]>
    updateOneMove: (writeKey: ReadWriteKey, move: LearnedMove) => Promise<boolean>
}

export const provider = ENV.PUBLIC_OFFLINE === 'true'
    ? new InMemoryTrainerProvider()
    : new SupabaseTrainerProvider(supabase)
