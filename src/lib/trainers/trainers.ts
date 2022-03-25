import type { Trainer } from './types'
import { inMemoryTrainers } from './data'

export const getTrainer = async (trainerId: string): Promise<Trainer> => {
    return inMemoryTrainers.find(it => it.id === trainerId)
}
