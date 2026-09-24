import path from "node:path"
import fs from "node:fs/promises"
import { getPokemonSrd, type PokemonData } from "./files.ts"
import { PokemonApi } from "../pokemon-api/index.ts"
import { superconsole } from "../superconsole.ts"

// Move Matrix CSV Columns; example values:
// pokemon id,move id,game first learned,level learned,most recent game,most recent level learned,in p5e,p5e level
// bulbasaur,vine-whip,red,1,scarlet,1,yes,1
// bulbasaur,vine-whip,red,tm,scarlet,tm,yes,tm
// bulbasaur,vine-whip,red,egg,scarlet,egg,yes,egg

// Move Stats CSV Columns
// pokemon id,game levelup moves,game egg moves,game tms,p5e levelup moves, p5e egg moves,p5e tms
// bulbasaur,20,8,50,18,7,44

/**
 * The goal of this script is to build a comprehensive CSV representing all of the
 * moves pokemon can theoretically learn. This will be a comparison of moves pokemon
 * currently learn in pokemon 5e vs moves they can theoretically learn in the game.
 *
 * This script should generate two things:
 * - move-matrix.csv, a CSV of the format at the top of this file showing moves pokemon have learned in the games, and whether they also learn them in pokemon 5e
 * - move-stats.csv, a matrix showing the number of each category of move the pokemon learns in the games vs how many they learn in pokemon 5e
 *
 * Put the files in the cache folder.
 *
 * Notes on how the data is interpreted:
 * - Only the level-up, egg, and machine (TM) learn methods count; tutor and other methods are ignored.
 * - "game first learned" is the earliest version group that teaches the move by that method, and "level learned" is the level in that game.
 * - "most recent game" is the latest version group that teaches the move by that method, and "most recent level learned" is the level in that game.
 * - For level-up moves, a level of 0 means the move is learned on evolution.
 * - A row is "in p5e" only if pokemon 5e teaches the move by the same method.
 * - Moves pokemon 5e teaches that the games do not (by that method) get rows with blank game columns.
 */

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const TMS_PATH = (edition: string) => path.join("src", "lib", "srd", "data", edition, "tms", "en.json")

type Category = "levelup" | "egg" | "tm"
const CATEGORIES: Category[] = ["levelup", "egg", "tm"]

const API_METHODS: Record<string, Category> = {
	"level-up": "levelup",
	"egg": "egg",
	"machine": "tm",
}

const P5E_LEVELS: [keyof PokemonData["moves"], number][] = [
	["start", 1],
	["level2", 2],
	["level6", 6],
	["level10", 10],
	["level14", 14],
	["level18", 18],
]

type ApiPokemon = {
	moves: {
		move: { name: string },
		version_group_details: {
			level_learned_at: number,
			move_learn_method: { name: string },
			version_group: { name: string },
		}[],
	}[],
}

type GameLearn = {
	firstGame: string,
	firstOrder: number,
	firstLevel: string,
	latestGame: string,
	latestOrder: number,
	latestLevel: string,
}

type P5eLearn = {
	level: string,
}

// key is `${category}:${move}`
type Learnset<T> = Map<string, T>

const key = (category: Category, move: string) => `${category}:${move}`
const splitKey = (k: string) => k.split(":") as [Category, string]

async function getTmMoves(): Promise<Map<number, string>> {
	const raw = await fs.readFile(TMS_PATH("2024"), { encoding: "utf-8" })
	const tms: { id: number, move: string }[] = JSON.parse(raw).values

	return new Map(tms.map((tm) => [tm.id, tm.move]))
}

const versionGroupOrders = new Map<string, number>()
async function getVersionGroupOrder(name: string): Promise<number> {
	if (!versionGroupOrders.has(name)) {
		const versionGroup = await PokemonApi.getOneVersionGroup(name)
		if (versionGroup == null) throw new Error(`Unknown version group: ${name}`)
		versionGroupOrders.set(name, versionGroup.order)
	}

	return versionGroupOrders.get(name)!
}

async function getGameLearnset(apiPokemon: ApiPokemon): Promise<Learnset<GameLearn>> {
	const learnset: Learnset<GameLearn> = new Map()

	for (const { move, version_group_details } of apiPokemon.moves) {
		for (const detail of version_group_details) {
			const category = API_METHODS[detail.move_learn_method.name]
			if (category == null) continue

			const game = detail.version_group.name
			const order = await getVersionGroupOrder(game)
			const level = category === "levelup" ? detail.level_learned_at.toString() : category

			const k = key(category, move.name)
			const existing = learnset.get(k)
			if (existing == null) {
				learnset.set(k, {
					firstGame: game,
					firstOrder: order,
					firstLevel: level,
					latestGame: game,
					latestOrder: order,
					latestLevel: level,
				})
				continue
			}

			if (order < existing.firstOrder) {
				existing.firstGame = game
				existing.firstOrder = order
				existing.firstLevel = level
			}

			if (order > existing.latestOrder) {
				existing.latestGame = game
				existing.latestOrder = order
				existing.latestLevel = level
			}
		}
	}

	return learnset
}

