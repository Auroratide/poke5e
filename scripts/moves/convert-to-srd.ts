import { getMoveData, writeMoveSrd, type MoveData, type MoveSrdData } from "./files.ts"
import { superconsole } from "../superconsole.ts"

export type DamageDice = `${number}d${number}`
export type DamageClass = [DamageDice, DamageDice, DamageDice, DamageDice]

const DamageClasses: Record<string, DamageClass> = {
	"0": ["1d4", "1d6", "1d8", "1d10"],
	"10": ["1d4", "1d6", "1d8", "2d6"],
	"20": ["1d4", "2d4", "1d12", "4d4"],
	"30": ["1d6", "1d10", "2d8", "5d4"],
	"40": ["1d6", "1d12", "2d8", "4d6"],
	"50": ["1d8", "2d6", "4d4", "3d10"],
	"60": ["1d10", "2d8", "5d4", "4d8"],
	"70": ["1d12", "2d8", "2d12", "6d6"],
	"80": ["2d6", "2d8", "4d6", "6d6"],
	"90": ["2d8", "2d10", "3d10", "4d12"],
	"100": ["4d4", "2d12", "4d8", "8d6"],
	"110": ["3d6", "3d8", "6d6", "7d8"],
	"120": ["2d10", "3d8", "4d10", "7d8"],
	"130": ["5d4", "3d10", "5d8", "8d8"],
	"140": ["2d12", "3d10", "7d6", "8d8"],
	"150": ["3d8", "5d6", "4d12", "8d8"],
	"160": ["4d6", "5d6", "6d8", "6d12"],
	"180": ["3d10", "6d6", "8d6", "7d12"],
	"200": ["5d6", "4d10", "6d10", "8d12"],
}

/**
 * This script converts the moves in moves.json to the SRD formatted moves. Note: even though moves.json is structured, the SRD is even more structured, and there are some inconsistencies in the moves.json file that have to be accounted for.
 *
 * For a more detailed spec on the moves SRD, view src/lib/srd/moves/schema.ts.
 *
 * Some conversion rules:
 * - units and types are lower case by convention
 * - Move power: "any" should be a list of all six attributes; "none" should be an empty list; "varies" is kept as is
 * - time: no value; either "action", "bonus action", or "reaction"; ignore charge
 * - duration: "instantaneous" counts as a unit
 * - range: if the original range is self with a shape, then shape data will go into `shape`.
 * - `damage` becomes `dice`, sorta. `type` now refers to "damage" or "healing", not the damage type. `modifier` is always a string, even if it was just a number before (0 -> "0"), because it will represent a sort of expression language. `class` refers to the DamageClasses entry in this. If the move's dice profile matches one of the classes, then instead of assigning `tiers`, assign `class` (string value, "20" for example). Otherwise, `class` is "custom", and tiers is a tuple of dice values.
 * - description is no longer a list of strings. It is now a single markdown string, paragraphs separated by "\n\n". It will also have an expression language itself: {dice} replaces things like "4d4 + MOVE"; {type} replaces the move's damage type. {shape} replaces the in-description AoE description; {save} replaces "DEX save against your Move DC".
 * - The description will NOT contain markdown tables anymore. instead, if it contained a table, that table will go verbatim into `table`.
 * - Most "higherLevels" text is of the form "The damage dice roll for this move changes to 2d10 at level 5, 3d10 at level 10, and 4d12 at level 17.". If so, it now gets excluded in the SRD because it will get derived from the `dice` values. Include "higherLevels" for any custom text.
 * - save: now only specifies a single attribute, no dc. DC was always just "MOVE", and no ability ever specifies multiple save targets.
 */

/** Anything a conversion rule could not handle, collected instead of silently guessed at. */
type Issue = {
	id: string,
	field: string,
	value: string,
	reason: string,
}

type Note = (field: string, value: string, reason: string) => void

const LEVELS = [1, 5, 10, 17] as const

const ATTRIBUTE_ORDER = ["str", "dex", "con", "int", "wis", "cha"]

const TIME_UNITS = ["action", "bonus action", "reaction"]

