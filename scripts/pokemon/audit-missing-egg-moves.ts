import fs from "node:fs/promises"
import path from "node:path"
import { getCachedPokemon } from "./get-cached-pokemon.ts"

const POKEMON_PATH = path.join("static", "data", "pokemon.json")
const EVOLUTION_PATH = path.join("static", "data", "evolution.json")
const POKEMON_MODDED_PATH = path.join("static", "data", "pokemon-modded.json")

async function readJsonFile(filePath: string) {
	const text = await fs.readFile(filePath, { encoding: "utf-8" })
	const cleaned = text.replace(/^\uFEFF/, '')

	// console.log(x.substring(0, 100))

	return JSON.parse(cleaned)
	// return JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
}

function listEggMoves(apiPokemon: any): string[] {
	return apiPokemon.moves.filter((move: any) => 
		move.version_group_details.some((groupDetails: any) =>
			groupDetails.move_learn_method.name === "egg"
	)).map((move: any) => {
		return move.move.name
	})
}

function isBaseForm(pokemon: any, evolutions: any[]): boolean {
	return evolutions.every((evo) => evo.to != pokemon.id)
}

function cannotBreed(pokemon: any): boolean {
	return pokemon.gender === "0:0" || pokemon.eggGroup.includes("undiscovered") || pokemon.eggGroup.includes("gender unknown")
}

async function main() {
	const pokemonList = (await readJsonFile(POKEMON_PATH)).items
	const evolutionList = (await readJsonFile(EVOLUTION_PATH)).items

	for (const pokemon of pokemonList) {
		if (pokemon.moves.egg != null) continue // ignore if already have egg moves
		if (!isBaseForm(pokemon, evolutionList)) continue
		if (cannotBreed(pokemon)) continue

		const apiPokemon = await getCachedPokemon(pokemon.id)
		if (apiPokemon == null) {
			console.log("could not find ", pokemon.id)
			continue
		}

		const eggMoves = listEggMoves(apiPokemon).sort((a, b) => a.localeCompare(b))
		if (eggMoves.length > 0) {
			console.log("Found Egg Moves for ", pokemon.name)
			pokemon.moves.egg = eggMoves
		}
	}

	await fs.writeFile(POKEMON_MODDED_PATH, JSON.stringify({ items: pokemonList }, null, "\t"), { encoding: "utf-8" })
}

main()
