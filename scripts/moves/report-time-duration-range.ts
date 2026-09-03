import path from "node:path"
import fs from "node:fs/promises"
import { getMoveData, type MoveData } from "./files.ts"
import { superconsole } from "../superconsole.ts"

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const REPORT_FILE = path.join(CACHE_FOLDER, "time-duration-range.md")

/** The fields to tally, in the order they appear in the report. */
const FIELDS: { heading: string, field: keyof MoveData }[] = [
	{ heading: "Time", field: "time" },
	{ heading: "Duration", field: "duration" },
	{ heading: "Range", field: "range" },
]

const MISSING = "(none)"

/** Counts every distinct value of one field, most common first. */
const tally = (moves: MoveData[], field: keyof MoveData): [string, number][] => {
	const counts: Record<string, number> = {}

	for (const move of moves) {
		const value = move[field] === "" || move[field] == null
			? MISSING
			: String(move[field])

		counts[value] = (counts[value] ?? 0) + 1
	}

	return Object.entries(counts)
		.sort(([aValue, aCount], [bValue, bCount]) => bCount - aCount || aValue.localeCompare(bValue))
}

const section = (heading: string, counts: [string, number][]): string => [
	`## ${heading}`,
	...counts.map(([value, count]) => `${value}\t\t${count}`),
].join("\n")

/**
 * Reports how many moves use each distinct time, duration, and range, so that the
 * long tail of one-off phrasings is easy to spot and normalize.
 */
async function main() {
	const moves = await getMoveData()

	const tallies = FIELDS.map(({ heading, field }) => ({ heading, counts: tally(moves, field) }))

	const sections = tallies.map(({ heading, counts }) => section(heading, counts))
	const report = `# Time, Duration, and Range\n\n${moves.length} moves\n\n${sections.join("\n\n")}\n`

	await fs.mkdir(CACHE_FOLDER, { recursive: true })
	await fs.writeFile(REPORT_FILE, report, { encoding: "utf-8" })

	tallies.forEach(({ heading, counts }) => {
		superconsole.log(`${heading.padEnd(12)} ${counts.length} distinct values`)
	})

	superconsole.success(`\nReported on ${moves.length} moves in ${REPORT_FILE}!`)
}

main()
