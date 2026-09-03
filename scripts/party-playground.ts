// Party/Box playground for the pokemon_box migration.
//
// Drives the real RPCs (add_pokemon, reorder_pokemon, set_pokemon_storage,
// remove_pokemon) against the local supabase and prints rank/storage after
// every command, so you can watch what the migration actually does to the
// rows as you deposit, withdraw and reorder.
//
// Creates a scratch trainer on start and deletes it on quit.
//
//   pnpm services:start
//   node scripts/party-playground.ts

import readline from "node:readline/promises"
import { stdin, stdout } from "node:process"
import chalk from "chalk"

const URL = "http://127.0.0.1:54321"
const STUDIO = "http://127.0.0.1:54323"
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

const DEFAULT_NAMES = ["Aster", "Basil", "Cedar", "Dahlia", "Ember", "Fennel"]

type Pokemon = {
	id: number,
	nickname: string,
	storage: string,
	rank: number,
}

type Trainer = {
	id: string,
	readKey: string,
	writeKey: string,
}

type ListName = "party" | "box" | "all"

// ---------------------------------------------------------------- rpc

async function rpc<T>(name: string, args?: Record<string, unknown>): Promise<T> {
	const res = await fetch(`${URL}/rest/v1/rpc/${name}`, {
		method: "POST",
		headers: {
			apikey: KEY,
			Authorization: `Bearer ${KEY}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(args ?? {}),
	})

	const text = await res.text()
	let body: any = null
	try { body = text ? JSON.parse(text) : null } catch { body = text }

	if (!res.ok) throw new Error(body?.message ?? text ?? `HTTP ${res.status}`)

	return body as T
}

const one = <T>(r: T | T[]): T => (Array.isArray(r) ? r[0] : r)

// ---------------------------------------------------------------- fixtures

const ScratchTrainer = () => ({
	_name: "Playground Trainer", _description: "Scratch trainer for box testing.",
	_level: 6, _ac: 11, _hp_cur: 50, _hp_max: 50, _hit_dice_cur: 6, _hit_dice_max: 6,
	_strength: 10, _dexterity: 16, _constitution: 10, _intelligence: 13, _wisdom: 11, _charisma: 15,
	_save_str: false, _save_dex: true, _save_con: false, _save_int: false, _save_wis: false, _save_cha: true,
	_species: "Human", _gender: null, _age: null, _home_region: null, _background: null, _money: 0,
	_special_normal: 0, _special_fighting: 0, _special_flying: 0, _special_poison: 0, _special_ground: 0,
	_special_rock: 0, _special_bug: 0, _special_ghost: 0, _special_steel: 0, _special_fire: 0,
	_special_water: 0, _special_grass: 1, _special_electric: 0, _special_psychic: 0, _special_ice: 0,
	_special_dragon: 0, _special_dark: 0, _special_fairy: 0,
	_path_name: "Nurse", _path_resource: 3,
	_path_rank_1_name: "", _path_rank_1_desc: "", _path_rank_2_name: "", _path_rank_2_desc: "",
	_path_rank_3_name: "", _path_rank_3_desc: "", _path_rank_4_name: "", _path_rank_4_desc: "",
	_rank_athletics: 0, _rank_acrobatics: 2, _rank_sleight_of_hand: 0, _rank_stealth: 1,
	_rank_arcana: 0, _rank_history: 0, _rank_investigation: 0, _rank_nature: 0, _rank_religion: 0,
	_rank_animal_handling: 1, _rank_insight: 0, _rank_medicine: 0, _rank_perception: 0,
	_rank_survival: 0, _rank_deception: 1, _rank_intimidation: 0, _rank_performance: 0, _rank_persuasion: 0,
})

const Mon = (nickname: string, rank: number) => ({
	_nickname: nickname, _species: "vivillon", _nature: "Quirky", _type: ["bug", "flying"],
	_level: 6, _gender: "female",
	_strength: 12, _dexterity: 17, _constitution: 16, _intelligence: 6, _wisdom: 14, _charisma: 10,
	_ac: 14, _hp_cur: 66, _hp_max: 66, _hit_dice_cur: 6, _hit_dice_max: 6,
	_save_str: false, _save_dex: false, _save_con: false, _save_int: false, _save_wis: false, _save_cha: false,
	_ability: "shield-dust", _abilities: [], _notes: "", _tera_type: "fairy", _exp: 5400,
	_status: null, _held_item: null, _is_shiny: false, _custom_size: null, _hit_dice_size: null,
	_speed_walking: null, _speed_climbing: null, _speed_swimming: null, _speed_flying: null,
	_speed_hover: null, _speed_burrowing: null,
	_sense_darkvision: null, _sense_blindsight: null, _sense_tremorsense: null, _sense_truesight: null,
	_bond_level: 0, _bond_points_cur: 0, _bond_points_max: 0,
	_rank_athletics: 0, _rank_acrobatics: 2, _rank_sleight_of_hand: 0, _rank_stealth: 0,
	_rank_arcana: 0, _rank_history: 0, _rank_investigation: 0, _rank_nature: 0, _rank_religion: 0,
	_rank_animal_handling: 0, _rank_insight: 0, _rank_medicine: 0, _rank_perception: 0,
	_rank_survival: 0, _rank_deception: 0, _rank_intimidation: 0, _rank_performance: 0, _rank_persuasion: 1,
	_rank: rank, _stab_base: "default", _stab_bonus: 0,
})

// ---------------------------------------------------------------- state

let trainer: Trainer | null = null

const active = (): Trainer => {
	if (trainer == null) throw new Error("no trainer — try `reset`")
	return trainer
}

// get_pokemon does the ORDER BY rank, nickname, so the array order here is
// exactly the order the app would render. Never re-sort it client side.
const fetchAll = () => rpc<Pokemon[]>("get_pokemon", { _trainer_id: active().id })

const party = (rows: Pokemon[]) => rows.filter((it) => it.storage === "party")
const box = (rows: Pokemon[]) => rows.filter((it) => it.storage === "box")

async function createTrainer(names: string[] = DEFAULT_NAMES) {
	const t = one(await rpc<any>("new_trainer", ScratchTrainer()))
	trainer = { id: t.ret_id, readKey: t.ret_read_key, writeKey: t.ret_write_key }

	for (let i = 0; i < names.length; i++) {
		await rpc("add_pokemon", { _write_key: trainer.writeKey, ...Mon(names[i], i + 1) })
	}
}

async function destroyTrainer() {
	if (trainer == null) return
	await rpc("delete_trainer", { _write_key: trainer.writeKey, _id: trainer.id })
	trainer = null
}

// ---------------------------------------------------------------- rendering

function renderList(label: string, prefix: string, rows: Pokemon[], prev?: Pokemon[]): string[] {
	const lines = [chalk.bold(label) + chalk.dim(`  (${rows.length})`)]

	if (rows.length === 0) {
		lines.push(chalk.dim("    (empty)"))
		return lines
	}

	// Duplicate ranks *within one list* are what make the displayed order
	// depend on nickname instead of rank.
	const seen = new Map<number, number>()
	rows.forEach((r) => seen.set(r.rank, (seen.get(r.rank) ?? 0) + 1))

	rows.forEach((r, i) => {
		const was = prev?.find((p) => p.id === r.id)
		const notes: string[] = []

		if (was && was.rank !== r.rank) notes.push(chalk.green(`rank ${was.rank}→${r.rank}`))
		if (was && was.storage !== r.storage) notes.push(chalk.cyan(`${was.storage}→${r.storage}`))
		if (!was && prev) notes.push(chalk.green("new"))
		if ((seen.get(r.rank) ?? 0) > 1) notes.push(chalk.red(`⚠ rank ${r.rank} tied — order decided by nickname`))

		const tag = `${prefix}${i + 1}`.padEnd(4)
		const rank = String(r.rank).padStart(3)
		const name = r.nickname.padEnd(12)
		lines.push(`    ${chalk.bold(tag)} rank=${rank}  id=${String(r.id).padEnd(5)} ${name} ${notes.join("  ")}`)
	})

	return lines
}

function render(rows: Pokemon[], prev?: Pokemon[]) {
	const out: string[] = []
	out.push("")
	out.push(...renderList("PARTY", "P", party(rows), prev))
	out.push("")
	out.push(...renderList("BOX", "B", box(rows), prev))

	const gone = (prev ?? []).filter((p) => !rows.some((r) => r.id === p.id))
	if (gone.length > 0) {
		out.push("")
		out.push(chalk.dim(`    removed: ${gone.map((g) => g.nickname).join(", ")}`))
	}

	out.push("")
	console.log(out.join("\n"))
}

// ---------------------------------------------------------------- selection

/** Accepts P2 / B1 / a bare number (against `listHint`) / a name prefix. */
function resolve(token: string, rows: Pokemon[], listHint?: ListName): Pokemon {
	const t = token.trim()
	const m = /^([pb])(\d+)$/i.exec(t)

	if (m) {
		const list = m[1].toLowerCase() === "p" ? party(rows) : box(rows)
		const hit = list[Number(m[2]) - 1]
		if (!hit) throw new Error(`no such slot: ${t}`)
		return hit
	}

	if (/^\d+$/.test(t)) {
		const list = listHint === "box" ? box(rows) : listHint === "party" ? party(rows) : rows
		const hit = list[Number(t) - 1]
		if (!hit) throw new Error(`no such slot: ${t}`)
		return hit
	}

	const matches = rows.filter((r) => r.nickname.toLowerCase().startsWith(t.toLowerCase()))
	if (matches.length === 0) throw new Error(`no pokemon matching "${t}"`)
	if (matches.length > 1) throw new Error(`"${t}" is ambiguous: ${matches.map((r) => r.nickname).join(", ")}`)
	return matches[0]
}

// ---------------------------------------------------------------- commands

const HELP = `
${chalk.bold("state")}
  ls                      show both lists (rank + storage, straight from get_pokemon)
  keys                    print trainer id / read key / write key

${chalk.bold("moving between storages")}   → set_pokemon_storage
  box <sel>               deposit into the box
  party <sel>             withdraw into the party

${chalk.bold("reordering")}                → reorder_pokemon
  order party <sel...>    send ONLY the party ids, in this order  (what the box UI will do)
  order box <sel...>      send ONLY the box ids, in this order
  order all <sel...>      send every id at once                   (what today's app does)

${chalk.bold("roster")}
  add <name>              add_pokemon with _rank = MAX(rank) + 1
  rm <sel>                remove_pokemon
  reset [n]               delete the trainer and start over with n pokemon (default 6)

${chalk.bold("scenarios")}
  scenario collide        deposit, reorder the party, deposit again — the sequence
                          that used to tie two box ranks together
  scenario oldclient      box one, then reorder as a pre-box client would

${chalk.bold("other")}
  help                    this
  quit                    delete the trainer and exit

${chalk.dim("<sel> is a slot (P2, B1), a bare number, or a name prefix (ced).")}
`

async function reorder(listName: ListName, tokens: string[], rows: Pokemon[]) {
	const pool = listName === "party" ? party(rows) : listName === "box" ? box(rows) : rows

	const picked = tokens.map((t) => resolve(t, rows, listName))
	const ids = picked.map((p) => p.id)

	if (new Set(ids).size !== ids.length) throw new Error("the same pokemon was listed twice")

	if (ids.length !== pool.length) {
		console.log(chalk.yellow(`  note: sending ${ids.length} of the ${pool.length} id(s) in "${listName}" — reorder_pokemon renumbers only what it is given`))
	}

	await rpc("reorder_pokemon", { _write_key: active().writeKey, _ids: ids })
}

async function scenarioCollide() {
	const rows = await fetchAll()
	const p = party(rows)
	if (p.length < 4) throw new Error("need at least 4 in the party — try `reset 6`")

	const [a, b, c, d] = p

	console.log(chalk.dim(`  deposit ${b.nickname} (rank ${b.rank})`))
	await rpc("set_pokemon_storage", { _write_key: active().writeKey, _id: b.id, _storage: "box" })

	console.log(chalk.dim(`  reorder party → ${[d, c, a].map((x) => x.nickname).join(", ")}`))
	await rpc("reorder_pokemon", { _write_key: active().writeKey, _ids: [d.id, c.id, a.id] })

	console.log(chalk.dim(`  deposit ${c.nickname} (now rank 2 after the reorder)`))
	await rpc("set_pokemon_storage", { _write_key: active().writeKey, _id: c.id, _storage: "box" })
}

async function scenarioOldClient() {
	const rows = await fetchAll()
	const p = party(rows)
	if (p.length < 3) throw new Error("need at least 3 in the party — try `reset 6`")

	console.log(chalk.dim(`  deposit ${p[1].nickname}`))
	await rpc("set_pokemon_storage", { _write_key: active().writeKey, _id: p[1].id, _storage: "box" })

	const after = await fetchAll()
	console.log(chalk.dim("  a pre-box client sees every row as party and reorders all of them"))
	await rpc("reorder_pokemon", {
		_write_key: active().writeKey,
		_ids: [...after].reverse().map((it) => it.id),
	})
}

async function run(line: string): Promise<"quit" | void> {
	const [cmd, ...args] = line.trim().split(/\s+/)
	const rows = await fetchAll()

	switch ((cmd ?? "").toLowerCase()) {
		case "":
		case "ls":
			render(rows)
			return

		case "help":
		case "?":
			console.log(HELP)
			return

		case "keys": {
			const t = active()
			console.log(`\n  trainer id  ${t.id}\n  read key    ${t.readKey}\n  write key   ${t.writeKey}\n  studio      ${STUDIO}\n`)
			return
		}

		case "box":
		case "party": {
			if (args.length === 0) throw new Error(`usage: ${cmd} <sel>`)
			const target = resolve(args[0], rows)
			const affected = await rpc<number>("set_pokemon_storage", {
				_write_key: active().writeKey,
				_id: target.id,
				_storage: cmd,
			})
			console.log(chalk.dim(`  set_pokemon_storage → ${affected} row(s)`))
			break
		}

		case "order": {
			const list = (args[0] ?? "").toLowerCase()
			if (list !== "party" && list !== "box" && list !== "all") throw new Error("usage: order party|box|all <sel...>")
			if (args.length < 2) throw new Error("usage: order party|box|all <sel...>")
			await reorder(list, args.slice(1), rows)
			break
		}

		case "add": {
			const name = args.join(" ") || `Mon${rows.length + 1}`
			const nextRank = rows.reduce((max, r) => Math.max(max, r.rank), 0) + 1
			await rpc("add_pokemon", { _write_key: active().writeKey, ...Mon(name, nextRank) })
			console.log(chalk.dim(`  add_pokemon with _rank = ${nextRank}`))
			break
		}

		case "rm": {
			if (args.length === 0) throw new Error("usage: rm <sel>")
			const target = resolve(args[0], rows)
			await rpc("remove_pokemon", { _write_key: active().writeKey, _id: target.id })
			break
		}

		case "reset": {
			const n = Math.min(Math.max(Number(args[0] ?? 6) || 6, 1), 12)
			await destroyTrainer()
			await createTrainer(DEFAULT_NAMES.slice(0, n).concat(
				Array.from({ length: Math.max(0, n - DEFAULT_NAMES.length) }, (_, i) => `Mon${i + 7}`),
			))
			render(await fetchAll())
			return
		}

		case "scenario": {
			const which = (args[0] ?? "").toLowerCase()
			if (which === "collide") await scenarioCollide()
			else if (which === "oldclient") await scenarioOldClient()
			else throw new Error("usage: scenario collide|oldclient")
			break
		}

		case "quit":
		case "exit":
		case "q":
			return "quit"

		default:
			throw new Error(`unknown command: ${cmd} (try "help")`)
	}

	render(await fetchAll(), rows)
}

// ---------------------------------------------------------------- main

async function main() {
	try {
		await rpc("get_pokemon", { _trainer_id: "00000000-0000-0000-0000-000000000000" })
	} catch (e) {
		console.error(chalk.red(`Could not reach supabase at ${URL} — is \`pnpm services:start\` running?`))
		console.error(chalk.dim(String((e as Error).message)))
		process.exit(1)
	}

	console.log(chalk.bold("\n  party/box playground") + chalk.dim("  —  a scratch trainer, deleted on quit"))
	await createTrainer()
	console.log(HELP)
	render(await fetchAll())

	// A pipe delivers every line at once, which readline's prompt loop drops.
	// Drain it up front instead and replay the commands; the prompt loop is
	// only for a real terminal.
	if (stdin.isTTY) {
		const rl = readline.createInterface({ input: stdin, output: stdout })
		rl.on("SIGINT", () => rl.close())

		for (;;) {
			let line: string
			try {
				line = await rl.question("box> ")
			} catch {
				break // closed
			}

			try {
				if (await run(line) === "quit") break
			} catch (e) {
				console.log(chalk.red(`  ${(e as Error).message}`))
			}
		}

		rl.close()
	} else {
		let piped = ""
		for await (const chunk of stdin) piped += chunk

		for (const line of piped.split("\n")) {
			if (line.trim() === "") continue
			console.log(`box> ${line}`)
			try {
				if (await run(line) === "quit") break
			} catch (e) {
				console.log(chalk.red(`  ${(e as Error).message}`))
			}
		}
	}

	await destroyTrainer()
	console.log(chalk.dim("\n  trainer deleted. bye.\n"))
}

// Never leave a scratch trainer behind if something throws mid-command.
main().catch(async (e) => {
	console.error(chalk.red(`\n  ${(e as Error).message}`))
	try { await destroyTrainer() } catch { /* best effort */ }
	process.exit(1)
})
