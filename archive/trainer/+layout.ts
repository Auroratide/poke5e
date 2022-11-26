import type { LayoutLoad } from './$types'
import { InMemoryTrainerClient } from '$lib/trainers/trainers'

export const load: LayoutLoad = async ({ url }) => {
    const client = InMemoryTrainerClient()
    const trainerId = url.searchParams.get('trainer')
    const pokemonId = url.searchParams.get('pokemon')

    const trainer = await client.trainer(trainerId)

    return {
        trainerId,
        pokemonId,
        trainer,
    }
}
