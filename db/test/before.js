import pg from "pg"
import assert from "node:assert"
import { env } from "../env.js"
import { call } from "./helpers.js"

export async function test() {
	const { Client } = pg
	const client = new Client({
		user: env.user,
		database: env.database,
		password: env.password,
		host: env.host,
		port: env.port,
	})

	await client.connect()

	let error = undefined

	try {
		const [ [trainerId, readKey, writeKey] ] = await call(client, "new_trainer", [
			"Iris",
			"A trainer who loves colors.",
			6, 11, 50, 50, 6, 6,
			10, 16, 10, 13, 11, 15,
			false, true, false, true, false, false, false, false, false, true, false, false, true, false, true, false, false, false,
			false, true, false, false, false, true,
		])

		const [ [canWrite] ] = await call(client, "verify_write_key", [trainerId, writeKey])

		assert.equal(canWrite, 1, "verify_write_key failed to verify")

		const [ [pokemonId] ] = await call(client, "add_pokemon", [
			writeKey,
			"Sunny Yellow", "vivillon", ["bug", "flying"], "Quirky", 6, "female",
			12, 17, 16, 6, 14, 10,
			14, 66, 66, 6, 6,
			false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
			false, false, false, false, false, false,
			"shield-dust", "",
			// NEW ARGS!
			"fairy", 5400, null, null
		])

		const [ [psybeamId] ] = await call(client, "add_move", [
			writeKey, pokemonId,
			"psybeam", 10, 10, ""
		])

		const [ [pounceId] ] = await call(client, "add_move", [
			writeKey, pokemonId,
			"pounce", 10, 10, ""
		])

		await call(client, "update_move", [
			writeKey, psybeamId,
			"psybeam", 9, 10, ""
		])

		await call(client, "update_pokemon", [
			writeKey, pokemonId,
			"vivillon", "Sunny Yellow", ["bug", "flying"], "Quirky", 6, "female",
			12, 17, 16, 6, 14, 10,
			14, 45, 66, 6, 6,
			false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
			false, false, false, false, false, false,
			"shield-dust", "",
			// NEW ARGS!
			"fairy", 6200, "Burned", "Focus Sash"
		])

		await call(client, "update_trainer", [
			writeKey,
			"Iris", "A trainer who loves colors.",
			6, 11, 44, 50, 6, 6,
			10, 16, 10, 13, 11, 15,
			false, true, false, true, false, false, false, false, false, true, false, false, true, false, true, false, false, false,
			false, true, false, false, false, true,
		])

		const sunnyMoves = await call(client, "get_moveset", [pokemonId])
		const irisPokemon = await call(client, "get_pokemon", [trainerId])
		const [irisInfo] = await call(client, "get_trainer", [readKey])

		assert.equal(sunnyMoves[0][2], "psybeam")
		assert.equal(sunnyMoves[0][3], 9, `expected 9 pp, but was ${sunnyMoves[0][3]}`)
		assert.equal(sunnyMoves[1][2], "pounce")
		assert.equal(sunnyMoves[1][3], 10, `expected 10 pp, but was ${sunnyMoves[1][3]}`)
		
		assert.equal(irisPokemon[0][3], "Sunny Yellow")
		assert.equal(irisPokemon[0][14], 45, `expected 45 hp, but was ${irisPokemon[0][14]}`)

		// NEW ARGS
		assert.equal(irisPokemon[0][45], "fairy")
		assert.equal(irisPokemon[0][46], 6200, `expected 6200 exp, but was ${irisPokemon[0][45]}`)
		assert.equal(irisPokemon[0][47], "Burned")
		assert.equal(irisPokemon[0][48], "Focus Sash")
		// END NEW ARGS

		assert.equal(irisInfo[2], "Iris")
		assert.equal(irisInfo[6], 44, `expected 44 hp, but was ${irisInfo[6]}`)

		await call(client, "remove_move", [writeKey, psybeamId])
		await call(client, "remove_move", [writeKey, pounceId])
		const noMoreMoves = await call(client, "get_moveset", [pokemonId])
		assert.equal(noMoreMoves.length, 0, `Expected moves to be deleted, but got: ${noMoreMoves}`)

		await call(client, "remove_pokemon", [writeKey, pokemonId])
		const noMorePokemon = await call(client, "get_pokemon", [trainerId])
		assert.equal(noMorePokemon.length, 0, `Expected pokemon to be deleted, but got: ${noMorePokemon}`)

		await call(client, "delete_trainer", [writeKey, trainerId])
		const noMoreTrainer = await call(client, "get_trainer", [readKey])
		assert.equal(noMoreTrainer.length, 0, `Expected trainer to be deleted, but got: ${noMoreTrainer}`)
	} catch (e) {
		error = e
	} finally {
		await client.end()
	}

	if (error != null) {
		throw error
	} else {
		console.log("Migration Test Succeeded!")
	}
}
