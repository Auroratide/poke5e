import type { TrainerId, Trainer, WriteId } from './types'
import { inMemoryTrainers } from './in-memory-data'

export const TrainersDataStorage = {
    writeId: (id: TrainerId) => ({
        get: () => localStorage.getItem(`write:${id}`),
    }),
}

export type TrainerClient = {
    get: () => Promise<Trainer | undefined>
    update?: (data: Partial<Trainer>) => Promise<void>
}

export type TrainersDataClient = {
    trainer: (id: TrainerId) => TrainerClient
}

export const InMemoryClient: () => TrainersDataClient = () => ({
    trainer: (id: TrainerId) => {
        const writeId = TrainersDataStorage.writeId(id).get()

        const get = async () => {
            console.log(`GETTING ${id}`)
            return inMemoryTrainers.find((it) => it.id === id)
        }
        const update = writeId ? async (data: Partial<Trainer>) => {
            const trainer = inMemoryTrainers.find((it) => it.id === id)
            if (trainer && trainer.writeId === writeId) {
                if (data.name) trainer.name = data.name
                if (data.description) trainer.description = data.description
            } else {
                throw new Error('Could not write to trainer')
            }
        } : undefined

        return { get, update }
    }
})
