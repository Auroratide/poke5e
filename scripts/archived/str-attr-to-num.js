import path from "node:path"
import fs from "node:fs/promises"

async function main() {
	const pokemonPath = path.join("static", "data", "pokemon.json")
	const data = JSON.parse(await fs.readFile(pokemonPath, { encoding: "utf-8" }))

	for (const pokemon of data.items) {
		pokemon.attributes.str = parseInt(pokemon.attributes.str)
		pokemon.attributes.dex = parseInt(pokemon.attributes.dex)
		pokemon.attributes.con = parseInt(pokemon.attributes.con)
		pokemon.attributes.int = parseInt(pokemon.attributes.int)
		pokemon.attributes.wis = parseInt(pokemon.attributes.wis)
		pokemon.attributes.cha = parseInt(pokemon.attributes.cha)
	}

	await fs.writeFile(pokemonPath, JSON.stringify(data, null, "\t"), { encoding: "utf-8" })
	console.log("Done!")
}

main()
