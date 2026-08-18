import path from "node:path"
import fs from "node:fs/promises"
import { superconsole } from "../superconsole.ts"

export type ShowdownMove = {
	name: string,
	flags?: Record<string, 1 | undefined>,
	multihit?: number | number[],
}

let cache: Record<string, ShowdownMove> | undefined = undefined

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const CACHE_FILE = path.join(CACHE_FOLDER, "showdown-moves.json")

const getShowdownId = (jsonId: string) => {
	switch (jsonId) {
	case "vice-grip": return "visegrip"
	}

	// showdown ids are just the name with everything but letters and numbers stripped
	return jsonId.toLowerCase().replace(/[^a-z0-9]/g, "")
}

export async function getOneShowdownMove(id: string): Promise<ShowdownMove | undefined> {
	superconsole.debug(`Fetching move from cache: ${id}`)

	if (cache == null) {
		cache = JSON.parse(await fs.readFile(CACHE_FILE, { encoding: "utf-8" }))
	}

	return cache?.[getShowdownId(id)]
}
