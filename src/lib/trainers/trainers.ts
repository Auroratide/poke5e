import type { TrainerId, Trainer, WriteId, TrainerPokemon } from './types'
import { inMemoryPokemon, inMemoryTrainers } from './in-memory-data'

export type TrainerData = {
    info: Trainer,
    pokemon: TrainerPokemon[],
    writable: boolean,
}

const latency = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const getWriteId = (id: TrainerId): WriteId | undefined =>
    localStorage.getItem(`write:${id}`)


export const getTrainer = async (id: TrainerId): Promise<undefined | TrainerData> => {
    await latency(400)

    const trainer = inMemoryTrainers.find((it) => it.id === id)
    if (!trainer) return undefined

    const pokemon = inMemoryPokemon.filter((it) => it.trainerId === id)

    const writeId = getWriteId(id)

    return {
        info: trainer,
        pokemon,
        writable: writeId?.length > 0,
    }
}
