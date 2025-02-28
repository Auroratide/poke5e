import path from "node:path"
import fs from "node:fs/promises"

async function main() {
	const pokemonPath = path.join("static", "data", "pokemon.json")
	const pokemonRawData = await fs.readFile(pokemonPath, { encoding: "utf-8" })
	const pokemonJson = JSON.parse(pokemonRawData)

	await Promise.all(pokemonJson.items.map(async (pokemon) => {
		if (!isOfficial(pokemon)) return
		
		await addShinyPath(pokemon, "main")
		await addShinyPath(pokemon, "sprite")
	}))

	await fs.writeFile(pokemonPath, JSON.stringify(pokemonJson, null, "\t"), { encoding: "utf-8" })
}

const isOfficial = (pokemon) => pokemon.number > 0
const verifyExistence = (path) => fetch(path).then((res) => {
	return res.ok
})

const makePathShiny = (path) => path
	.split("/")
	.toSpliced(-1, 0, "shiny")
	.join("/")

const addShinyPath = async (pokemon, name) => {
	const original = pokemon.media[name]
	if (original) {
		const shinyPath = makePathShiny(original)
		if (await verifyExistence(shinyPath)) {
			pokemon.media[`${name}Shiny`] = shinyPath
		} else {
			console.warn(`Missing ${name} sprite for ${pokemon.id}`)
		}
	}
}

main()
