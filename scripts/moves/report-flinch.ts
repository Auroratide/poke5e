import path from "node:path"
import fs from "node:fs/promises"
import { getMoveSrd, type MoveSrdData } from "./files.ts"
import { getShowdownId } from "./showdown.ts"
import { superconsole } from "../superconsole.ts"

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const SHOWDOWN_FILE = path.join(CACHE_FOLDER, "showdown-moves.json")
const REPORT_FILE = path.join(CACHE_FOLDER, "flinch.md")

type Secondary = { chance?: number, volatileStatus?: string }

type ShowdownMove = {
	name: string,
	isNonstandard?: string | null,
	secondary?: Secondary | null,
	secondaries?: Secondary[] | null,
}

/** How a move causes flinch. chance is a percentage, or undefined when it depends on a saving throw. */
type Flinch = { chance?: number, how: string }

type Row = {
	name: string,
	mainline?: Flinch,
	p5e?: Flinch,
	inP5e: boolean,
}

const getShowdownMoves = async (): Promise<Record<string, ShowdownMove>> => {
	try {
		return JSON.parse(await fs.readFile(SHOWDOWN_FILE, { encoding: "utf-8" }))
	} catch {
		throw new Error(`Could not read ${SHOWDOWN_FILE}; run scripts/moves/cache.ts first.`)
	}
}

const mainlineFlinch = (move: ShowdownMove): Flinch | undefined => {
	const secondaries = [move.secondary, ...(move.secondaries ?? [])]
	const flinch = secondaries.find((it) => it?.volatileStatus === "flinch")

	return flinch ? { chance: flinch.chance ?? 100, how: "On hit" } : undefined
}

/** Percent chance a d20 lands on n or higher. */
const atLeast = (n: number) => Math.max(0, 21 - n) * 5

/** Interprets the sentence of a p5e move description that mentions flinching. */
const p5eFlinch = (move: MoveSrdData): Flinch | undefined => {
	const text = `${move.description} ${move.higherLevels ?? ""}`
	const sentences = text.split(/(?<=[.!?])\s+|\n+/).filter((it) => /flinch/i.test(it))

	if (sentences.length === 0) return undefined

	const sentence = sentences.join(" ")

	const threshold = sentence.match(/natural attack rolls? (?:is |of )?(?:an? )?(\d+) or (?:higher|more|20)/i)
	if (threshold) {
		const n = Number(threshold[1])
		return { chance: atLeast(n), how: n === 20 ? "Nat 20" : `Nat ${n}+` }
	}

	if (/\{save\}|fails?\b|failure/i.test(sentence)) {
		return { chance: undefined, how: "Save" }
	}

	return { chance: 100, how: "On hit" }
}

const formatFlinch = (flinch: Flinch | undefined) => {
	if (!flinch) return "—"
	if (flinch.chance == null) return flinch.how
	return flinch.how === "On hit" ? `${flinch.chance}%` : `${flinch.chance}% (${flinch.how})`
}

const formatDiff = (row: Row) => {
	if (row.mainline?.chance == null || row.p5e?.chance == null) return ""
	const diff = row.p5e.chance - row.mainline.chance
	return diff > 0 ? `+${diff}` : String(diff)
}

const category = (row: Row) => {
	if (row.mainline && row.p5e) return "Both"
	if (row.mainline) return row.inP5e ? "Mainline only" : "Mainline only (not in p5e)"
	return "p5e only"
}

const average = (values: number[]) => values.length === 0
	? "n/a"
	: `${(values.reduce((a, b) => a + b, 0) / values.length).toFixed(1)}%`

