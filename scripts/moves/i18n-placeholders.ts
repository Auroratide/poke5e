import path from "node:path"
import fs from "node:fs/promises"
import { DiceClass } from "../../src/lib/moves/dice/DiceClass.ts"

/**
 * Puts the description placeholders back into a translated move.
 *
 * The English conversion replaced spans it could derive from the move's own data
 * — its dice, type, save and area of effect — with `{dice}`, `{type}`, `{save}`
 * and `{shape}`, so the rendered text follows the data instead of going stale.
 * A translation was written against the old English prose, so it spells those
 * spans out; this finds them again and swaps them back.
 *
 * Nothing is guessed. A token is only substituted where the English move uses
 * it, and only where the span the English data expands to is actually found in
 * the translation, at most as many times as English uses it. Anything else is
 * reported rather than rewritten.
 */

export type MoveJson = {
	id: string,
	type: string,
	description?: string,
	dice?: { class: string, tiers?: string[], modifier: string },
	shape?: { type: string, value: number, unit: string },
}

export type Token = "dice" | "type" | "save" | "shape"

export const TOKENS: Token[] = ["dice", "type", "save", "shape"]

/**
 * The shapes of phrase each language uses, where they cannot be derived from the
 * move data or the message catalogue. Deliberately tight: a loose pattern would
 * swallow words the translator wrote, and a missed span merely stays literal.
 */
type LocalePatterns = {
	/** The whole "make a DEX save against your Move DC" clause. */
	save: RegExp,
	/** SRD shape type -> the word this language uses for it. */
	shapeWords: Record<string, string>,
	/** How this language writes the unit in a shape phrase. */
	feet: string,
	/** Type names a translator used instead of the canonical one. */
	typeAliases?: Record<string, string[]>,
}

const LOCALES: Record<string, LocalePatterns> = {
	es: {
		save: /tirada\s+de\s+salvaci[óo]n\s+de\s+(?:Fuerza|Destreza|Constituci[óo]n|Inteligencia|Sabidur[íi]a|Carisma|FUE|DES|CON|INT|SAB|CAR)(?:\s+contra\s+(?:tu|la|el)\s+CD\s+de\s+Movimiento)?/gi,
		shapeWords: { cone: "cono", line: "l[íi]nea", emanation: "radio", cube: "cubo" },
		feet: "pies",
	},
	pt: {
		save: /(?:teste|resist[êe]ncia|salvaguarda|salvamento)\s+de\s+(?:(?:resist[êe]ncia|salvaguarda)\s+de\s+)?(?:FOR|STR|DES|DEX|CON|INT|SAB|WIS|CAR|CHA|For[çc]a|Destreza|Constitui[çc][ãa]o|Intelig[êe]ncia|Sabedoria|Carisma)(?:\s+contra\s+(?:sua|seu|a|o)\s+(?:CD|DC)\s+(?:de|do)\s+Move(?:mento)?)?/gi,
		shapeWords: { cone: "cone", line: "linha", emanation: "raio", cube: "cubo" },
		feet: "p[ée]s",
		typeAliases: { grass: ["grama"], ground: ["terra"], fighting: ["luta"] },
	},
}

export const supportedLocales = () => Object.keys(LOCALES)

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/**
 * A word boundary that understands accents. JavaScript's `\b` is ASCII, so it
 * refuses to open on "Água" or close on "Dragón" — which is most of the type
 * names outside English.
 */
const OPEN = "(?<![\\p{L}\\p{N}])"
const CLOSE = "(?![\\p{L}\\p{N}])"

/** The first tier is what `{dice}` renders, whether the move names a class or its own tiers. */
function firstTier(move: MoveJson): string | undefined {
	if (move.dice == null) return undefined
	if (move.dice.tiers != null) return move.dice.tiers[0]

	return DiceClass.getTier(move.dice.class as Parameters<typeof DiceClass.getTier>[0])?.[0]
}

/** Replaces up to `limit` matches, and says how many it made. */
function replaceUpTo(text: string, pattern: RegExp, token: Token, limit: number): [string, number] {
	let made = 0
	const result = text.replace(pattern, (match) => {
		if (made >= limit) return match
		made += 1
		return `{${token}}`
	})

	return [result, made]
}

function patternFor(token: Token, move: MoveJson, locale: LocalePatterns, typeNames: Record<string, string>): RegExp | undefined {
	if (token === "dice") {
		const tier = firstTier(move)
		// The modifier keyword travels with the dice: "1d4 + MOV" as well as "1d4 + MOVE".
		return tier == null ? undefined : new RegExp(`${OPEN}${escape(tier)}${CLOSE}(?:\\s*\\+\\s*MOV\\w*)?`, "giu")
	}

	if (token === "type") {
		const names = [typeNames[move.type], move.type, ...(locale.typeAliases?.[move.type] ?? [])].filter((it) => it != null)
		return names.length === 0 ? undefined : new RegExp(`${OPEN}(?:${names.map(escape).join("|")})${CLOSE}`, "giu")
	}

	if (token === "save") return new RegExp(locale.save.source, "gi")

	const shape = move.shape
	if (shape == null) return undefined
	const word = locale.shapeWords[shape.type]
	return word == null
		? undefined
		: new RegExp(`${word}\\s+de\\s+${shape.value}\\s+${locale.feet}`, "giu")
}

export type Substitution = {
	/** Tokens English uses that were found and replaced. */
	applied: Token[],
	/** Tokens English uses whose span could not be found; left as the translator wrote it. */
	missed: Token[],
}

export function substitute(
	description: string,
	english: MoveJson,
	locale: string,
	typeNames: Record<string, string>,
	tokens: Token[],
): [string, Substitution] {
	const patterns = LOCALES[locale]
	const applied: Token[] = []
	const missed: Token[] = []

	if (patterns == null) return [description, { applied, missed }]

	let result = description
	for (const token of tokens) {
		const uses = english.description?.split(`{${token}}`).length ?? 1
		if (uses < 2) continue

		// Already converted: the span is gone precisely because it was substituted.
		if (result.includes(`{${token}}`)) {
			applied.push(token)
			continue
		}

		const pattern = patternFor(token, english, patterns, typeNames)
		if (pattern == null) {
			missed.push(token)
			continue
		}

		const [next, made] = replaceUpTo(result, pattern, token, uses - 1)
		result = next
		if (made > 0) applied.push(token)
		else missed.push(token)
	}

	return [result, { applied, missed }]
}

/** Canonical type names for a locale, which is how a translation usually spells the type. */
export async function typeNamesFor(locale: string): Promise<Record<string, string>> {
	const raw = await fs.readFile(path.join("messages", `${locale}.json`), { encoding: "utf-8" })

	return JSON.parse(raw).canonical?.types ?? {}
}
