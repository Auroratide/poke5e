import path from "node:path"
import fs from "node:fs/promises"
import { superconsole } from "../superconsole.ts"

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
	const toCache = process.argv[2]

	superconsole.log(`Caching ${toCache}...`)

	const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
	const CACHE_FILE = path.join(CACHE_FOLDER, `${toCache}.json`)

	await fs.mkdir(CACHE_FOLDER, { recursive: true })

	const listOfThings = await fetch(`https://pokeapi.co/api/v2/${toCache}?limit=100000`)
		.then((res) => res.json())
		.then((json) => json.results)

	const cache: Record<string, any> = {}

	let current = 1
	let errors: any[] = []
	for (const thing of listOfThings) {
		process.stdout.write(`(${current++} / ${listOfThings.length}) Fetching ${thing.name}...\r`)
		const fromApi = await fetch(thing.url)
			.then((res) => res.json())
			.catch((e) => {
				errors.push(e)
				return null
			})

		if (fromApi != null) cache[fromApi.name] = fromApi

		await wait(200)
	}

	await fs.writeFile(CACHE_FILE, JSON.stringify(cache), { encoding: "utf-8" })

	if (errors.length > 0) {
		errors.forEach((e) => {
			superconsole.log(e)
		})

		superconsole.failure(`Found ${errors.length} errors!`)
	} else {
		superconsole.success("\nFully cached!")
	}
}

main()