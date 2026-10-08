import path from "node:path"
import fs from "node:fs/promises"
import { getPokemonSrd, writePokemonSrd, getPokemonOverrides, writePokemonOverrides, type PokemonData, type PokemonOverride } from "./files.ts"
import { superconsole } from "../superconsole.ts"
import { Report } from "./report.ts"

/**
 * Details about move-matrix-assigned.csv.
 * Do not read the entire file into context. It is 20,000 lines long.
 * 
 * Here is what the start of the CSV looks like to get an idea of its formatting:
 * 
id,pokémon,move,merge,is_TM?,Poke5e Level,Game Level,Fitted Level,Fitted Level Rounded,Fitted Level Capped,Progressive Scale?,Non-Progressive Evolved,Inherited,Inherited Capped,Manual Proposed,Proposed Poke5e Level,Method
0,bulbasaur,growl,bulbasaurgrowl,,0,1,,,,TRUE,,,,,0,In Poke 5e Already
0,bulbasaur,tackle,bulbasaurtackle,,0,1,,,,TRUE,,,,,0,In Poke 5e Already
0,bulbasaur,vine-whip,bulbasaurvine-whip,,2,3,,,,TRUE,,,,,2,In Poke 5e Already
0,bulbasaur,leech-seed,bulbasaurleech-seed,,2,7,,,,TRUE,,,,,2,In Poke 5e Already
0,bulbasaur,razor-leaf,bulbasaurrazor-leaf,,6,12,,,,TRUE,,,,,6,In Poke 5e Already
0,bulbasaur,poison-powder,bulbasaurpoison-powder,,6,13,,,,TRUE,,,,,6,In Poke 5e Already
0,bulbasaur,sleep-powder,bulbasaursleep-powder,,6,13,,,,TRUE,,,,,6,In Poke 5e Already
0,bulbasaur,take-down,bulbasaurtake-down,102,6,15,,,,TRUE,,,,,6,In Poke 5e Already
0,bulbasaur,growth,bulbasaurgrowth,,10,6,,,,TRUE,,,,,10,In Poke 5e Already
0,bulbasaur,sweet-scent,bulbasaursweet-scent,999,10,21,,,,TRUE,,,,,10,In Poke 5e Already
0,bulbasaur,double-edge,bulbasaurdouble-edge,232,10,27,,,,TRUE,,,,,10,In Poke 5e Already
0,bulbasaur,synthesis,bulbasaursynthesis,,14,27,,,,TRUE,,,,,14,In Poke 5e Already
0,bulbasaur,worry-seed,bulbasaurworry-seed,,14,30,,,,TRUE,,,,,14,In Poke 5e Already
0,bulbasaur,seed-bomb,bulbasaurseed-bomb,145,18,18,,,,TRUE,,,,,18,In Poke 5e Already
0,bulbasaur,power-whip,bulbasaurpower-whip,999,-1,33,15.37089202,14,14,TRUE,,,,,14,Fitted to Line of Best Fit
0,bulbasaur,solar-beam,bulbasaursolar-beam,22,-1,36,16.55399061,18,18,TRUE,,,,,18,Fitted to Line of Best Fit
 */

/**
 * Before assigning anything, the current level-up movesets are copied into the 2018 edition's
 * overrides, since this update only applies to the 2024 edition. Pokemon that already have a
 * 2018 moves override are left alone. Afterwards, any level slot newly created in 2024 is set to
 * null in 2018 so it is not inherited.
 */

/**
 * This script will utilize the data in move-matrix-assigned.csv.
 * 
 * The script looks at the pokemon, and does the following depending on the Method column.
 * - In Poke 5e Already: Verify, and report if not true
 * - Fitted to Line of Best Fit: Assign the move to the pokemon at the level recommended by Proposed Poke5e Level. Level 0 means Start. If not valid level, report.
 * - Inherited from Pre-Evo: Assign the move to the pokemon at the level recommended by the Proposed Poke5e Level column.
 * - Level 0/1 Move in the games: Assign the move to the pokemon's Start.
 * - Minimum Level 20 Pokemon: Assign the move to the pokemon's Start.
 * - Manually assigned from post-evo: Assign the move to the pokemon at the level recommended by the Proposed Poke5e Level column.
 * - Manually assigned hitmontrio: Assign the move to the pokemon at the level recommended by the Proposed Poke5e Level column.
 * - Manually assigned one-offs: Assign the move to the pokemon at the level recommended by the Proposed Poke5e Level column.
 * 
 * There are a couple of exceptions to look out for:
 * - If a pre-evo learns a move that it's later evolutions do NOT learn, (I changed my mind) DO NOT ADD THIS to the later evos, and instead just report on it. There are valid cases like with Caterpie -> Metapod.
 * 
 * Other requirements:
 * - This change is purely additive. DO NOT REMOVE ANY MOVES.
 */

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const CSV_PATH = path.join(CACHE_FOLDER, "move-matrix-assigned.csv")
const REPORT_PATH = path.join(CACHE_FOLDER, "assign-moves-report.md")
const EVOLUTIONS_PATH = (edition: string) => path.join("src", "lib", "srd", "data", edition, "evolutions", "en.json")

