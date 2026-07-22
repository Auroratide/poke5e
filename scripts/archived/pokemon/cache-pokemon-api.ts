import path from "node:path"
import fs from "node:fs/promises"

const CACHE_FOLDER = path.join("scripts", "pokemon", ".pokeapi")
const CACHE_FILE = path.join(CACHE_FOLDER, "pokemon.json")

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function main() {
	await fs.mkdir(CACHE_FOLDER, { recursive: true })

	const listOfPokemon = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
		.then((res) => res.json())
		.then((json) => json.results)

	const cache: Record<string, any> = {}

	let current = 1
	for (const pokemon of listOfPokemon) {
		process.stdout.write(`(${current++} / ${listOfPokemon.length}) Fetching ${pokemon.name}...\r`)
		const fromApi = await fetch(pokemon.url)
			.then((res) => res.json())

		cache[fromApi.name] = fromApi

		await wait(200)
	}

	await fs.writeFile(CACHE_FILE, JSON.stringify(cache), { encoding: "utf-8" })
	console.log("\nFully cached!")
}

main()