function getP5eLearnset(pokemon: PokemonData, tmMoves: Map<number, string>): Learnset<P5eLearn> {
	const learnset: Learnset<P5eLearn> = new Map()

	// P5E_LEVELS is ascending, so a move listed at multiple levels keeps its lowest
	for (const [field, level] of P5E_LEVELS) {
		for (const move of (pokemon.moves[field] ?? []) as string[]) {
			const k = key("levelup", move)
			if (!learnset.has(k)) learnset.set(k, { level: level.toString() })
		}
	}

	for (const move of pokemon.moves.egg ?? []) {
		learnset.set(key("egg", move), { level: "egg" })
	}

	for (const tm of pokemon.moves.tm ?? []) {
		const move = tmMoves.get(tm)
		if (move == null) {
			superconsole.failure(`${pokemon.id}: unknown TM ${tm}`)
			continue
		}

		learnset.set(key("tm", move), { level: "tm" })
	}

	return learnset
}

function countByCategory(learnset: Learnset<unknown>): Record<Category, number> {
	const counts: Record<Category, number> = { levelup: 0, egg: 0, tm: 0 }
	for (const k of learnset.keys()) {
		counts[splitKey(k)[0]]++
	}

	return counts
}

async function main() {
	const pokemon = await getPokemonSrd()
	const tmMoves = await getTmMoves()

	const matrix: string[][] = [["pokemon id", "move id", "game first learned", "level learned", "most recent game", "most recent level learned", "in p5e", "p5e level"]]
	const stats: string[][] = [["pokemon id", "game levelup moves", "game egg moves", "game tms", "p5e levelup moves", "p5e egg moves", "p5e tms"]]
	const missing: string[] = []

	for (const p of pokemon) {
		const apiPokemon: ApiPokemon | undefined = await PokemonApi.getOnePokemon(p.id)
		if (apiPokemon == null) missing.push(p.id)

		const game = apiPokemon != null ? await getGameLearnset(apiPokemon) : new Map<string, GameLearn>()
		const p5e = getP5eLearnset(p, tmMoves)

		const keys = [...new Set([...game.keys(), ...p5e.keys()])].sort((a, b) => {
			const [categoryA, moveA] = splitKey(a)
			const [categoryB, moveB] = splitKey(b)
			return moveA.localeCompare(moveB) || CATEGORIES.indexOf(categoryA) - CATEGORIES.indexOf(categoryB)
		})

		for (const k of keys) {
			const move = splitKey(k)[1]
			const gameLearn = game.get(k)
			const p5eLearn = p5e.get(k)

			matrix.push([
				p.id,
				move,
				gameLearn?.firstGame ?? "",
				gameLearn?.firstLevel ?? "",
				gameLearn?.latestGame ?? "",
				gameLearn?.latestLevel ?? "",
				p5eLearn != null ? "yes" : "no",
				p5eLearn?.level ?? "",
			])
		}

		const gameCounts = countByCategory(game)
		const p5eCounts = countByCategory(p5e)
		const gameColumns = apiPokemon != null
			? CATEGORIES.map((c) => gameCounts[c].toString())
			: CATEGORIES.map(() => "")

		stats.push([
			p.id,
			...gameColumns,
			...CATEGORIES.map((c) => p5eCounts[c].toString()),
		])
	}

	const toCsv = (rows: string[][]) => rows.map((row) => row.join(",")).join("\n") + "\n"

	await fs.mkdir(CACHE_FOLDER, { recursive: true })
	await fs.writeFile(path.join(CACHE_FOLDER, "move-matrix.csv"), toCsv(matrix), { encoding: "utf-8" })
	await fs.writeFile(path.join(CACHE_FOLDER, "move-stats.csv"), toCsv(stats), { encoding: "utf-8" })

	if (missing.length > 0) {
		superconsole.failure(`No game data found for ${missing.length} pokemon: ${missing.join(", ")}`)
	}

	superconsole.success(`Wrote ${matrix.length - 1} moves for ${pokemon.length} pokemon to ${CACHE_FOLDER}`)
}

main()
