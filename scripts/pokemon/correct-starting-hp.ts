import { getPokemon, hitDiceAsInt, modifier, type Pokemon, writePokemon } from "./lib.ts"

function startingHp(p: Pokemon) {
	const maxDice = hitDiceAsInt(p.hitDice)
	const averageDice = Math.floor(maxDice / 2) + 1
	const mod = modifier(p.attributes.con)
	return 10 + maxDice + mod + (p.minLevel - 1) * (averageDice + mod)
}

function shouldCorrect(p: Pokemon) {
	const exceptions = ["Regieleki", "Regidrago", "Enamorus (Incarnate)", "Enamorus (Therian)"]

	return p.sr < 15 && (p.number >= 810 || p.name.includes("Galarian") || p.name.includes("Hisuian") || p.id === "rhyhorn" || p.id === "larvesta") && !exceptions.includes(p.name)
}

function percentDifference(v1: number, v2: number): number {
	return Math.round(Math.abs(v1 - v2) / ((v1 + v2) / 2) * 100)
}

async function main() {
	const pokemon = await getPokemon()

	for (const p of pokemon) {
		if (shouldCorrect(p)) {
			const originalHp = p.hp
			p.hp = startingHp(p)

			if (originalHp !== p.hp) {
				console.log(`- ${p.name}: ${originalHp} -> ${p.hp} (${percentDifference(originalHp, p.hp)}%)`)
			}
		}
	}

	await writePokemon(pokemon)
}

main()
