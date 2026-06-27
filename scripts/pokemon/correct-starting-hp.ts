import { getPokemon, hitDiceAsInt, modifier, type Pokemon, writePokemon } from "./lib.ts"

function startingLevel1Hp(p: Pokemon) {
	return 10 + hitDiceAsInt(p.hitDice) + modifier(p.attributes.con)
}

function shouldCorrect(p: Pokemon) {
	return p.number >= 813 || p.name.includes("Galarian") || p.name.includes("Hisuian") || p.id === "rhyhorn" || p.id === "larvesta"
}

async function main() {
	const pokemon = await getPokemon()

	for (const p of pokemon) {
		if (p.minLevel === 1 && shouldCorrect(p)) {
			const originalHp = p.hp
			p.hp = startingLevel1Hp(p)

			if (originalHp !== p.hp) {
				console.log(`- ${p.name}: ${originalHp} -> ${p.hp}`)
			}
		}
	}

	await writePokemon(pokemon)
}

main()
