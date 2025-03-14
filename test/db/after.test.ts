import { Client } from "pg"
import { test, beforeEach, afterEach, expect } from "vitest"
import { env } from "./env"
import { call } from "./helpers"

const client = new Client({
	user: env.user,
	database: env.database,
	password: env.password,
	host: env.host,
	port: env.port,
})

beforeEach(async () => { await client.connect() })
afterEach(async () => { await client.end() })

test("migation is forward compatible", async () => {
	const [ [trainerId, readKey, writeKey] ] = await call(client, "new_trainer", [
		"Iris",
		"A trainer who loves colors.",
		6, 11, 50, 50, 6, 6,
		10, 16, 10, 13, 11, 15,
		false, true, false, true, false, false, false, false, false, true, false, false, true, false, true, false, false, false,
		false, true, false, false, false, true,
		// NEW FIELDS (species, gender, age, home_region, background)
		"Human", null, null, null, null
	])

	const [ [canWrite] ] = await call(client, "verify_write_key", [trainerId, writeKey])
	
	expect(canWrite).toEqual(1)

	const [ [pokemonId] ] = await call(client, "add_pokemon", [
		writeKey,
		"Sunny Yellow", "vivillon", ["bug", "flying"], "Quirky", 6, "female",
		12, 17, 16, 6, 14, 10,
		14, 66, 66, 6, 6,
		false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
		false, false, false, false, false, false,
		"shield-dust", "",
		"fairy", 5400, null, null,
		false
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
		"fairy", 6200, "Burned", "Focus Sash",
		true
	])

	await call(client, "update_trainer", [
		writeKey,
		"Iris", "A trainer who loves colors.",
		6, 11, 44, 50, 6, 6,
		10, 16, 10, 13, 11, 15,
		false, true, false, true, false, false, false, false, false, true, false, false, true, false, true, false, false, false,
		false, true, false, false, false, true,
		// NEW FIELDS (species, gender, age, home_region, background)
		"Human", "Female", 18, "Unova", "Thief"
	])

	const sunnyMoves = await call(client, "get_moveset", [pokemonId])
	const irisPokemon = await call(client, "get_pokemon", [trainerId])
	const [irisInfo] = await call(client, "get_trainer", [readKey])

	const psybeam = sunnyMoves.find((it) => it[2] === "psybeam")
	const pounce = sunnyMoves.find((it) => it[2] === "pounce")
	expect(psybeam?.[3]).toEqual("9")
	expect(pounce?.[3]).toEqual("10")
	
	expect(irisPokemon[0][3]).toEqual("Sunny Yellow")
	expect(irisPokemon[0][14]).toEqual("45")

	expect(irisPokemon[0][45], "fairy")
	expect(irisPokemon[0][46]).toEqual("6200")
	expect(irisPokemon[0][47]).toEqual("Burned")
	expect(irisPokemon[0][48]).toEqual("Focus Sash")

	expect(irisPokemon[0][49]).toEqual("t")

	expect(irisInfo[2]).toEqual("Iris")
	expect(irisInfo[6]).toEqual("44")
	// NEW FIELDS
	expect(irisInfo[40]).toEqual("Human")
	expect(irisInfo[41]).toEqual("Female")
	expect(irisInfo[42]).toEqual("18")
	expect(irisInfo[43]).toEqual("Unova")
	expect(irisInfo[44]).toEqual("Thief")

	await call(client, "remove_move", [writeKey, psybeamId])
	await call(client, "remove_move", [writeKey, pounceId])
	const noMoreMoves = await call(client, "get_moveset", [pokemonId])
	expect(noMoreMoves.length).toEqual(0)

	await call(client, "remove_pokemon", [writeKey, pokemonId])
	const noMorePokemon = await call(client, "get_pokemon", [trainerId])
	expect(noMorePokemon.length).toEqual(0)

	await call(client, "delete_trainer", [writeKey, trainerId])
	const noMoreTrainer = await call(client, "get_trainer", [readKey])
	expect(noMoreTrainer.length).toEqual(0)
})