const summarize = (rows: Row[]): string => {
	const count = (name: string) => rows.filter((row) => category(row) === name).length
	const mainline = rows.filter((row) => row.mainline)
	const p5e = rows.filter((row) => row.p5e)
	const both = rows.filter((row) => row.mainline?.chance != null && row.p5e?.chance != null)

	const mainlineChances = mainline.map((row) => row.mainline!.chance!).filter((it) => it != null)
	const p5eChances = p5e.map((row) => row.p5e!.chance).filter((it): it is number => it != null)

	return markdownTable(["Stat", "Value"], [
		["Moves that flinch in mainline", String(mainline.length)],
		["Moves that flinch in p5e", String(p5e.length)],
		["Flinch in both", String(count("Both"))],
		["Flinch in mainline only (move exists in p5e)", String(count("Mainline only"))],
		["Flinch in mainline only (move not in p5e)", String(count("Mainline only (not in p5e)"))],
		["Flinch in p5e only", String(count("p5e only"))],
		["p5e flinches decided by saving throw", String(p5e.filter((row) => row.p5e!.chance == null).length)],
		["Average mainline flinch chance", average(mainlineChances)],
		["Average p5e flinch chance (excluding saves)", average(p5eChances)],
		["Both: average mainline chance", average(both.map((row) => row.mainline!.chance!))],
		["Both: average p5e chance", average(both.map((row) => row.p5e!.chance!))],
		["Both: p5e chance higher", String(both.filter((row) => row.p5e!.chance! > row.mainline!.chance!).length)],
		["Both: p5e chance equal", String(both.filter((row) => row.p5e!.chance! === row.mainline!.chance!).length)],
		["Both: p5e chance lower", String(both.filter((row) => row.p5e!.chance! < row.mainline!.chance!).length)],
	])
}

/** Renders a markdown table with every column padded to the same width so it reads well as plain text. */
const markdownTable = (header: string[], rows: string[][]): string => {
	const widths = header.map((cell, i) => Math.max(cell.length, 3, ...rows.map((row) => row[i].length)))
	const line = (cells: string[]) => `| ${cells.map((cell, i) => cell.padEnd(widths[i])).join(" | ")} |`

	return [
		line(header),
		line(widths.map((width) => "-".repeat(width))),
		...rows.map(line),
	].join("\n")
}

const mainlineOnlyTable = (rows: Row[]) => markdownTable(
	["Move", "Mainline", "In p5e?"],
	rows.map((row) => [row.name, formatFlinch(row.mainline), row.inP5e ? "Yes" : "No"]),
)

const p5eOnlyTable = (rows: Row[]) => markdownTable(
	["Move", "p5e"],
	rows.map((row) => [row.name, formatFlinch(row.p5e)]),
)

const bothTable = (rows: Row[]) => markdownTable(
	["Move", "Mainline", "p5e", "Δ (p5e − mainline)"],
	rows.map((row) => [row.name, formatFlinch(row.mainline), formatFlinch(row.p5e), formatDiff(row)]),
)

/**
 * Compares which moves cause flinching in the mainline games (per Pokemon Showdown's data)
 * against which cause flinching in Pokemon 5e, along with the chance of each.
 *
 * p5e chances assume a hit; "Nat N+" means a natural attack roll of N or higher, i.e. (21 - N) * 5%.
 */
async function main() {
	const showdown = await getShowdownMoves()
	const moves = await getMoveSrd()

	const rows: Row[] = []
	const seen = new Set<string>()

	for (const move of moves) {
		const id = getShowdownId(move.id)
		seen.add(id)

		const mainline = showdown[id] ? mainlineFlinch(showdown[id]) : undefined
		const p5e = p5eFlinch(move)

		if (mainline || p5e) rows.push({ name: move.name, mainline, p5e, inP5e: true })
	}

	for (const [id, move] of Object.entries(showdown)) {
		if (seen.has(id) || move.isNonstandard === "CAP") continue

		const mainline = mainlineFlinch(move)
		if (mainline) rows.push({ name: move.name, mainline, inP5e: false })
	}

	rows.sort((a, b) => a.name.localeCompare(b.name))

	const report = [
		"# Flinch Comparison: Mainline vs Pokemon 5e",
		"Mainline data comes from Pokemon Showdown. p5e chances assume the move hits; \"Nat N+\" means a natural attack roll of N or higher.",
		"## Summary",
		summarize(rows),
		"## Flinch in Mainline Only",
		mainlineOnlyTable(rows.filter((row) => row.mainline && !row.p5e)),
		"## Flinch in p5e Only",
		p5eOnlyTable(rows.filter((row) => !row.mainline && row.p5e)),
		"## Flinch in Both",
		bothTable(rows.filter((row) => row.mainline && row.p5e)),
	].join("\n\n") + "\n"

	await fs.mkdir(CACHE_FOLDER, { recursive: true })
	await fs.writeFile(REPORT_FILE, report, { encoding: "utf-8" })

	superconsole.success(`Compared ${rows.length} flinching moves in ${REPORT_FILE}!`)
}

main()
