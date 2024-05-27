import * as path from "path"
import * as fs from "fs/promises"

// The original pokemon.json file had the abilities along with their descriptions specified
// for each pokemon, which is redundant in many cases. This file extracts a separate
// abilities.json file from the pokemon.json.

const pokemonJsonPath = path.join("static", "data", "pokemon.json")
const abilitiesJsonPath = path.join("static", "data", "abilities.json")
const jsonToObj = (json) => JSON.parse(json)
const toUniqueAbilities = (allPokemon) => allPokemon.reduce((abilities, pokemon) => {
	pokemon.abilities.forEach(ability => {
		if (ability.name in abilities && abilities[ability.name] !== ability.description) {
			// in case two abilities have the same name but different description
			// we must manually review it
			abilities[`${ability.name} (REVIEW ${Math.random()})`] = ability.description
		} else {
			abilities[ability.name] = ability.description
		}
	})

	return abilities
}, {})

const asId = s => s.toLowerCase()
	.replace(/[\s]/g, "-")
	.replace("♀", "f")
	.replace("♂", "m")
	.replace(/[^a-z0-9\-]/g, "")
const toAbilityData = (abilities) => Object.entries(abilities).map(([name, description]) => ({
	id: asId(name),
	name,
	description,
}))

const alphabetize = (abilities) => abilities.sort((l, r) => l.name.localeCompare(r.name))

const listIntoObject = (items) => ({ items })

const toFile = (filePath) => (obj) => fs.writeFile(filePath, JSON.stringify(obj, null, 2), { encoding: "utf-8" })

fs.readFile(pokemonJsonPath, { encoding: "utf-8" })
	.then(jsonToObj)
	.then(obj => obj.items)
	.then(toUniqueAbilities)
	.then(toAbilityData)
	.then(alphabetize)
	.then(listIntoObject)
	.then(toFile(abilitiesJsonPath))
	.then(() => console.log("Finished"))
