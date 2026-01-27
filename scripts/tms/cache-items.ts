import fs from "node:fs/promises"
import path from "node:path"

const POKEAPI_PATH = path.join("scripts", "tms", ".pokeapi")

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

type PokeApiTm = {
	id: number,
	item: {
		name: string,
		url: string,
	},
	move: {
		name: string,
	},
	version_group: {
		name: string,
	},
}

type PokeApiItem = {
	cost: number
}

async function getScarletVioletTmMasterList(): Promise<PokeApiTm[]> {
	return JSON.parse(await fs.readFile(path.join(POKEAPI_PATH, "tms.json"), { encoding: "utf-8" })).tms
		.filter((it: PokeApiTm) => it.version_group.name === "scarlet-violet")
}

/**
 * TMs must be cached first
 */
async function main() {
	await fs.mkdir(POKEAPI_PATH, { recursive: true })

	const tms = await getScarletVioletTmMasterList()
	let total = tms.length
	const items: PokeApiItem[] = []

	let current = 0
	for (const tm of tms) {
		const item: PokeApiItem = await fetch(tm.item.url).then((res) => res.json())
		items.push(item)
		console.log(`${++current} / ${total}`)
		await wait(50)
	}

	await fs.writeFile(path.join(POKEAPI_PATH, "items.json"), JSON.stringify({ items }), { encoding: "utf-8" })
}

main()