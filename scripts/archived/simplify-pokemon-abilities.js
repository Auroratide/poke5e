import * as path from "path"
import * as fs from "fs/promises"

const pokemonJsonPath = path.join("static", "data", "pokemon.json")
const pokemonJsonPath2 = path.join("static", "data", "pokemon-2.json")
const jsonToObj = (json) => JSON.parse(json)

const asId = s => s.toLowerCase()
	.replace(/[\s]/g, "-")
	.replace("♀", "f")
	.replace("♂", "m")
	.replace(/[^a-z0-9\-]/g, "")
const referenceAbilities = (allPokemon) => allPokemon.map(pokemon => ({
	...pokemon,
	abilities: pokemon.abilities.map(ability => ({
		id: asId(ability.name),
		hidden: ability.hidden,
	})),
}))

const listIntoObject = (items) => ({ items })

const toFile = (filePath) => (obj) => fs.writeFile(filePath, JSON.stringify(obj, null, 2), { encoding: "utf-8" })

fs.readFile(pokemonJsonPath, { encoding: "utf-8" })
	.then(jsonToObj)
	.then(obj => obj.items)
	.then(referenceAbilities)
	.then(listIntoObject)
	.then(toFile(pokemonJsonPath2))
	.then(() => console.log("Finished"))
