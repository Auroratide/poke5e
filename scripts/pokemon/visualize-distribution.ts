import path from "node:path"
import fs from "node:fs/promises"
import { getPokemonSrd } from "./files.ts"
import { superconsole } from "../superconsole.ts"

/**
 * Builds move-distribution.html, a page with one bar graph per pokemon to visualize how level-up moves are distributed
 * in the audited (v2) movesets from move-matrix-REVISED.csv.
 *
 * Each move in the pokemon's v2 moveset (ordered by v2 level) gets two overlaid bars:
 * - A wide bar for the v2 proposed level. Start moves use the pokemon's Min Level.
 *   Moves new to pokemon 5e (Poke5e Level = -1) are orange; existing moves whose level changed are green.
 * - A thin bar for the Game Level from the CSV, relative to the pokemon's highest game level in the CSV, scaled to 20.
 *
 * Two copies are written: a page fragment in the cache folder (the format claude.ai artifacts expect),
 * and a full HTML document in the static folder so it is served with the site for sharing.
 */

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const REVISED_PATH = path.join(CACHE_FOLDER, "move-matrix-REVISED.csv")
const TEMPLATE_PATH = path.join(import.meta.dirname, "move-distribution.template.html")
const FRAGMENT_PATH = path.join(CACHE_FOLDER, "move-distribution.html")
const STATIC_PATH = path.join("static", "analysis", "move-distribution.html")
const BODY_MARKER = "<!-- body -->"

// The CSV names some forms differently than the SRD
const CSV_TO_SRD_ID: Record<string, string> = {
	"basculin-red": "basculin",
	"basculin-blue": "basculin-blue-striped",
	"basculin-white": "basculin-white-striped",
}

// Plain constants rather than an enum so node can strip the types
const Status = { Kept: 0, New: 1, Moved: 2 } as const
type Status = typeof Status[keyof typeof Status]

// Compact so the embedded data stays small:
// [move, v2 level (0 = Start), game level or null, status, v1 level or null (when moved), index into REASONS or null]
type ChartMove = [string, number, number | null, Status, number | null, number | null]

type ChartPokemon = {
	id: string,
	name: string,
	number: number,
	minLevel: number,
	gameMax: number | null,
	moves: ChartMove[],
}

type RevisedRow = {
	pokemon: string,
	move: string,
	v1: number,
	game: number | null,
	v2: number,
	reason: string,
}

// Minimal RFC 4180 parser, since reasons may contain commas or quotes
function parseCsv(raw: string): string[][] {
	const rows: string[][] = []
	let row: string[] = []
	let cell = ""
	let quoted = false
	for (let i = 0; i < raw.length; i++) {
		const c = raw[i]
		if (quoted) {
			if (c === "\"" && raw[i + 1] === "\"") { cell += "\""; i++ }
			else if (c === "\"") quoted = false
			else cell += c
		} else if (c === "\"") quoted = true
		else if (c === ",") { row.push(cell); cell = "" }
		else if (c === "\n" || c === "\r") {
			if (c === "\r" && raw[i + 1] === "\n") i++
			row.push(cell); rows.push(row); row = []; cell = ""
		} else cell += c
	}
	if (cell !== "" || row.length > 0) { row.push(cell); rows.push(row) }
	return rows.filter((r) => r.some((it) => it !== ""))
}

async function getRevisedRows(): Promise<RevisedRow[]> {
	const raw = await fs.readFile(REVISED_PATH, { encoding: "utf-8" })
	const [header, ...lines] = parseCsv(raw.replace(/^\uFEFF/, ""))
	const col = (name: string) => {
		const i = header.indexOf(name)
		if (i < 0) throw new Error(`Missing column "${name}" in ${REVISED_PATH}`)
		return i
	}
	const [pokemonCol, moveCol, v1Col, gameCol, v2Col, reasonCol] = ["pokémon", "move", "Poke5e Level", "Game Level", "v2 Proposed Level", "v2_Reason"].map(col)

	return lines.map((cells) => ({
		pokemon: CSV_TO_SRD_ID[cells[pokemonCol]] ?? cells[pokemonCol],
		move: cells[moveCol],
		v1: Number(cells[v1Col]),
		game: /^\d+$/.test(cells[gameCol]) ? Number(cells[gameCol]) : null,
		v2: Number(cells[v2Col]),
		reason: cells[reasonCol]?.trim() ?? "",
	}))
}

async function main() {
	const [srd, rows] = await Promise.all([getPokemonSrd("2024"), getRevisedRows()])

	const byPokemon = new Map<string, RevisedRow[]>()
	for (const row of rows) {
		const list = byPokemon.get(row.pokemon) ?? []
		// A few moves are listed twice; the first occurrence wins
		if (!list.some((it) => it.move === row.move)) list.push(row)
		byPokemon.set(row.pokemon, list)
	}

	const reasons: string[] = []
	const reasonIndex = (reason: string): number | null => {
		if (reason === "") return null
		let i = reasons.indexOf(reason)
		if (i < 0) i = reasons.push(reason) - 1
		return i
	}

	const data: ChartPokemon[] = srd.filter((pokemon) => byPokemon.has(pokemon.id)).map((pokemon) => {
		// Stable sort keeps the CSV's order within a level
		const moves = [...byPokemon.get(pokemon.id)!].sort((a, b) => a.v2 - b.v2)
		const gameLevels = moves.map((it) => it.game).filter((it) => it != null)
		return {
			id: pokemon.id,
			name: pokemon.name,
			number: pokemon.number,
			minLevel: pokemon.minLevel,
			gameMax: gameLevels.length > 0 ? Math.max(...gameLevels) : null,
			moves: moves.map((it): ChartMove => {
				const status = it.v1 < 0 ? Status.New : it.v1 !== it.v2 ? Status.Moved : Status.Kept
				return [it.move, it.v2, it.game, status, status === Status.Moved ? it.v1 : null, reasonIndex(it.reason)]
			}),
		}
	})

	const skipped = [...byPokemon.keys()].filter((id) => !srd.some((it) => it.id === id))
	if (skipped.length > 0) superconsole.log(`Not in the SRD, so skipped: ${skipped.join(", ")}`)

	const template = await fs.readFile(TEMPLATE_PATH, { encoding: "utf-8" })
	// Escape "<" so a move name or reason can never close the script tag
	const json = (value: unknown) => JSON.stringify(value).replaceAll("<", "\\u003c")
	const page = template.replace("/*DATA*/null", json(data)).replace("/*REASONS*/null", json(reasons))
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
