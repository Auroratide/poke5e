import fs from "node:fs/promises"
import path from "node:path"

const MAX_OLD_TM = 101

const CSV_PATH = path.join("scripts", "tms", "out", "statistics.csv")
const MOVES_PATH = path.join("static", "data", "moves.json")
const POKEMON_PATH = path.join("static", "data", "pokemon.json")

type PokeType = "normal" | "fighting" | "flying" | "poison" | "ground" | "rock" | "bug" | "ghost" | "steel" | "fire" | "water" | "grass" | "electric" | "psychic" | "ice" | "dragon" | "dark" | "fairy"

type Tm = {
	id: string,
	tm: {
		id: number,
		cost: number,
	},
}

type Pokemon = {
	id: string,
	type: PokeType[],
	minLevel: number,
	sr: number,
	moves: {
		tm: number[],
	},
}

async function getPokemonWithNewTms(): Promise<Pokemon[]> {
	const tmToNumber = new Map<string, number>()
	return JSON.parse(await fs.readFile(POKEMON_PATH, { encoding: "utf-8" })).items
		.filter((it: Pokemon) => it.moves.tm.some((move) => move > MAX_OLD_TM))
}

async function getNewTms(): Promise<Tm[]> {
	return JSON.parse(await fs.readFile(MOVES_PATH, { encoding: "utf-8" })).moves
		.filter((it: Tm) => it.tm != null)
		.filter((it: Tm) => it.tm.id > MAX_OLD_TM)
		.toSorted((a: Tm, b: Tm) => a.tm.id - b.tm.id)
}

type TmStatistics = {
	id: number,
	percentageTotal: number,
	percentageByType: {
		normal: number,
		fighting: number,
		flying: number,
		poison: number,
		ground: number,
		rock: number,
		bug: number,
		ghost: number,
		steel: number,
		fire: number,
		water: number,
		grass: number,
		electric: number,
		psychic: number,
		ice: number,
		dragon: number,
		dark: number,
		fairy: number,
	},
	averageLevel: number,
	averageSr: number,
	minLevel: number,
	minSr: number
}

function statisticsToTable(statistics: TmStatistics[]): string[][] {
	const header = ["tm", "total", "normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy", "avgLevel", "avgSr", "minLevel", "minSr"]

	const rows = statistics.map((it) => [
		it.id.toString(),
		it.percentageTotal.toString(),
		it.percentageByType.normal.toString(),
		it.percentageByType.fighting.toString(),
		it.percentageByType.flying.toString(),
		it.percentageByType.poison.toString(),
		it.percentageByType.ground.toString(),
		it.percentageByType.rock.toString(),
		it.percentageByType.bug.toString(),
		it.percentageByType.ghost.toString(),
		it.percentageByType.steel.toString(),
		it.percentageByType.fire.toString(),
		it.percentageByType.water.toString(),
		it.percentageByType.grass.toString(),
		it.percentageByType.electric.toString(),
		it.percentageByType.psychic.toString(),
		it.percentageByType.ice.toString(),
		it.percentageByType.dragon.toString(),
		it.percentageByType.dark.toString(),
		it.percentageByType.fairy.toString(),
		it.averageLevel.toString(),
		it.averageSr.toString(),
		it.minLevel.toString(),
		it.minSr.toString(),
	])

	return [header, ...rows]
}

async function writeCsv(table: string[][]) {
	const asString = table.map((row) => row.join(",")).join("\n")
	await fs.writeFile(CSV_PATH, asString, { encoding: "utf-8" })
}

function asPercentage(n: number): number {
	return Math.round(n * 1000) / 10
}

function getTotalsByType(pokemon: Pokemon[]): Map<PokeType, number> {
	const totals = new Map<PokeType, number>()
	const types: PokeType[] = ["normal", "fighting", "flying", "poison", "ground", "rock", "bug", "ghost", "steel", "fire", "water", "grass", "electric", "psychic", "ice", "dragon", "dark", "fairy"]
	types.forEach((type) => {
		totals.set(type, pokemon.filter((it) => it.type.includes(type)).length)
	})

	return totals
}

async function main() {
	const tms = await getNewTms()
	const pokemon = await getPokemonWithNewTms()
	const totalsByType = getTotalsByType(pokemon)

	const statistics: TmStatistics[] = []

	let done = 0
	for (const tm of tms) {
		console.log(`${++done} / ${tms.length}`)
		let count = 0
		const countByType = {
			normal: 0,
			fighting: 0,
			flying: 0,
			poison: 0,
			ground: 0,
			rock: 0,
			bug: 0,
			ghost: 0,
			steel: 0,
			fire: 0,
			water: 0,
			grass: 0,
			electric: 0,
			psychic: 0,
			ice: 0,
			dragon: 0,
			dark: 0,
			fairy: 0,
		}

		let totalLevel = 0
		let totalSr = 0
		let minLevel = 999
		let minSr = 999

		for (const p of pokemon) {
			if (p.moves.tm.includes(tm.tm.id)) {
				++count
				++countByType[p.type[0]]
				if (p.type[1]) ++countByType[p.type[1]]
				totalLevel += p.minLevel
				totalSr += p.sr
				minLevel = p.minLevel < minLevel ? p.minLevel : minLevel
				minSr = p.sr < minSr ? p.sr : minSr
			}
		}

		statistics.push({
			id: tm.tm.id,
			percentageTotal: asPercentage(count / pokemon.length),
			percentageByType: {
				normal: asPercentage(countByType.normal / totalsByType.get("normal")!),
				fighting: asPercentage(countByType.fighting / totalsByType.get("fighting")!),
				flying: asPercentage(countByType.flying / totalsByType.get("flying")!),
				poison: asPercentage(countByType.poison / totalsByType.get("poison")!),
				ground: asPercentage(countByType.ground / totalsByType.get("ground")!),
				rock: asPercentage(countByType.rock / totalsByType.get("rock")!),
				bug: asPercentage(countByType.bug / totalsByType.get("bug")!),
				ghost: asPercentage(countByType.ghost / totalsByType.get("ghost")!),
				steel: asPercentage(countByType.steel / totalsByType.get("steel")!),
				fire: asPercentage(countByType.fire / totalsByType.get("fire")!),
				water: asPercentage(countByType.water / totalsByType.get("water")!),
				grass: asPercentage(countByType.grass / totalsByType.get("grass")!),
				electric: asPercentage(countByType.electric / totalsByType.get("electric")!),
				psychic: asPercentage(countByType.psychic / totalsByType.get("psychic")!),
				ice: asPercentage(countByType.ice / totalsByType.get("ice")!),
				dragon: asPercentage(countByType.dragon / totalsByType.get("dragon")!),
				dark: asPercentage(countByType.dark / totalsByType.get("dark")!),
				fairy: asPercentage(countByType.fairy / totalsByType.get("fairy")!),
			},
			averageLevel: totalLevel / count,
			averageSr: totalSr / count,
			minLevel,
			minSr,
		})
	}

	await writeCsv(statisticsToTable(statistics))
}

main()