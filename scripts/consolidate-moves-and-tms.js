import path from "node:path"
import fs from "node:fs/promises"

async function main() {
	const moves = JSON.parse(await fs.readFile(path.join("static", "data", "moves.json"), { encoding: "utf-8" })).moves
	const tms = JSON.parse(await fs.readFile(path.join("static", "data", "tms.json"), { encoding: "utf-8" })).tms

	for (const tm of tms) {
		const move = moves.find((it) => it.id === tm.move)

		move.tm = {
			id: tm.id,
			cost: tm.cost,
		}
	}

	await fs.writeFile(path.join("static", "data", "moves-2.json"), JSON.stringify({ moves }, null, "\t"), { encoding: "utf-8" })

	console.log("done")
}

main()