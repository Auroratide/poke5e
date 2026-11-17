import pg from "pg"
import type { SupabaseClient } from "@supabase/supabase-js"
import { timeMany, type TimeManyResult } from "./time"
import { config } from "./config"

const at = <T>(list: T[], i: number): T => list[i % list.length]

function rpcCallers(supabase: SupabaseClient, sample: Sample): Record<string, (i: number) => PromiseLike<unknown>> {
	const rpc = async (fn: string, params: object) => {
		const { error } = await supabase.rpc(fn, params).select()
		if (error) {
			throw new Error(`${fn}: ${error.code} ${error.message}`, { cause: error })
		}
	}

	return {
		get_trainer: (i) => rpc("get_trainer", { _read_key: at(sample.trainers, i).read_key }),
		get_trainers: (i) => rpc("get_trainers", {
			_read_keys: Array.from({ length: 20 }, (_, j) => at(sample.trainers, i + j).read_key),
		}),
		get_pokemon: (i) => rpc("get_pokemon", { _trainer_id: at(sample.trainers, i).id }),
		get_trainer_movesets: (i) => rpc("get_trainer_movesets", { _trainer_id: at(sample.trainers, i).id }),
		get_trainer_held_items: (i) => rpc("get_trainer_held_items", { _trainer_id: at(sample.trainers, i).id }),
		get_trainer_pokemon_feats: (i) => rpc("get_trainer_pokemon_feats", { _trainer_id: at(sample.trainers, i).id }),
		get_inventory_items: (i) => rpc("get_inventory_items", { _read_key: at(sample.trainers, i).read_key }),
		get_trainer_feats: (i) => rpc("get_trainer_feats", { _read_key: at(sample.trainers, i).read_key }),
		get_moveset: (i) => rpc("get_moveset", { _pokemon_id: at(sample.pokemonIds, i) }),
		get_held_items: (i) => rpc("get_held_items", { _pokemon_id: at(sample.pokemonIds, i) }),
		get_pokemon_feats: (i) => rpc("get_pokemon_feats", { _pokemon_id: at(sample.pokemonIds, i) }),
		get_fakemon: (i) => rpc("get_fakemon", { _read_key: at(sample.fakemonReadKeys, i) }),
		get_fakemon_evolutions: (i) => rpc("get_fakemon_evolutions", { _fakemon_id: `F.${at(sample.fakemonReadKeys, i)}` }),
	}
}

export type RpcMeasurementReport = Record<string, TimeManyResult>

export async function measureAllRpcs(db: pg.Client, supabase: SupabaseClient): Promise<RpcMeasurementReport> {
	const sample = await takeSample(db)
	const rpcs = rpcCallers(supabase, sample)
	const report: RpcMeasurementReport = {}

	for (const [name, call] of Object.entries(rpcs)) {
		console.log(`Running ${name}...`)
		for (let i = 0; i < config.timing.warmup; ++i) {
			await call(i)
		}

		const result = await timeMany(config.timing.iterations, name, (i) => call(i))
		report[name] = result
	}

	return report
}

// used so we don't call RPCs with the same values every time, avoiding caching and such
type Sample = {
	trainers: { id: string, read_key: string }[],
	pokemonIds: number[],
	fakemonReadKeys: string[],
}

async function takeSample(db: pg.Client): Promise<Sample> {
	const trainers = await db.query<{ id: string, read_key: string }>(
		"SELECT id, read_key FROM private.trainers WHERE name LIKE $1 ORDER BY random() LIMIT 500",
		[`${config.seed.prefix}%`],
	)
	const pokemon = await db.query<{ id: number }>(
		"SELECT id FROM private.pokemon WHERE trainer_id = ANY($1::uuid[]) LIMIT 500",
		[trainers.rows.map((it) => it.id)],
	)
	const fakemon = await db.query<{ read_key: string }>(
		"SELECT read_key FROM private.fakemon WHERE species_name LIKE $1 ORDER BY random() LIMIT 500",
		[`${config.seed.prefix}%`],
	)

	return {
		trainers: trainers.rows,
		pokemonIds: pokemon.rows.map((it) => it.id),
		fakemonReadKeys: fakemon.rows.map((it) => it.read_key),
	}
}
