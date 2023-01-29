import { openBrowser, closeBrowser } from 'taiko'
import { test as trainerJourney } from './trainers.journey.js'
import { exit } from 'process'
import { observe } from './config.js'

async function run() {
    let numberFailed = 0
    await openBrowser({
        headless: !observe,
    })

    await trainerJourney().catch((e) => {
        console.error(e)
        ++numberFailed
    })

    await closeBrowser()

    console.log('\n')
    if (numberFailed > 0) {
        console.error(`${numberFailed} journeys failed!`)
        exit(1)
    } else {
        console.log('All journeys succeeded!')
    }
}

run()
