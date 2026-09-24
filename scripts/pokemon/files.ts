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
		start: string[],
		level2: string[],
		level6: string[],
		level10: string[],
		level14: string[],
		level18: string[],
		egg?: string[],
		tm?: number[],
	},
}

const srdPath = (edition: string) => path.join("src", "lib", "srd", "data", edition, "pokemon", "en.json")

export async function getPokemonSrd(edition: string = "2024"): Promise<PokemonData[]> {
	const raw = await fs.readFile(srdPath(edition), { encoding: "utf-8" })

	return JSON.parse(raw).values
}

export async function writePokemonSrd(data: PokemonData[], edition: string = "2024") {
	const raw = JSON.stringify({ values: data }, null, "\t")

	await fs.writeFile(srdPath(edition), raw, { encoding: "utf-8" })
}