/** Parenthesized range word -> the shape type the SRD calls it. */
const SHAPE_TYPES: Record<string, string> = {
	radius: "emanation",
	cone: "cone",
	line: "line",
}

/** The shape word to look for in prose, per SRD shape type. */
const SHAPE_WORDS: Record<string, string> = {
	emanation: "radius",
	cone: "cone",
	line: "line",
}

/** Durations the schema's minute/round/varies units cannot read as written. */
const DURATION_REWRITES: Record<string, string> = {
	"while in battle": "varies",
	"2-3 rounds": "3 rounds",
	"2 turns, concentration": "2 rounds, concentration",
}

/**
 * The three ranges that name two ranges at once. Force Palm and Struggle are melee
 * *or* ranged depending on how you use them, which is what "varies" is for; Odor
 * Sleuth picks a target at 30ft and then applies an aura, so the 30ft is the range.
 */
const RANGE_OVERRIDES: Record<string, MoveSrdData["range"]> = {
	"force-palm": { type: "varies" },
	"struggle": { type: "varies" },
	"odor-sleuth": { type: "distance", value: 30, unit: "feet" },
}

/**
 * The sentence openings whose higher levels text says nothing the dice tiers do not
 * already say. A move only counts as derivable if it opens with one of these *and*
 * its level/dice pairs line up exactly with its tiers.
 */
const HIGHER_LEVELS_FRAME = /^the (?:base )?(?:damage |healing )?dice(?: rolls?| used)?(?: for (?:this move|healing))? (?:changes?|increases?) to /i

/**
 * Pulls "2d10 at level 5", "a d8 at level 5", and "2d4+Level at level 5" out of higher
 * levels text. The optional modifier is captured so it can be checked against the
 * move's own modifier rather than waved through.
 */
const LEVEL_PAIR = /\b(\d*d\d+)\s*(?:\+\s*([A-Za-z]+))?\s+at\s+level\s+(\d+)/gi

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** Normalizes every way the data spells a distance: "15 ft", "40-ft", "100f" -> "15ft". */
const normalizeFeet = (value: string): string =>
	value.toLowerCase().trim().replace(/(\d+)\s*-?\s*(?:feet|foot|ft|f)\b/g, "$1ft")

/** "any" is all six attributes, "none" is no attributes, and "varies" stays as it is. */
const convertPower = (power: MoveData["power"]): string | string[] => {
	if (power === "varies") return "varies"
	if (power === "any") return [...ATTRIBUTE_ORDER]
	if (power === "none") return []

	return [...power]
		.map((it) => it.toLowerCase())
		.sort((a, b) => ATTRIBUTE_ORDER.indexOf(a) - ATTRIBUTE_ORDER.indexOf(b))
}

/** Drops the leading "1 " and the charge/recharge qualifier; the description covers both. */
const convertTime = (time: string, note: Note): MoveSrdData["time"] => {
	const unit = time.split(",")[0].trim().toLowerCase().replace(/^1\s+/, "")

	if (!TIME_UNITS.includes(unit)) {
		note("time", time, "not one of action, bonus action, reaction")
		return { unit: "action" }
	}

	return { unit }
}

const convertDuration = (duration: string, note: Note): MoveSrdData["duration"] => {
	const normalized = duration.toLowerCase().trim().replace(/\s*\(concentration\)/, ", concentration")
	const rewritten = DURATION_REWRITES[normalized] ?? normalized

	const parts = rewritten.split(",").map((it) => it.trim())
	const concentration = parts.includes("concentration") ? true : undefined
	// "charge" is a qualifier the schema has no field for, and the description says it anyway.
	const [head] = parts.filter((it) => it !== "concentration" && it !== "charge")

	if (head === "instantaneous" || head === "varies") return { unit: head, concentration }

	const measured = head.match(/^(\d+)\s+(minute|round)s?$/)
	if (measured == null) {
		note("duration", duration, "not instantaneous, varies, or a count of minutes or rounds")
		return { unit: "varies", concentration }
	}

	return { unit: measured[2], value: Number(measured[1]), concentration }
}

