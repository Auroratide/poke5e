import { openBrowser, closeBrowser, screenshot } from "taiko"
import { test as trainerJourney } from "./trainers.journey.js"
import { exit } from "process"
import { observe } from "./config.js"
import path from "node:path"
import fs from "node:fs/promises"

async function run() {
	await fs.mkdir(path.join(import.meta.dirname, "screenshots"), { recursive: true })

	let numberFailed = 0
	await openBrowser({
		headless: !observe,
	})

	await trainerJourney().catch(async (e) => {
		console.error(e)
		++numberFailed
		await screenshot({
			path: path.join(import.meta.dirname, "screenshots", "trainer.journey.png"),
			fullPage: true,
		})
	})

	await closeBrowser()

	console.log("\n")
	if (numberFailed > 0) {
		console.error(`${numberFailed} journeys failed!`)
		exit(1)
	} else {
		console.log("All journeys succeeded!")
	}
}

run()
