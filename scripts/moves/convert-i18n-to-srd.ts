import path from "node:path"
import fs from "node:fs/promises"
import { superconsole } from "../superconsole.ts"
import { substitute, supportedLocales, TOKENS, typeNamesFor, type MoveJson, type Token } from "./i18n-placeholders.ts"

/**
 * Rewrites the move translation overlays in place, from the shape the old
 * `static/data/{locale}/moves.json` files had into the shape the SRD merges.
 *
 * An overlay carries translated *text* and nothing else: `translateData` deep
 * merges it onto the English move, so any other key it declares silently changes
 * the rules for that locale alone. The conversion rules:
 *
 * - Only translatable keys survive. Portuguese still declared `time`, `duration`
 *   and `beta`; time and duration are rendered from the message catalogue now,
 *   and `beta` is a flag rather than text.
 * - `description` becomes one markdown string, paragraphs joined by "\n\n",
 *   matching the English conversion.
 * - A table inside a description moves to `table`, again as English does.
 * - `higherLevels` survives only where the English move defines it. Most of that
 *   text used to spell out the damage-dice progression, which is now derived
 *   from `dice` and rendered from the message catalogue.
 * - `optional` becomes a single string.
 * - Descriptions get their placeholders back: a translation spells out the dice,
 *   type, save and area of effect that the English move renders from its own
 *   data, so those spans are found and turned back into {dice}, {type}, {save}
 *   and {shape}. See ./i18n-placeholders.ts.
 *
 * Idempotent: an already-converted overlay passes through unchanged.
 *
 * Run: node scripts/moves/convert-i18n-to-srd.ts [--tokens=dice,type,save,shape]
 *
 * A token only pays off once the thing that renders it is localized, so the
 * flag exists to stage them: {shape} needs the cone/line/feet messages, {save}
 * needs saveAgainstMoveDc plus a localized attribute abbreviation, and {type}
 * needs Move.description to render a canonical type name rather than the raw
 * English id. Pass --tokens=none to convert structure only.
 */

const EDITION = "2024"
const DIR = path.join("src", "lib", "srd", "data", EDITION, "moves")
const ENGLISH = "en"

/** Keys an overlay may carry. Everything else belongs to the English entry alone. */
const TRANSLATABLE = ["id", "name", "aliases", "description", "higherLevels", "optional", "table"] as const

type TableJson = {
	type: string,
	headers: string[],
	rows: string[][],
}

type LegacyOverlay = {
	id: string,
	name?: string,
	aliases?: string[],
	description?: string | (string | TableJson)[],
	higherLevels?: string,
	optional?: string | string[],
	table?: TableJson,
	[key: string]: unknown,
}

type Overlay = {
	id: string,
	name?: string,
	aliases?: string[],
	description?: string,
	higherLevels?: string,
	optional?: string,
	table?: TableJson,
}

/** Anything a rule could not handle, collected rather than silently guessed at. */
type Issue = {
	locale: string,
	id: string,
	reason: string,
}

type Substitution = {
	applied: Token[],
	missed: Token[],
}

type Converted = {
	overlay: Overlay,
	dropped: string[],
	droppedHigherLevels: boolean,
	extractedTable: boolean,
	substitution: Substitution,
}

const isTable = (value: unknown): value is TableJson =>
	typeof value === "object" && value !== null && !Array.isArray(value)

const paragraphs = (value: string | string[]): string =>
	Array.isArray(value) ? value.join("\n\n") : value

function convert(
	entry: LegacyOverlay,
	english: Map<string, MoveJson & { higherLevels?: string, table?: unknown }>,
	issues: Issue[],
	locale: string,
	typeNames: Record<string, string>,
	tokens: Token[],
): Converted {
	const note = (reason: string) => issues.push({ locale, id: entry.id, reason })

	const overlay: Overlay = { id: entry.id }
	const dropped = Object.keys(entry).filter((key) => !(TRANSLATABLE as readonly string[]).includes(key))
	let substitution: Substitution = { applied: [], missed: [] }

	if (entry.name != null) overlay.name = entry.name
	if (entry.aliases != null) overlay.aliases = entry.aliases

	if (entry.description != null) {
		const parts = Array.isArray(entry.description) ? entry.description : [entry.description]
		const tables = parts.filter(isTable)
		const text = parts.filter((it): it is string => typeof it === "string")

		if (tables.length > 1) note(`${tables.length} tables in one description; only the first was kept`)

		overlay.description = paragraphs(text)
		if (tables[0] != null) overlay.table = tables[0]
	}

	const source = english.get(entry.id)
	if (overlay.description != null && source != null && tokens.length > 0) {
		const [described, result] = substitute(overlay.description, source, locale, typeNames, tokens)
		overlay.description = described
		substitution = result
	}

	// A table already in the right place stays there.
	if (entry.table != null && overlay.table == null) overlay.table = entry.table

	if (overlay.table != null && english.get(entry.id)?.table == null) {
		note("has a table the English move does not; readers of this locale would see one and English readers would not")
	}

	const englishDefinesHigherLevels = english.get(entry.id)?.higherLevels != null
	const droppedHigherLevels = entry.higherLevels != null && !englishDefinesHigherLevels
	if (entry.higherLevels != null && englishDefinesHigherLevels) overlay.higherLevels = entry.higherLevels

	if (entry.optional != null) overlay.optional = paragraphs(entry.optional)

	if (!english.has(entry.id)) note("no English move with this id; the overlay can never apply")

	return {
		overlay,
		dropped,
		droppedHigherLevels,
		extractedTable: overlay.table != null && entry.table == null,
		substitution,
	}
}

