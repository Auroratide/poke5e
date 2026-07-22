import fs from "node:fs/promises"
import path from "node:path"

const POKEMON_PATH = path.join("static", "data", "pokemon.json")
const POKEMON_MODDED_PATH = path.join("static", "data", "pokemon-modded.json")

async function readJsonFile(filePath: string) {
	const text = await fs.readFile(filePath, { encoding: "utf-8" })
	const cleaned = text.replace(/^\uFEFF/, '')

	return JSON.parse(cleaned)
}

async function main() {
	const pokemonList = (await readJsonFile(POKEMON_PATH)).items

	for (const pokemon of pokemonList) {
		if (pokemon.habitat == null) {
			console.log(`${pokemon.name} is missing biomes?`)
			continue
		}
		const iceIndex = pokemon.habitat?.biomes.indexOf("ice")
		if (iceIndex >= 0) {
			console.log(`${pokemon.name} included 'ice' biome`)
			pokemon.habitat.biomes.splice(iceIndex, 1, "glacier")
		}
	}

	await fs.writeFile(POKEMON_MODDED_PATH, JSON.stringify({ items: pokemonList }, null, "\t"), { encoding: "utf-8" })
}

main()