/**
 * Splits the range into its range and, when it names an area of effect, its shape.
 * The two coexist: Thousand Arrows is a 30ft emanation centered up to 100ft away.
 */
const convertRange = (
	id: string,
	range: string,
	note: Note,
): { range: MoveSrdData["range"], shape?: MoveSrdData["shape"] } => {
	const override = RANGE_OVERRIDES[id]
	if (override != null) {
		note("range", range, "names two ranges at once; taken from RANGE_OVERRIDES")
		return { range: override }
	}

	const normalized = normalizeFeet(range)

	if (normalized === "melee") return { range: { type: "melee" } }
	if (normalized === "self") return { range: { type: "self" } }
	if (normalized === "varies") return { range: { type: "varies" } }

	const reach = normalized.match(/^melee \((\d+)ft reach\)$/)
	if (reach != null) {
		return { range: { type: "melee", reach: { value: Number(reach[1]), unit: "feet" } } }
	}

	const distance = normalized.match(/^(\d+)ft$/)
	if (distance != null) {
		return { range: { type: "distance", value: Number(distance[1]), unit: "feet" } }
	}

	const area = normalized.match(/^(self|(\d+)ft) \((\d+)ft (radius|cone|line)\)$/)
	if (area != null) {
		const [, origin, originFeet, shapeFeet, shapeWord] = area

		return {
			range: origin === "self"
				? { type: "self" }
				: { type: "distance", value: Number(originFeet), unit: "feet" },
			shape: { type: SHAPE_TYPES[shapeWord], value: Number(shapeFeet), unit: "feet" },
		}
	}

	note("range", range, "unrecognized range")
	return { range: { type: "varies" } }
}

/** The four dice tiers as strings; Sonic Boom stores its flat 16 as a number. */
const tiersOf = (damage: NonNullable<MoveData["damage"]>): [string, string, string, string] =>
	[String(damage.dice["1"]), String(damage.dice["5"]), String(damage.dice["10"]), String(damage.dice["17"])]

/**
 * The old `damage.type` is dropped: for every single-typed move it repeats the move's
 * own type, and the moves whose damage type varies explain that in prose or a table.
 * All that survives is whether the dice heal or hurt.
 */
const convertDice = (damage: MoveData["damage"]): MoveSrdData["dice"] | undefined => {
	if (damage == null) return undefined

	const tiers = tiersOf(damage)
	const matched = Object.entries(DamageClasses)
		.find(([, dice]) => dice.every((die, i) => die === tiers[i]))

	const rawType = Array.isArray(damage.type) ? damage.type[0] : damage.type
	const type = rawType === "healing" ? "healing" : "damage"
	const modifier = String(damage.modifier)

	return matched != null
		? { class: matched[0], modifier, type }
		: { class: "custom", tiers, modifier, type }
}

/** Every save in the data is a single attribute against a "MOVE" DC, so only the attribute survives. */
const convertSave = (save: MoveData["save"]): MoveSrdData["save"] | undefined =>
	save == null ? undefined : { attribute: save.attribute[0].toLowerCase() }

type DescriptionTable = { type: string, headers: string[], rows: string[][] }

const isTable = (part: string | object): part is DescriptionTable => typeof part !== "string"

const toMarkdownTable = (table: DescriptionTable): string => [
	`| ${table.headers.join(" | ")} |`,
	`| ${table.headers.map(() => "---").join(" | ")} |`,
	...table.rows.map((row) => `| ${row.join(" | ")} |`),
].join("\n")

/** The old field mixed prose and tables; the SRD wants one markdown string. */
const convertOptional = (optional: MoveData["optional"]): string | undefined =>
	optional == null || optional.length === 0
		? undefined
		: optional.map((part) => isTable(part) ? toMarkdownTable(part) : part).join("\n\n")

type Substitutions = {
	dice?: MoveSrdData["dice"],
	tiers?: [string, string, string, string],
	save?: MoveSrdData["save"],
	shape?: MoveSrdData["shape"],
	/** False for the moves whose damage type varies, where {type} would be a lie. */
	substituteType: boolean,
}