async function readValues(file: string): Promise<LegacyOverlay[]> {
	const raw = await fs.readFile(file, { encoding: "utf-8" })

	return JSON.parse(raw).values
}

function requestedTokens(): Token[] {
	const flag = process.argv.find((it) => it.startsWith("--tokens="))
	if (flag == null) return TOKENS

	const names = flag.slice("--tokens=".length).split(",").map((it) => it.trim()).filter((it) => it !== "")
	if (names.length === 1 && names[0] === "none") return []

	const unknown = names.filter((it) => !(TOKENS as string[]).includes(it))
	if (unknown.length > 0) {
		superconsole.failure(`unknown token(s): ${unknown.join(", ")}; expected some of ${TOKENS.join(", ")}`)
		process.exit(1)
	}

	return names as Token[]
}

async function main() {
	const tokens = requestedTokens()

	const english = new Map(
		(await readValues(path.join(DIR, `${ENGLISH}.json`)))
			.map((it) => [it.id, it] as const),
	)

	const locales = (await fs.readdir(DIR))
		.filter((it) => it.endsWith(".json"))
		.map((it) => path.basename(it, ".json"))
		.filter((it) => it !== ENGLISH)
		.sort()

	const issues: Issue[] = []

	for (const locale of locales) {
		const file = path.join(DIR, `${locale}.json`)
		const entries = await readValues(file)
		const typeNames = await typeNamesFor(locale)
		const results = entries.map((it) => convert(it, english, issues, locale, typeNames, tokens))

		const values = results.map((it) => it.overlay)
		await fs.writeFile(file, JSON.stringify({ values }, null, "\t") + "\n", { encoding: "utf-8" })

		const dropped = new Map<string, number>()
		results.flatMap((it) => it.dropped).forEach((key) => dropped.set(key, (dropped.get(key) ?? 0) + 1))

		const count = (predicate: (it: Converted) => boolean) => results.filter(predicate).length
		const droppedKeys = [...dropped.entries()].map(([key, n]) => `${key} (${n})`).join(", ")

		superconsole.log(`${locale}: ${entries.length} entries`)
		superconsole.log(`  name           ${count((it) => it.overlay.name != null)}`)
		superconsole.log(`  description    ${count((it) => it.overlay.description != null)}`)
		superconsole.log(`  table          ${count((it) => it.overlay.table != null)} (${count((it) => it.extractedTable)} moved out of a description)`)
		superconsole.log(`  higherLevels   ${count((it) => it.overlay.higherLevels != null)} kept, ${count((it) => it.droppedHigherLevels)} derivable and dropped`)
		superconsole.log(`  optional       ${count((it) => it.overlay.optional != null)}`)
		superconsole.log(`  untranslatable ${droppedKeys === "" ? "none" : droppedKeys}`)

		if (tokens.length > 0 && supportedLocales().includes(locale)) {
			tokens.forEach((token) => {
				const applied = count((it) => it.substitution.applied.includes(token))
				const missed = results.filter((it) => it.substitution.missed.includes(token))
				const tail = missed.length === 0
					? ""
					: `, ${missed.length} not found (${missed.slice(0, 3).map((it) => it.overlay.id).join(", ")}${missed.length > 3 ? ", …" : ""})`
				superconsole.log(`  {${token}}`.padEnd(17) + `${applied} substituted${tail}`)
			})
		} else if (tokens.length > 0) {
			superconsole.log("  placeholders   no patterns for this locale; descriptions left as written")
		}

		superconsole.log("")
	}

	if (issues.length > 0) {
		superconsole.failure(`${issues.length} entries need a look by hand:`)
		issues.forEach(({ locale, id, reason }) => superconsole.log(`  ${locale}  ${id.padEnd(20)} ${reason}`))
		superconsole.log("")
	}

	superconsole.success(`Converted ${locales.length} overlays: ${locales.join(", ")}`)
}

main()
