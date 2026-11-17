import type pg from "pg"
import { config } from "./config"

type Column = {
	column_name: string,
	data_type: string,
}

/**
 * Programatically get the list of columns so migrations do not
 * require rewriting the load tests all the time
 */
async function requiredColumns(client: pg.Client, table: string): Promise<Column[]> {
	const { rows } = await client.query<Column>(`
		SELECT column_name, data_type
		FROM information_schema.columns
		WHERE table_schema = 'private'
			AND table_name = $1
			AND is_nullable = 'NO'
			AND column_default IS NULL
			AND identity_generation IS NULL
			AND is_generated = 'NEVER'
		ORDER BY ordinal_position
	`, [table])

	return rows
}

function placeholderForColumnType(table: string, column: Column): string {
	switch (column.data_type) {
	case "integer":
	case "bigint":
	case "smallint":
	case "real":
	case "double precision":
	case "numeric":
		return "1"
	case "boolean":
		return "false"
	case "character varying":
	case "text":
		return "'load'"
	case "ARRAY":
	case "jsonb":
	case "json":
		return "'{}'"
	case "uuid":
		return "gen_random_uuid()"
	default:
		throw new Error(`No placeholder for ${table}.${column.column_name} (${column.data_type}); add one to seed.ts.`)
	}
}

async function columnsAndValues(client: pg.Client, table: string, overrides: Record<string, string>): Promise<{ columns: string, values: string }> {
	const values = new Map<string, string>()

	for (const column of await requiredColumns(client, table)) {
		values.set(column.column_name, placeholderForColumnType(table, column))
	}

	for (const [column, value] of Object.entries(overrides)) {
		values.set(column, value)
	}

	return {
		columns: [...values.keys()].map((it) => `"${it}"`).join(", "),
		values: [...values.values()].join(", "),
	}
}

const pick = (options: string[], index: string) =>
	`(ARRAY[${options.map((it) => `'${it}'`).join(", ")}])[1 + (${index} % ${options.length})]`

export async function countTrainers(client: pg.Client): Promise<number> {
	const { rows } = await client.query<{ count: string }>(
		"SELECT count(*) FROM private.trainers WHERE name LIKE $1",
		[`${config.seed.prefix}%`],
	)

	return Number(rows[0].count)
}

export async function countFakemon(client: pg.Client): Promise<number> {
	const { rows } = await client.query<{ count: string }>(
		"SELECT count(*) FROM private.fakemon WHERE species_name LIKE $1",
		[`${config.seed.prefix}%`],
	)

	return Number(rows[0].count)
}