type DescriptionResult = {
	description: string,
	table?: DescriptionTable,
	substituted: Set<string>,
}

/**
 * Flattens the description to one markdown string, lifts the table out of it, and
 * swaps the derivable numbers out for their tokens.
 *
 * Each token is anchored on a phrase rather than a bare word, and every match is
 * replaced. That matters most for {type}: 88 moves use their own type word in plain
 * prose ("You expel pressurized water", "You strike the ground so hard", "you fire
 * your electrically charged ice"), so only an occurrence directly before "damage"
 * can safely become a token.
 */
const convertDescription = (
	move: MoveData,
	subs: Substitutions,
	note: Note,
): DescriptionResult => {
	const table = move.description.find(isTable)
	// The renderer always trails the table after the description, so no marker is needed.
	let description = move.description.filter((part) => !isTable(part)).join("\n\n")
	const substituted = new Set<string>()

	if (subs.dice != null && subs.tiers != null) {
		const [tier] = subs.tiers
		const { modifier } = subs.dice
		const expression = modifier === "0" ? tier : `${tier} + ${modifier}`
		// The prose spells the modifier several ways — "+ Move", "+MOVE", and, for the two
		// moves whose modifier is "MOVE + 5", the terms in the other order — so match the
		// terms as a set rather than as one literal string.
		const terms = modifier === "0" ? [] : modifier.split("+").map((it) => it.trim()).filter(Boolean)
		const alternation = terms.map(escapeRegExp).join("|")
		const whole = terms.length === 0
			? new RegExp(`\\b${escapeRegExp(tier)}\\b`, "gi")
			: new RegExp(`\\b${escapeRegExp(tier)}\\b(?:\\s*\\+\\s*(?:${alternation})\\b)+`, "gi")
		const hasEveryTerm = (match: string) =>
			terms.every((term) => match.toLowerCase().includes(term.toLowerCase()))

		const substitutedWhole = description.replace(whole, (match) => hasEveryTerm(match) ? "{dice}" : match)

		if (substitutedWhole !== description) {
			description = substitutedWhole
			substituted.add("dice")
		} else {
			// Falling back to the dice alone is only safe where the prose does not go on to
			// add a modifier of its own. "1d6 + the user's level" would become
			// "{dice} + the user's level", which counts the modifier twice.
			const bare = new RegExp(`\\b${escapeRegExp(tier)}\\b(?!\\s*\\+)`, "g")

			if (bare.test(description)) {
				description = description.replace(bare, "{dice}")
				substituted.add("dice")
				note("description", expression, "the description states the dice without the modifier; substituted the dice alone")
			} else {
				note("description", expression, "no {dice} substitution; the description states the modifier in its own words")
			}
		}
	}

	if (subs.substituteType) {
		const type = new RegExp(`\\b${escapeRegExp(move.type)}(?=\\s+damage\\b)`, "gi")

		if (type.test(description)) {
			description = description.replace(type, "{type}")
			substituted.add("type")
		} else if (subs.dice?.type === "damage") {
			note("description", move.type, "no {type} substitution; the description never says \"<type> damage\"")
		}
	}

	if (subs.save != null) {
		// Matching the move's *own* attribute is what keeps Apple Acid right: its prose
		// also names a CON save that is not the save the move actually calls for.
		const save = new RegExp(
			`\\b${subs.save.attribute}\\s+(?:saving throw|save)(?:\\s+against\\s+your\\s+move\\s+dc)?`,
			"gi",
		)

		if (save.test(description)) {
			description = description.replace(save, "{save}")
			substituted.add("save")
		} else {
			note("description", subs.save.attribute, "no {save} substitution")
		}
	}

	if (subs.shape != null) {
		// Only the noun phrase form. "All creatures within 30 feet of you" cannot take a
		// {shape}, because {shape} renders as a noun phrase: "within 30 foot emanation of
		// you" is not a sentence. Those keep their prose.
		const word = SHAPE_WORDS[subs.shape.type]
		const shape = new RegExp(
			`\\b${subs.shape.value}\\s*-?\\s*(?:foot|feet|ft)\\.?\\s*-?\\s*(?:long\\s+)?${word}(?:\\s*-?\\s*circle)?`,
			"gi",
		)

		if (shape.test(description)) {
			description = description.replace(shape, "{shape}")
			substituted.add("shape")
		} else {
			note("description", `${subs.shape.value}ft ${word}`, "no {shape} substitution; the description does not name the shape as a noun phrase")
		}
	}

	return { description, table, substituted }
}

