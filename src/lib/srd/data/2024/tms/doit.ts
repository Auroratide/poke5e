import fs from "node:fs/promises"
import path from "node:path"

async function main() {
	const moves = JSON.parse((await fs.readFile(path.join("src", "lib", "srd", "data", "2024", "moves", "en.json"), { encoding: "utf-8" }))).values

	const tms = moves
		.filter((it) => it.tm != null)
		.map((it) => ({
			id: it.tm.id,
			cost: it.tm.cost,
			move: it.id,
		}))
		.sort((a, b) => a.id - b.id)
	
	const movesNoTm = moves.map((it) => {
		delete it.tm
		return it
	})

	await fs.writeFile(path.join("src", "lib", "srd", "data", "2024", "tms", "en.json"), JSON.stringify({ values: tms }, null, "\t"), { encoding: "utf-8" })
	await fs.writeFile(path.join("src", "lib", "srd", "data", "2024", "moves", "en.json"), JSON.stringify({ values: movesNoTm }, null, "\t"), { encoding: "utf-8" })
}

main()

