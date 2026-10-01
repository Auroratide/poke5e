import path from "node:path"
import fs from "node:fs/promises"
import { getMoveSrd, type MoveSrdData } from "./files.ts"
import { getPokemonSrd, type PokemonData } from "../pokemon/files.ts"
import { superconsole } from "../superconsole.ts"

const CACHE_FOLDER = path.join(import.meta.dirname, "cache")
const CHART_FILE = path.join(CACHE_FOLDER, "move-consistency.csv")
const TMS_FILE = path.join("src", "lib", "srd", "data", "2024", "tms", "en.json")

const ATTRIBUTES = ["str", "dex", "con", "int", "wis", "cha"]

const HEADER = [
	"move", "type", ...ATTRIBUTES, "melee", "ranged", "aoe", "attack", "save", "damage",
	"level-learners", "tm-learners", "egg-learners",
]

type Learners = { level: number, tm: number, egg: number }

type TmData = { id: number, cost: number, move: string }

const getTmSrd = async (): Promise<TmData[]> => {
	const raw = await fs.readFile(TMS_FILE, { encoding: "utf-8" })

	return JSON.parse(raw).values
}

/** Counts how many pokemon learn each move by level, by TM, and by egg. */
const countLearners = (moves: MoveSrdData[], pokemon: PokemonData[], tms: TmData[]): Record<string, Learners> => {
	const counts: Record<string, Learners> = Object.fromEntries(moves.map((move) => [move.id, { level: 0, tm: 0, egg: 0 }]))
	const tmToMove: Record<number, string> = Object.fromEntries(tms.map((tm) => [tm.id, tm.move]))

	for (const { moves: learnset } of pokemon) {
		const { tm = [], egg = [], ...levels } = learnset

		new Set(Object.values(levels).flat()).forEach((id) => { if (counts[id]) counts[id].level++ })
		new Set(tm.map((id) => tmToMove[id])).forEach((id) => { if (counts[id]) counts[id].tm++ })
		new Set(egg).forEach((id) => { if (counts[id]) counts[id].egg++ })
	}

	return counts
}

const flag = (value: boolean) => value ? 1 : 0

const rowOf = (move: MoveSrdData, learners: Learners): (string | number)[] => {
	const powers = Array.isArray(move.power) ? move.power : [move.power]

	return [
		move.id,
		move.type,
		...ATTRIBUTES.map((attribute) => flag(powers.includes(attribute))),
		flag(move.range.type === "melee"),
		flag(move.range.type === "distance"),
		flag(move.shape != null),
		move.attack?.scope ?? "",
		move.save?.attribute ?? "",
		move.dice?.class ?? "",
		learners.level,
		learners.tm,
		learners.egg,
	]
}

/**
 * Create a move-consistency.csv file in the cache with a row for each move with the following columns:
 *
 * move,type,str,dex,con,int,wis,cha,melee,ranged,aoe,attack,save,damage,level-learners,tm-learners,egg-learners
 * ancient-power,rock,1,1,0,0,0,0,1,0,0,melee,,60,40,0,15
 *
 * For str-cha, 0 means it isn't one of the move powers, and 1 means it is.
 * For melee, ranged, or aoe, 1 means it is, and 0 means it isn't.
 * For attack, it is either melee, ranged, or empty
 * For save, it is the name of the attribute, or empty
 * For damage, it is the damage class used, or custom
 * For level-learners, tm-learners, and egg-learners, this is the number of pokemon that learn the move
 */
async function main() {
	const moves = await getMoveSrd()
	const pokemon = await getPokemonSrd()
	const tms = await getTmSrd()

	const learners = countLearners(moves, pokemon, tms)
	const rows = moves.map((move) => rowOf(move, learners[move.id]))

	const csv = [HEADER, ...rows].map((row) => row.join(",")).join("\n") + "\n"

	await fs.mkdir(CACHE_FOLDER, { recursive: true })
	await fs.writeFile(CHART_FILE, csv, { encoding: "utf-8" })

	superconsole.success(`Charted ${moves.length} moves in ${CHART_FILE}!`)
}

main()
