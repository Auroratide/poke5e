import path from "node:path"
import fs from "node:fs/promises"
import { superconsole } from "../superconsole.ts"

// PokeAPI does not expose move flags, so the categories come from Pokemon Showdown's
// data dump instead, which publishes every move as a single JSON file.
const SOURCE = "https://play.pokemonshowdown.com/data/moves.json"

async function main() {
	superconsole.log("Caching showdown moves...")

	const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
	const CACHE_FILE = path.join(CACHE_FOLDER, "showdown-moves.json")

	await fs.mkdir(CACHE_FOLDER, { recursive: true })

	const res = await fetch(SOURCE)

	if (!res.ok) {
		superconsole.failure(`Could not fetch ${SOURCE}: ${res.status} ${res.statusText}`)
		process.exitCode = 1
		return
	}

	const moves = await res.json()

	await fs.writeFile(CACHE_FILE, JSON.stringify(moves), { encoding: "utf-8" })

	superconsole.success(`Fully cached ${Object.keys(moves).length} moves!`)
}

main()