type LevelKey = "start" | "level2" | "level6" | "level10" | "level14" | "level18"
const LEVEL_KEYS: Record<number, LevelKey> = {
	0: "start",
	2: "level2",
	6: "level6",
	10: "level10",
	14: "level14",
	18: "level18",
}

const ALREADY = "In Poke 5e Already"
const START_METHODS = ["Level 0/1 Move in the Games", "Minimum Level 20 Pokémon"]
const PROPOSED_METHODS = [
	"Fitted to Line of Best Fit",
	"Inherited from Pre-Evo",
	"Manually assigned from post-evo",
	"Manually assigned hitmontrio",
	"Manually assigned one-offs",
]

type Row = {
	pokemon: string,
	move: string,
	proposed: number,
	method: string,
}

type Evolution = { from: string, to: string }

const levelName = (level: number) => level === 0 ? "Start" : `Lv ${level}`

async function getRows(): Promise<Row[]> {
	const raw = await fs.readFile(CSV_PATH, { encoding: "utf-8" })
	const [header, ...lines] = raw.split(/\r?\n/).filter((line) => line.trim().length > 0)
	const columns = header.split(",")
	const col = (name: string) => {
		const i = columns.indexOf(name)
		if (i < 0) throw new Error(`Missing column in CSV: ${name}`)
		return i
	}
	const [pokemonCol, moveCol, proposedCol, methodCol] = [col("pokémon"), col("move"), col("Proposed Poke5e Level"), col("Method")]

	return lines.map((line) => {
		const cells = line.split(",")
		return {
			pokemon: cells[pokemonCol],
			move: cells[moveCol],
			proposed: Number(cells[proposedCol]),
			method: cells[methodCol],
		}
	})
}

async function getEvolutions(edition: string = "2024"): Promise<Evolution[]> {
	const raw = await fs.readFile(EVOLUTIONS_PATH(edition), { encoding: "utf-8" })
	return JSON.parse(raw).values
}

function levelupMoves(pokemon: PokemonData): Map<string, number[]> {
	const result = new Map<string, number[]>()
	for (const [level, key] of Object.entries(LEVEL_KEYS)) {
		for (const move of pokemon.moves[key] ?? []) {
			result.set(move, [...(result.get(move) ?? []), Number(level)])
		}
	}

	return result
}

// Level slots are omitted from the SRD when empty, so create them in canonical order if needed
function addMove(pokemon: PokemonData, key: LevelKey, move: string) {
	if (pokemon.moves[key] == null) {
		const { tm, egg, ...levels } = pokemon.moves
		pokemon.moves = Object.fromEntries([
			...Object.values(LEVEL_KEYS).map((k) => [k, k === key ? [] : levels[k]]).filter(([, moves]) => moves != null),
			...(tm != null ? [["tm", tm]] : []),
			...(egg != null ? [["egg", egg]] : []),
		]) as PokemonData["moves"]
	}

	pokemon.moves[key].push(move)
}

// Snapshot current 2024 level-up moves into the 2018 overrides, preserving 2024's pokemon order
function snapshotLegacyMovesets(allPokemon: PokemonData[], overrides: PokemonOverride[]): PokemonOverride[] {
	const overridesById = new Map(overrides.map((override) => [override.id, override]))
	const knownIds = new Set(allPokemon.map((pokemon) => pokemon.id))

	const result = allPokemon.map((pokemon): PokemonOverride => {
		const existing = overridesById.get(pokemon.id)
		if (existing?.moves != null) return existing

		const moves = Object.fromEntries(Object.values(LEVEL_KEYS)
			.filter((key) => pokemon.moves[key] != null)
			.map((key) => [key, [...pokemon.moves[key]]]))

		return { ...existing, id: pokemon.id, moves }
	})

	// Keep any overrides for ids 2024 does not know about, just in case
	return [...result, ...overrides.filter((override) => !knownIds.has(override.id))]
}

// A level slot added in 2024 would otherwise be inherited by 2018
function nullNewLegacySlots(allPokemon: PokemonData[], overrides: PokemonOverride[]): number {
	const overridesById = new Map(overrides.map((override) => [override.id, override]))
	let count = 0

	for (const pokemon of allPokemon) {
		const override = overridesById.get(pokemon.id)!
		for (const key of Object.values(LEVEL_KEYS)) {
			if (pokemon.moves[key] != null && override.moves![key] === undefined) {
				override.moves![key] = null
				count++
			}
		}

		// Keep slots in canonical order
		override.moves = Object.fromEntries(Object.values(LEVEL_KEYS)
			.filter((key) => override.moves![key] !== undefined)
			.map((key) => [key, override.moves![key]]))
	}

	return count
}

