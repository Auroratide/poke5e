import type { TrainerId, Trainer } from './types'
import { inMemoryTrainers } from './in-memory-data'
import { browser } from '$app/environment'

export type TrainerClient = {
    trainer: (trainer: TrainerId) => Promise<Trainer | undefined>
}

export const InMemoryTrainerClient: () => TrainerClient = () => ({
    trainer: async (trainer: TrainerId) => {
        if (browser)
            return inMemoryTrainers.find((it) => it.name === trainer)
        else
            return undefined
    }
})
