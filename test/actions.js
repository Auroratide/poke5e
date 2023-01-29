import { goto } from 'taiko'
import { url } from './config.js'

export const startJourney = async (journeyName) => {
    console.log(`Starting Journey: ${journeyName}`)
    await goto(url)
}

export * from 'taiko'
