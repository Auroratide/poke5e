import { getPokemonSrd, type PokemonData, writePokemonSrd, overrideInOldEdition, ensureSortedByNumber } from "./files.ts"
import { superconsole } from "../superconsole.ts"

const EXCEPTIONS = [
	"cosmog",
	"wishiwashi-school-form",
]

// Commented ones are babies whose evolved forms are NOT min-level 1
const BABY_POKEMON = [
	"pichu",
	"cleffa",
	"igglybuff",
	// "togepi",
	// "tyrogue",
	// "smoochum",
	// "elekid",
	// "magby",
	"azurill",
	// "wynaut",
	// "budew",
	// "chingling",
	// "bonsly",
	// "mime-jr",
	// "happiny",
	// "munchlax",
	// "riolu",
	// "mantyke",
	// "toxel",
]

export function modifier(score: number): number {
	return Math.floor(score / 2) - 5
}

export function hitDiceAsInt(hitDice: string): number {
	return parseInt(hitDice.slice(1))
}

function startingHp(p: PokemonData) {
	const maxDice = hitDiceAsInt(p.hitDice)
	const averageDice = Math.floor(maxDice / 2) + 1
	const mod = modifier(p.attributes.con)
	const baseHp = BABY_POKEMON.includes(p.id) ? 6 : 10
	return baseHp + maxDice + mod + (p.minLevel - 1) * (averageDice + mod)
}

async function main() {
	const pokemon2018 = await getPokemonSrd("2018")
	const pokemon2024 = await getPokemonSrd("2024")

	for (const p of pokemon2024) {
		if (p.minLevel > 1) continue
		if (EXCEPTIONS.includes(p.id)) continue

		const correctStartingHp = startingHp(p)
		if (correctStartingHp !== p.hp) {
			superconsole.log(`${p.name}: ${p.hp} -> ${correctStartingHp}`)

			overrideInOldEdition(pokemon2018, {
				id: p.id,
				hp: p.hp,
			})

			p.hp = correctStartingHp
		}
	}

	const sorted2018 = ensureSortedByNumber(pokemon2018, pokemon2024)

	await writePokemonSrd(sorted2018, "2018")
	await writePokemonSrd(pokemon2024, "2024")
}

main()