export async function seedTrainers(client: pg.Client): Promise<void> {
	const count = await countTrainers(client)
	if (count === config.seed.trainers) {
		console.log(`  trainers already seeded (${count.toLocaleString()})`)
		return
	}

	if (count > 0) {
		throw new Error(`Found ${count} seeded trainers but expected ${config.seed.trainers}. Run \`pnpm supabase db reset\` first.`)
	}

	const trainer = await columnsAndValues(client, "trainers", {
		name: `'${config.seed.prefix}' || g`,
	})

	const pokemon = await columnsAndValues(client, "pokemon", {
		trainer_id: "t.id",
		species: pick(["pikachu", "eevee", "mimikyu", "sableye", "zubat", "ralts"], "i"),
		nickname: "'Pokemon ' || i",
		rank: "i",
	})

	const move = await columnsAndValues(client, "moves", {
		pokemon_id: "p.id",
		move_id: pick(["tackle", "ember", "psybeam", "shadow-claw", "play-rough", "night-shade"], "i"),
		pp_cur: "10",
		pp_max: "10",
		notes: "''",
		rank: "i",
	})

	const start = Date.now()

	for (let from = 1; from <= config.seed.trainers; from += config.seed.batchSize) {
		const to = Math.min(from + config.seed.batchSize - 1, config.seed.trainers)

		await client.query(`
			WITH t AS (
				INSERT INTO private.trainers (${trainer.columns})
				SELECT ${trainer.values} FROM generate_series(${from}, ${to}) g
				RETURNING id
			), inventory AS (
				INSERT INTO private.inventory_items (trainer_id, item_id, quantity, rank)
				SELECT t.id, ${pick(["potion", "poke-ball", "antidote", "repel", "escape-rope"], "i")}, 1 + (i % 5), i
				FROM t CROSS JOIN generate_series(1, ${config.seed.inventoryItemsPerTrainer}) i
			), trainer_feats AS (
				INSERT INTO private.trainer_feats (trainer_id, feat_name, description, is_custom, rank)
				SELECT t.id, ${pick(["Keen Mind", "Alert", "Lucky"], "i")}, NULL, false, i
				FROM t CROSS JOIN generate_series(1, ${config.seed.featsPerTrainer}) i
			), p AS (
				INSERT INTO private.pokemon (${pokemon.columns})
				SELECT ${pokemon.values}
				FROM t CROSS JOIN generate_series(1, ${config.seed.pokemonPerTrainer}) i
				RETURNING id
			), moves AS (
				INSERT INTO private.moves (${move.columns})
				SELECT ${move.values}
				FROM p CROSS JOIN generate_series(1, ${config.seed.movesPerPokemon}) i
			), held_items AS (
				INSERT INTO private.held_items (pokemon_id, item_id, rank)
				SELECT p.id, ${pick(["leftovers", "life-orb", "miracle-seed", "charcoal"], "i")}, i
				FROM p CROSS JOIN generate_series(1, ${config.seed.heldItemsPerPokemon}) i
			), pokemon_feats AS (
				INSERT INTO private.pokemon_feats (pokemon_id, feat_name, description, is_custom, rank)
				SELECT p.id, ${pick(["Extra Move", "Extra Type", "Hardy"], "i")}, NULL, false, i
				FROM p CROSS JOIN generate_series(1, ${config.seed.featsPerPokemon}) i
			)
			SELECT count(*) FROM t
		`)

		console.log(`  trainers ${to.toLocaleString()} / ${config.seed.trainers.toLocaleString()} (${secondsSince(start)}s)`)
	}
}

export async function seedFakemon(client: pg.Client): Promise<void> {
	const count = await countFakemon(client)
	if (count === config.seed.fakemon) {
		console.log(`  fakemon already seeded (${count.toLocaleString()})`)
		return
	}

	if (count > 0) {
		throw new Error(`Found ${count} seeded fakemon but expected ${config.seed.fakemon}. Run \`pnpm supabase db reset\` first.`)
	}

	const fakemon = await columnsAndValues(client, "fakemon", {
		species_name: `'${config.seed.prefix}' || g`,
	})

	const start = Date.now()
	await client.query(`
		INSERT INTO private.fakemon (${fakemon.columns})
		SELECT ${fakemon.values} FROM generate_series(1, ${config.seed.fakemon}) g
	`)
	console.log(`  fakemon ${config.seed.fakemon.toLocaleString()} (${secondsSince(start)}s)`)

	// handle evolutions
	await client.query(`
		WITH numbered AS (
			SELECT read_key, row_number() OVER (ORDER BY id) AS n
			FROM private.fakemon WHERE species_name LIKE $1
		)
		INSERT INTO private.fakemon_evolutions (from_id, to_id)
		SELECT 'F.' || a.read_key, 'F.' || b.read_key
		FROM numbered a JOIN numbered b ON b.n = a.n + 1
		WHERE a.n % 2 = 1 AND a.n <= ${config.seed.fakemonEvolutions * 2}
	`, [`${config.seed.prefix}%`])
	console.log(`  fakemon evolutions ${config.seed.fakemonEvolutions.toLocaleString()} (${secondsSince(start)}s)`)
}

export async function refreshDbAnalysis(client: pg.Client): Promise<void> {
	await client.query(`
		ANALYZE private.trainers, private.pokemon, private.moves, private.held_items,
			private.pokemon_feats, private.inventory_items, private.trainer_feats,
			private.fakemon, private.fakemon_evolutions
	`)
}

export async function tableSizes(client: pg.Client): Promise<Record<string, number>> {
	const { rows } = await client.query<{ relname: string, n_live_tup: string }>(`
		SELECT relname, n_live_tup FROM pg_stat_user_tables
		WHERE schemaname = 'private' ORDER BY relname
	`)

	return Object.fromEntries(rows.map((it) => [it.relname, Number(it.n_live_tup)]))
}

function secondsSince(start: number): string {
	return ((Date.now() - start) / 1000).toFixed(1)
}
