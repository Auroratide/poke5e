import fs from "node:fs/promises"
import path from "node:path"
import * as CSV from "csv-parse/sync"

const POKEMON_PATH = path.join("static", "data", "pokemon.json")
const MOVES_PATH = path.join("static", "data", "moves.json")
const REPORT_PATH = path.join("scripts", "tms", "out", "tm-report.json")
const REPORT_TEXT_PATH = path.join("scripts", "tms", "out", "tm-report.txt")
const CSV_PATH = path.join("scripts", "tms", "out", "statistics.csv")

async function readJsonFile(filePath: string) {
	return JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
}

async function readCsvFile(filePath: string) {
	return CSV.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
}

async function writeJsonFile(filePath: string, json: object) {
	return await fs.writeFile(filePath, JSON.stringify(json, null, "\t"), { encoding: "utf-8" })
}

type TmStatistics = {
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
	averageLevel: number,
	averageSr: number,
	minLevel: number,
	minSr: number,
}

async function getTmStatistics(): Promise<Map<number, TmStatistics>> {
	const [_, ...rows] = await readCsvFile(CSV_PATH)
	const statistics = new Map<number, TmStatistics>()

	for (const row of rows) {
		statistics.set(parseInt(row[0]), {
			normal: parseFloat(row[2]),
			fighting: parseFloat(row[3]),
			flying: parseFloat(row[4]),
			poison: parseFloat(row[5]),
			ground: parseFloat(row[6]),
			rock: parseFloat(row[7]),
			bug: parseFloat(row[8]),
			ghost: parseFloat(row[9]),
			steel: parseFloat(row[10]),
			fire: parseFloat(row[11]),
			water: parseFloat(row[12]),
			grass: parseFloat(row[13]),
			electric: parseFloat(row[14]),
			psychic: parseFloat(row[15]),
			ice: parseFloat(row[16]),
			dragon: parseFloat(row[17]),
			dark: parseFloat(row[18]),
			fairy: parseFloat(row[19]),
			averageLevel: parseFloat(row[20]),
			averageSr: parseFloat(row[21]),
			minLevel: parseFloat(row[22]),
			minSr: parseFloat(row[23]),
		})
	}

	return statistics
}

type PokeType = "normal" | "fighting" | "flying" | "poison" | "ground" | "rock" | "bug" | "ghost" | "steel" | "fire" | "water" | "grass" | "electric" | "psychic" | "ice" | "dragon" | "dark" | "fairy"

type Pokemon = {
	id: string,
	name: string,
	type: PokeType[],
	minLevel: number,
	sr: number,
	moves: {
		tm: number[],
	},
}

const LAST_OG_TM = 101

async function getPokemonNeedingTms(): Promise<Pokemon[]> {
	const pokemon: Pokemon[] = (await readJsonFile(POKEMON_PATH)).items

	return pokemon.filter((it) => Math.max(...it.moves.tm) <= LAST_OG_TM)
}

type Move = {
	id: string
	name: string,
	type: string,
	tm: {
		id: number,
	},
}

async function getTmInfo(): Promise<Map<number, Move>> {
	const allMoves = (await readJsonFile(MOVES_PATH)).moves
	const tms = new Map<number, Move>()

	for (const move of allMoves) {
		if (move.tm != null) {
			tms.set(move.tm.id, move)
		}
	}

	return tms
}

function probabilityForType(type: PokeType[], statistics: TmStatistics): number {
	return Math.max(...type.map((t) => statistics[t]))
}

function getNumberOfDesiredTms(p: Pokemon, newTmCount: number): number {
	// This drastically overcounts TMs without dividing by 2
	return Math.ceil(Math.floor(p.moves.tm.length / LAST_OG_TM * newTmCount) / 2)
}

function passedRoll(probability: number): boolean {
	return Math.random() <= probability / 100
}

async function saveTextTmReport(report: { pokemon: string, tmsAdded: number[] }[], allPokemon: Pokemon[]) {
	const allTms = await getTmInfo()

	let text = ""
	for (const currentPokemon of report) {
		const pokemon = allPokemon.find((it) => it.id === currentPokemon.pokemon)!
		text += `${pokemon.name} (${pokemon.type.join("/")})\n===============================================================\n`

		text += currentPokemon.tmsAdded.map((tm) => {
			const tmInfo = allTms.get(tm)
			return `${tm} - ${tmInfo?.name} (${tmInfo?.type})`
		}).join("\n")

		text += "\n\n"
	}

	await fs.writeFile(REPORT_TEXT_PATH, text, { encoding: "utf-8" })
}

async function main() {
	const statistics = await getTmStatistics()
	const tms = Array.from(statistics.entries())
	const pokemon = await getPokemonNeedingTms()

	const report: {
		pokemon: string,
		tmsAdded: number[],
	}[] = []

	for (const p of pokemon) {
		const sortedByProbability = tms.toSorted((a, b) => probabilityForType(p.type, b[1]) - probabilityForType(p.type, a[1]))
		const numberOfDesiredTms = getNumberOfDesiredTms(p, sortedByProbability.length)

		let tmsAdded: number[] = []
		let i = 0
		while (tmsAdded.length < numberOfDesiredTms && i < sortedByProbability.length) {
			const [currentTm, statistics] = sortedByProbability[i]

			if (p.minLevel >= statistics.minLevel && p.sr >= statistics.minSr && passedRoll(probabilityForType(p.type, statistics))) {
				tmsAdded.push(currentTm)
			}

			i += 1
		}
		
		report.push({
			pokemon: p.id,
			tmsAdded: tmsAdded.toSorted((a, b) => a - b),
		})
	}

	await writeJsonFile(REPORT_PATH, report)
	await saveTextTmReport(report, pokemon)
}

main()