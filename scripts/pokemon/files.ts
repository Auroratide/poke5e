import path from "node:path"
import fs from "node:fs/promises"

export type PokemonData = {
	id: string, // eg. bulbasaur
	name: string,
	number: number,
	habitat: {
		biomes: string[],
		nativeRegion?: string,
		regions?: string[],
	},
	moves: {
		tm: number[],
	},
}

const PATH = path.join("static", "data", "pokemon.json")

export async function getPokemonData(): Promise<PokemonData[]> {
	const raw = await fs.readFile(PATH, { encoding: "utf-8" })

	return JSON.parse(raw).items
}

export async function writePokemonData(data: PokemonData[]) {
	const raw = JSON.stringify({ items: data }, null, "\t")

	await fs.writeFile(PATH, raw, { encoding: "utf-8" })
}
