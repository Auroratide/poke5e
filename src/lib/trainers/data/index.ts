import type { Pokemon } from '$lib/creatures/types'
import type {
    ReadWriteKey,
    Trainer,
    TrainerId,
    TrainerInfo,
    TrainerPokemon,
} from '../types'
import { SupabaseTrainerProvider } from './supabase'
import { supabase } from '$lib/supabase'

export type TrainerData = {
    info: Trainer,
    pokemon: TrainerPokemon[],
    writeKey?: ReadWriteKey,
}

export interface TrainerDataProvider {
    getTrainer: (readKey: ReadWriteKey) => Promise<TrainerData | undefined>
    updateTrainerInfo: (writeKey: ReadWriteKey, info: TrainerInfo) => Promise<boolean>
    updatePokemon: (writeKey: ReadWriteKey, info: TrainerPokemon) => Promise<boolean>
    addPokemonToTeam: (writeKey: ReadWriteKey, trainerId: TrainerId, pokemon: Pokemon) => Promise<TrainerPokemon>
}

export const provider = new SupabaseTrainerProvider(supabase)
