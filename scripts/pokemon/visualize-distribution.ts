import path from "node:path"
import fs from "node:fs/promises"
import { getPokemonSrd, getPokemonOverrides, type PokemonData } from "./files.ts"
import { chooseEditionData, type EditionOverride, type HasId } from "../../src/lib/srd/editions.ts"
import { superconsole } from "../superconsole.ts"

/**
 * Builds move-distribution.html, a page with one bar graph per pokemon to visualize how level-up moves are distributed.
 *
 * Each move in the pokemon's 2024 statblock (in order) gets two overlaid bars:
 * - A wide bar for the level the move is learned in pokemon 5e. Start moves use the pokemon's Min Level.
 *   Moves new to 2024 (not in the 2018 edition) are colored differently.
 * - A thin bar for the level the move is learned in its most recent game (from move-matrix.csv),
 *   relative to the highest level the pokemon learns any move in its games, scaled to 20.
 *
 * Run build-movesets.ts first so move-matrix.csv is up to date.
 *
 * Two copies are written: a page fragment in the cache folder (the format claude.ai artifacts expect),
 * and a full HTML document in the static folder so it is served with the site for sharing.
 */

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const MATRIX_PATH = path.join(CACHE_FOLDER, "move-matrix.csv")
const TEMPLATE_PATH = path.join(import.meta.dirname, "move-distribution.template.html")
const FRAGMENT_PATH = path.join(CACHE_FOLDER, "move-distribution.html")
const STATIC_PATH = path.join("static", "analysis", "move-distribution.html")
const BODY_MARKER = "<!-- body -->"

const LEVELS: [keyof PokemonData["moves"], number][] = [
	["start", 0],
	["level2", 2],
	["level6", 6],
	["level10", 10],
	["level14", 14],
	["level18", 18],
]

type GameLearn = { game: string, level: number }

// Compact so the embedded data stays small: [move, p5e level (0 = Start), game level or null, game or null, is new]
type ChartMove = [string, number, number | null, string | null, boolean]

type ChartPokemon = {
	id: string,
	name: string,
	number: number,
	minLevel: number,
	gameMax: number | null,
	moves: ChartMove[],
}

// key is `${pokemon}:${move}`; only level-up rows from the games
async function getGameLevels(): Promise<Map<string, GameLearn>> {
	const raw = await fs.readFile(MATRIX_PATH, { encoding: "utf-8" })
	const [header, ...lines] = raw.trim().split("\n")
	const columns = header.split(",")
	const [pokemonCol, moveCol, gameCol, levelCol] = ["pokemon id", "move id", "most recent game", "most recent level learned"].map((name) => columns.indexOf(name))

	const result = new Map<string, GameLearn>()
	for (const line of lines) {
		const cells = line.split(",")
		if (!/^\d+$/.test(cells[levelCol])) continue
		result.set(`${cells[pokemonCol]}:${cells[moveCol]}`, { game: cells[gameCol], level: Number(cells[levelCol]) })
	}

	return result
}

function levelupMoves(pokemon: PokemonData): [string, number][] {
	return LEVELS.flatMap(([key, level]) => ((pokemon.moves[key] ?? []) as string[]).map((move): [string, number] => [move, level]))
}

async function main() {
	const [current, overrides, gameLevels] = await Promise.all([
		getPokemonSrd("2024"),
		getPokemonOverrides("2018") as Promise<(EditionOverride<PokemonData> & HasId)[]>,
		getGameLevels(),
	])
	const original = new Map(chooseEditionData<PokemonData>("2018", current, { "2018": overrides }).map((pokemon) => [pokemon.id, new Set(levelupMoves(pokemon).map(([move]) => move))]))

	// The highest level the pokemon learns anything at in its games, including moves pokemon 5e does not use
	const gameMax = new Map<string, number>()
	for (const [k, { level }] of gameLevels) {
		const pokemon = k.split(":")[0]
		gameMax.set(pokemon, Math.max(gameMax.get(pokemon) ?? 0, level))
	}

	const data: ChartPokemon[] = current.map((pokemon) => ({
		id: pokemon.id,
		name: pokemon.name,
		number: pokemon.number,
		minLevel: (pokemon as PokemonData & { minLevel: number }).minLevel,
		gameMax: gameMax.get(pokemon.id) ?? null,
		moves: levelupMoves(pokemon).map(([move, level]): ChartMove => {
			const game = gameLevels.get(`${pokemon.id}:${move}`)
			return [move, level, game?.level ?? null, game?.game ?? null, !original.get(pokemon.id)!.has(move)]
		}),
	}))

	const template = await fs.readFile(TEMPLATE_PATH, { encoding: "utf-8" })
	// Escape "<" so a move name can never close the script tag
	const json = JSON.stringify(data).replaceAll("<", "\\u003c")
	const page = template.replace("/*DATA*/null", json)
	const [head, body] = page.split(BODY_MARKER)
	const document = `<!doctype html>\n<html lang="en">\n<head>\n${head.trim()}\n</head>\n<body>\n${body.trim()}\n</body>\n</html>\n`

	await fs.mkdir(path.dirname(STATIC_PATH), { recursive: true })
	await Promise.all([
		fs.writeFile(FRAGMENT_PATH, page.replace(BODY_MARKER, ""), { encoding: "utf-8" }),
		fs.writeFile(STATIC_PATH, document, { encoding: "utf-8" }),
	])

	superconsole.success(`Wrote move distribution for ${data.length} pokemon to ${FRAGMENT_PATH} and ${STATIC_PATH}`)
}

main()
