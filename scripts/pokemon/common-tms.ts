import path from "node:path"
import fs from "node:fs/promises"
import { getPokemonData } from "./files.ts"
import { superconsole } from "../superconsole.ts"

/**
 * This script finds the "universal TMs": TMs that virtually every pokemon learns.
 *
 * It looks at pokemon up to number 809 and at TMs 1-100 only. Pokemon that learn
 * no TMs at all (eg. Caterpie) are ignored entirely, since they'd otherwise count
 * against every TM equally without saying anything about that TM. A TM is
 * considered universal if at least 90% of the remaining pokemon learn it.
 */

const MAX_POKEMON_NUMBER = 809
const MIN_TM = 1
const MAX_TM = 100
const UNIVERSAL_THRESHOLD = 0.9

type TmData = {
	id: number,
	move: string,
}

async function getTmMoves(): Promise<Map<number, string>> {
	const raw = await fs.readFile(path.join("static", "data", "tms.json"), { encoding: "utf-8" })
	const tms: TmData[] = JSON.parse(raw).tms

	return new Map(tms.map((tm) => [tm.id, tm.move]))
}

async function main() {
	const pokemon = await getPokemonData()
	const tmMoves = await getTmMoves()

	const considered = pokemon
		.filter((p) => p.number <= MAX_POKEMON_NUMBER)
		.filter((p) => p.moves.tm.length > 0)

	const total = considered.length

	const missing = new Map<number, string[]>()
	for (let tm = MIN_TM; tm <= MAX_TM; ++tm) {
		missing.set(tm, [])
	}

	for (const p of considered) {
		const learned = new Set(p.moves.tm)
		for (const [tm, list] of missing) {
			if (!learned.has(tm)) list.push(p.name)
		}
	}

	const universal = [...missing]
		.filter(([, list]) => (total - list.length) / total >= UNIVERSAL_THRESHOLD)
		.sort(([, a], [, b]) => a.length - b.length)

	superconsole.log(`Considering ${total} pokemon (number <= ${MAX_POKEMON_NUMBER}, at least one TM).`)
	superconsole.log(`Universal TMs (learned by ${UNIVERSAL_THRESHOLD * 100}% or more): ${universal.length}`)
	superconsole.log("")

	for (const [tm, list] of universal) {
		const percent = ((total - list.length) / total * 100).toFixed(1)
		superconsole.success(`TM${tm} (${tmMoves.get(tm) ?? "???"}) -- ${total - list.length}/${total} (${percent}%)`)
		superconsole.log(list.length === 0
			? "  learned by all"
			: `  not learned by (${list.length}): ${list.join(", ")}`)
		superconsole.log("")
	}
}

main()