/**
 * Higher levels text is dropped only when the dice tiers already say the same thing.
 * The data phrases that sentence about a dozen ways, so the test is structural: a
 * known opening, one sentence, and level/dice pairs that match the tiers exactly at
 * exactly the levels where the tiers change.
 */
const isDerivableHigherLevels = (
	text: string,
	tiers: [string, string, string, string],
	modifier: string,
): boolean => {
	if (!HIGHER_LEVELS_FRAME.test(text)) return false
	// More than one sentence means it says something extra, as Swords Dance does.
	if (/\.\s+\S/.test(text)) return false

	const stated = new Map<number, string>()
	for (const [, dice, statedModifier, level] of text.matchAll(LEVEL_PAIR)) {
		// A restated modifier only counts as derivable if it is the move's own.
		if (statedModifier != null && statedModifier.toLowerCase() !== modifier.toLowerCase()) return false
		stated.set(Number(level), dice)
	}

	const changed = LEVELS
		.map((level, i) => ({ level, tier: tiers[i], previous: tiers[i - 1] }))
		.filter(({ tier, previous }) => previous != null && tier !== previous)

	if (stated.size !== changed.length) return false

	return changed.every(({ level, tier }) => {
		const dice = stated.get(level)
		// "a d8 at level 5" states only the die size, which is all the "Rd8" tiers have.
		return dice != null && (dice === tier || (dice.startsWith("d") && tier.endsWith(dice)))
	})
}

const convertHigherLevels = (move: MoveData, note: Note): string | undefined => {
	if (move.higherLevels == null) return undefined

	if (move.damage == null) {
		if (HIGHER_LEVELS_FRAME.test(move.higherLevels)) {
			note("higherLevels", move.higherLevels, "describes dice scaling, but the move has no damage to derive it from")
		}

		return move.higherLevels
	}

	return isDerivableHigherLevels(move.higherLevels, tiersOf(move.damage), String(move.damage.modifier))
		? undefined
		: move.higherLevels
}

type Converted = {
	move: MoveSrdData,
	issues: Issue[],
	substituted: Set<string>,
	droppedHigherLevels: boolean,
}

const convert = (move: MoveData): Converted => {
	const issues: Issue[] = []
	const note: Note = (field, value, reason) => issues.push({ id: move.id, field, value, reason })

	const dice = convertDice(move.damage)
	const save = convertSave(move.save)
	const { range, shape } = convertRange(move.id, move.range, note)

	// The moves whose damage type varies say so in prose or a table; {type} would fix
	// them to a single type. Multi-Attack carries an empty list for the same reason.
	const damageTypes = move.damage?.type
	const substituteType = dice != null
		&& dice.type === "damage"
		&& (!Array.isArray(damageTypes) || damageTypes.length === 1)

	const { description, table, substituted } = convertDescription(move, {
		dice,
		tiers: move.damage != null ? tiersOf(move.damage) : undefined,
		save,
		shape,
		substituteType,
	}, note)

	const higherLevels = convertHigherLevels(move, note)

	// Keys follow the order they are declared in src/lib/srd/moves/schema.ts.
	const converted: MoveSrdData = {
		id: move.id,
		name: move.name,
		type: move.type,
		power: convertPower(move.power),
		time: convertTime(move.time, note),
		pp: move.pp,
		duration: convertDuration(move.duration, note),
		range,
		shape,
		dice,
		attack: move.attack,
		save,
		tm: move.tm,
		description,
		higherLevels,
		table,
		categories: move.categories ?? [],
		optional: convertOptional(move.optional),
		beta: move.beta,
	}

	return {
		move: converted,
		issues,
		substituted,
		droppedHigherLevels: move.higherLevels != null && higherLevels == null,
	}
}

