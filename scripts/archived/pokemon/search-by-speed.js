import fs from "node:fs/promises"
import path from "node:path"

async function main() {
	const pokemon = JSON.parse(await fs.readFile(path.join("static", "data", "pokemon.json"), { encoding: "utf-8" })).items

	const fliers = pokemon.filter((it) => {
		return it.speed.some((speed) => (speed.type === "flying" || speed.type === "hover") && speed.value >= 50) && it.sr < 15
	})

	fliers.forEach((it) => {
		console.log(`${it.name} (${it.speed.map((spd) => `${spd.value} ${spd.type}`).join(", ")})`)
	})
}

main()
