import { goto } from 'taiko'

export const startJourney = async (journeyName) => {
    console.log(`Starting Journey: ${journeyName}`)
    await goto('http://localhost:3000')
}

export * from 'taiko'
