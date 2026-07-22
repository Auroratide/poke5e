import fs from "node:fs/promises"
import path from "node:path"
import { superconsole } from "../superconsole.ts"

export type Generation = {
	name: string,
	id: number,
	main_region: {
		name: string,
	},
}

let cache: Record<string, any> | undefined = undefined

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const CACHE_FILE = path.join(CACHE_FOLDER, "generation.json")

export async function getOneGeneration(id: string): Promise<Generation | undefined> {
	superconsole.debug(`Fetching generation from cache: ${id}`)

	if (cache == null) {
		cache = JSON.parse(await fs.readFile(CACHE_FILE, { encoding: "utf-8" }))
	}

	return cache?.[id]
}
