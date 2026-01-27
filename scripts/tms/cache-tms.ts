import fs from "node:fs/promises"
import path from "node:path"

const POKEAPI_PATH = path.join("scripts", "tms", ".pokeapi")

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

type PokeApiTmListItem = {
	url: string,
}

type PokeApiTm = {
	id: number,
	item: {
		name: string,
	},
	move: {
		name: string,
	},
	version_group: {
		name: string,
	},
}

async function main() {
	await fs.mkdir(POKEAPI_PATH, { recursive: true })

	const listOfTms: PokeApiTmListItem[] = await fetch("https://pokeapi.co/api/v2/machine?limit=5000")
		.then((res) => res.json())
		.then((json) => json.results)
	
	const tms: PokeApiTm[] = []

	for (const apiTm of listOfTms) {
		const tm: PokeApiTm = await fetch(apiTm.url).then((res) => res.json())
		tms.push(tm)
		console.log("Added", tm.move.name)
		await wait(50)
	}

	await fs.writeFile(path.join(POKEAPI_PATH, "tms.json"), JSON.stringify({ tms }), { encoding: "utf-8" })
}

main()