/**
 * The schema lives in src and imports without file extensions, which plain node cannot
 * resolve, so this checks the handful of closed value sets by hand. `npm run test:srd`
 * validates the written file against the real schema.
 */
const validate = (move: MoveSrdData): string[] => {
	const problems: string[] = []
	const check = (ok: boolean, message: string) => { if (!ok) problems.push(message) }

	check(TIME_UNITS.includes(move.time.unit), `time.unit "${move.time.unit}"`)
	check(["minute", "round", "instantaneous", "varies"].includes(move.duration.unit), `duration.unit "${move.duration.unit}"`)
	check(["distance", "melee", "self", "varies"].includes(move.range.type), `range.type "${move.range.type}"`)
	check(move.shape == null || Object.values(SHAPE_TYPES).includes(move.shape.type), `shape.type "${move.shape?.type}"`)
	check(move.save == null || ATTRIBUTE_ORDER.includes(move.save.attribute), `save.attribute "${move.save?.attribute}"`)
	check(
		move.dice == null || move.dice.class === "custom" || move.dice.class in DamageClasses,
		`dice.class "${move.dice?.class}"`,
	)
	check(
		move.dice == null || (move.dice.class === "custom") === (move.dice.tiers != null),
		"dice.tiers is present exactly when the class is custom",
	)
	check(Array.isArray(move.power) ? move.power.every((it) => ATTRIBUTE_ORDER.includes(it)) : move.power === "varies", `power ${JSON.stringify(move.power)}`)
	check(move.description.length > 0, "description is empty")

	return problems
}

async function main() {
	const moves = await getMoveData()

	const results = moves.map(convert)
	const converted = results.map((it) => it.move)

	const invalid = converted
		.map((move) => ({ id: move.id, problems: validate(move) }))
		.filter(({ problems }) => problems.length > 0)

	if (invalid.length > 0) {
		superconsole.failure(`${invalid.length} moves failed validation; nothing was written:`)
		invalid.forEach(({ id, problems }) => problems.forEach((it) => superconsole.log(`  ${id.padEnd(24)} ${it}`)))
		process.exitCode = 1
		return
	}

	await writeMoveSrd(converted)

	const count = (predicate: (it: Converted) => boolean) => results.filter(predicate).length
	const withDice = results.filter((it) => it.move.dice != null)
	const withHigherLevels = results.filter((it) => it.move.higherLevels != null || it.droppedHigherLevels)

	superconsole.log(`dice           ${withDice.length} (${count((it) => it.move.dice?.class === "custom")} custom, ${count((it) => it.move.dice != null && it.move.dice.class !== "custom")} classed)`)
	superconsole.log(`shape          ${count((it) => it.move.shape != null)}`)
	superconsole.log(`table          ${count((it) => it.move.table != null)}`)
	superconsole.log(`optional       ${count((it) => it.move.optional != null)}`)
	superconsole.log(`higherLevels   ${withHigherLevels.length} (${count((it) => it.droppedHigherLevels)} derivable and dropped, ${count((it) => it.move.higherLevels != null)} kept)`)

	superconsole.log("")
	const substitutable: Record<string, number> = {
		dice: withDice.length,
		type: count((it) => it.move.dice?.type === "damage"),
		save: count((it) => it.move.save != null),
		shape: count((it) => it.move.shape != null),
	}
	Object.entries(substitutable).forEach(([token, total]) => {
		const hits = count((it) => it.substituted.has(token))
		superconsole.log(`{${token}}`.padEnd(15) + `${hits} of ${total}`)
	})

	const issues = results.flatMap((it) => it.issues)
	if (issues.length > 0) {
		superconsole.failure(`\n${issues.length} moves need a look by hand:`)
		issues.forEach(({ id, field, value, reason }) =>
			superconsole.log(`  ${id.padEnd(20)} ${field.padEnd(12)} ${JSON.stringify(value).padEnd(28)} ${reason}`))
	}

	superconsole.success(`\nConverted ${converted.length} moves!`)
}

main()