const SECTIONS = {
	unknownPokemon: "Unknown Pokémon in CSV",
	unknownMethod: "Unknown Method in CSV",
	invalidLevel: "Invalid Proposed Level",
	alreadyMissing: "Marked \"In Poke 5e Already\" but not in the SRD",
	alreadyWrongLevel: "Marked \"In Poke 5e Already\" but at a different level in the SRD",
	skippedExisting: "Skipped; move is already learned at a different level",
	evoMissingAdded: "Pre-evo learns a newly added move its evolution does not",
	evoMissingExisting: "Pre-evo learns a pre-existing move its evolution does not",
}

async function main() {
	const [rows, allPokemon, evolutions, legacyOverrides] = await Promise.all([getRows(), getPokemonSrd(), getEvolutions(), getPokemonOverrides("2018")])
	const legacy = snapshotLegacyMovesets(allPokemon, legacyOverrides)
	const pokemonById = new Map(allPokemon.map((pokemon) => [pokemon.id, pokemon]))
	const originalLevelups = new Map(allPokemon.map((pokemon) => [pokemon.id, levelupMoves(pokemon)]))
	const added = new Set<string>() // `${pokemon}:${move}`
	const report = new Report()

	for (const row of rows) {
		const label = `${row.pokemon}: ${row.move}`
		const pokemon = pokemonById.get(row.pokemon)
		if (pokemon == null) {
			report.add(SECTIONS.unknownPokemon, label)
			continue
		}

		const existingLevels = originalLevelups.get(row.pokemon)!.get(row.move)

		if (row.method === ALREADY) {
			if (existingLevels == null) {
				report.add(SECTIONS.alreadyMissing, `${label} (CSV says ${levelName(row.proposed)})`)
			} else if (!existingLevels.includes(row.proposed)) {
				report.add(SECTIONS.alreadyWrongLevel, `${label} (CSV says ${levelName(row.proposed)}; SRD has ${existingLevels.map(levelName).join(", ")})`)
			}
			continue
		}

		let level: number
		if (START_METHODS.includes(row.method)) {
			level = 0
		} else if (PROPOSED_METHODS.includes(row.method)) {
			level = row.proposed
		} else {
			report.add(SECTIONS.unknownMethod, `${label} (${row.method})`)
			continue
		}

		const key = LEVEL_KEYS[level]
		if (key == null) {
			report.add(SECTIONS.invalidLevel, `${label} (${row.method}; proposed ${row.proposed})`)
			continue
		}

		if (existingLevels != null) {
			report.add(SECTIONS.skippedExisting, `${label} (CSV proposes ${levelName(level)} via ${row.method}; SRD has ${existingLevels.map(levelName).join(", ")})`)
			continue
		}

		addMove(pokemon, key, row.move)
		added.add(`${row.pokemon}:${row.move}`)
	}

	for (const { from, to } of evolutions) {
		const preEvo = pokemonById.get(from)
		const evo = pokemonById.get(to)
		if (preEvo == null || evo == null) continue

		const evoMoves = levelupMoves(evo)
		for (const [move, levels] of levelupMoves(preEvo)) {
			if (evoMoves.has(move)) continue

			const line = `${from} -> ${to}: ${move} (${levels.map(levelName).join(", ")})`
			report.add(added.has(`${from}:${move}`) ? SECTIONS.evoMissingAdded : SECTIONS.evoMissingExisting, line)
		}
	}

	const nulledSlots = nullNewLegacySlots(allPokemon, legacy)
	await writePokemonOverrides(legacy, "2018")
	await writePokemonSrd(allPokemon)

	const summary = [
		"# Assign Moves Report",
		"",
		`Added ${added.size} level-up moves across ${new Set([...added].map((k) => k.split(":")[0])).size} Pokémon.`,
		"",
	].join("\n")
	await fs.writeFile(REPORT_PATH, `${summary}\n${report.toMarkdown(Object.values(SECTIONS))}`, { encoding: "utf-8" })

	superconsole.success(`Copied movesets to 2018 for ${legacy.length} pokemon (${nulledSlots} new slots nulled)`)
	superconsole.success(`Added ${added.size} level-up moves`)
	for (const section of Object.values(SECTIONS)) {
		const count = report.count(section)
		if (count > 0) superconsole.failure(`${section}: ${count}`)
	}
	superconsole.log(`Report written to ${REPORT_PATH}`)
}

main()