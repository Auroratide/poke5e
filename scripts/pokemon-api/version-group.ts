import fs from "node:fs/promises"
import path from "node:path"
import { superconsole } from "../superconsole.ts"

export type VersionGroup = {
	name: string,
	generation: {
		name: string,
	},
	regions: {
		name: string,
	}[],
}

let cache: Record<string, any> | undefined = undefined

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const CACHE_FILE = path.join(CACHE_FOLDER, "version-group.json")

export async function getOneVersionGroup(id: string): Promise<VersionGroup | undefined> {
	superconsole.debug(`Fetching version group from cache: ${id}`)

	if (cache == null) {
		cache = JSON.parse(await fs.readFile(CACHE_FILE, { encoding: "utf-8" }))
	}

	return cache?.[id]
}
