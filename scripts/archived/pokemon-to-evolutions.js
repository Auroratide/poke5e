import * as path from "node:path"
import * as fs from "node:fs/promises"

const pokemonJsonPath = path.join("static", "data", "pokemon.json")
const pokemonJsonPathV2 = path.join("static", "data", "pokemon-v2.json")
const evolutionJsonPath = path.join("static", "data", "evolution.json")
const jsonToObj = (json) => JSON.parse(json)

const asId = s => s.toLowerCase()
	.replace(/[\s]/g, "-")
	.replace("♀", "f")
	.replace("♂", "m")
	.replace(/[^a-z0-9\-]/g, "")

const bifurcatePokemonAndEvolutions = (allPokemon) => {
	const evolutions = []

	for (const pokemon of allPokemon) {
		if (pokemon.evolution != null && pokemon.evolution.to != null) {
			for (const to of pokemon.evolution.to) {
				evolutions.push({
					from: pokemon.id,
					to: to.id,
					conditions: to.conditions,
					effects: to.effects,
				})
			}
		}

		delete pokemon.evolution
	}

	return {
		pokemon: allPokemon,
		evolutions: evolutions,
	}
}

const toFiles = (pokemonFilePath, evolutionFilePath) => (obj) => Promise.all([
	fs.writeFile(pokemonFilePath, JSON.stringify({ items: obj.pokemon }, null, "\t"), { encoding: "utf-8" }),
	fs.writeFile(evolutionFilePath, JSON.stringify({ items: obj.evolutions }, null, "\t"), { encoding: "utf-8" }),
])

fs.readFile(pokemonJsonPath, { encoding: "utf-8" })
	.then(jsonToObj)
	.then(obj => obj.items)
	.then(bifurcatePokemonAndEvolutions)
	.then(toFiles(pokemonJsonPathV2, evolutionJsonPath))
	.then(() => console.log("Finished"))
