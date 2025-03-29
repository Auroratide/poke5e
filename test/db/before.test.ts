import { test, expect } from "vitest"
import { supabase, call, callAll, expectError } from "./supabase"
import { Iris, SunnyYellow } from "./stubs"

test("updating trainers", async () => {
	const {
		ret_id: trainerId,
		ret_read_key: readKey,
		ret_write_key: writeKey
	} = await call<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>("new_trainer", Iris())

	const canWrite = await call<number>("verify_write_key", {
		_id: trainerId,
		_write_key: writeKey,
	})
	
	expect(canWrite).toEqual(1)

	// Update
	await call("update_trainer", {
		_write_key: writeKey,
		...Iris(),
		_hp_cur: 44,
		_species: "Human",
		_gender: "Female",
		_age: 22,
		_home_region: "Unova",
		_background: "Thief",
		_money: 3000,
	})

	// Updating the avatar
	await call("new_trainer_avatar_filename", {
		_write_key: writeKey,
		_extension: ".png",
	})

	// Call twice to ensure most recent filename survives
	const avatarFilename = await call<string>("new_trainer_avatar_filename", {
		_write_key: writeKey,
		_extension: ".png",
	})

	// Assert
	const irisInfo = await call<any>("get_trainer", {
		_read_key: readKey,
	})

	expect(irisInfo.name).toEqual("Iris")
	expect(irisInfo.hp_cur).toEqual(44)
	expect(irisInfo.species).toEqual("Human")
	expect(irisInfo.gender).toEqual("Female")
	expect(irisInfo.age).toEqual(22)
	expect(irisInfo.home_region).toEqual("Unova")
	expect(irisInfo.background).toEqual("Thief")
	expect(irisInfo.avatar_filename).toEqual(avatarFilename)
	expect(irisInfo.money).toEqual(3000)

	// Cleanup
	await call("delete_trainer", {
		_write_key: writeKey,
		_id: trainerId,
	})
	await call<any>("get_trainer", {
		_read_key: readKey,
	}, {
		assertNull: true,
	})
})

test("updating pokemon", async () => {
	const {
		ret_id: trainerId,
		ret_read_key: readKey,
		ret_write_key: writeKey
	} = await call<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>("new_trainer", Iris())

	const pokemonId = await call<number>("add_pokemon", {
		_write_key: writeKey,
		...SunnyYellow(),
	})

	// Update
	await call("update_pokemon", {
		_write_key: writeKey,
		_id: pokemonId,
		...SunnyYellow(),
		_hp_cur: 45,
		_exp: 6200,
		_status: "Burned",
		_held_item: "Focus Sash",
		_is_shiny: true,
	})

	const [vivillon] = await callAll<any>("get_pokemon", {
		_trainer_id: trainerId,
	})

	expect(vivillon.nickname).toEqual("Sunny Yellow")
	expect(vivillon.hp_cur).toEqual(45)

	expect(vivillon.tera_type).toEqual("fairy")
	expect(vivillon.exp).toEqual(6200)
	expect(vivillon.status).toEqual("Burned")
	expect(vivillon.held_item).toEqual("Focus Sash")

	expect(vivillon.is_shiny).toEqual(true)

	// Cleanup
	await call("remove_pokemon", {
		_write_key: writeKey,
		_id: pokemonId,
	})
	await call("delete_trainer", {
		_write_key: writeKey,
		_id: trainerId,
	})
	const noMorePokemon = await callAll<any>("get_pokemon", {
		_trainer_id: trainerId,
	})
	expect(noMorePokemon.length).toEqual(0)
})

test("updating movesets", async () => {
	const {
		ret_id: trainerId,
		ret_read_key: readKey,
		ret_write_key: writeKey
	} = await call<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>("new_trainer", Iris())

	const pokemonId = await call<number>("add_pokemon", {
		_write_key: writeKey,
		...SunnyYellow(),
	})

	const psybeamId = await call<string>("add_move", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_move_id: "psybeem",
		_pp_cur: 10,
		_pp_max: 10,
		_notes: "",
	})

	const pounceId = await call<string>("add_move", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_move_id: "pounce",
		_pp_cur: 10,
		_pp_max: 10,
		_notes: "",
	})

	// Update
	await call("update_move", {
		_write_key: writeKey,
		_id: psybeamId,
		_move_id: "psybeam",
		_pp_cur: 9,
		_pp_max: 10,
		_notes: "",
	})

	// Assert
	const sunnyMoves = await callAll<any>("get_moveset", {
		_pokemon_id: pokemonId,
	})

	const psybeam = sunnyMoves.find((it) => it.move_id === "psybeam")
	const pounce = sunnyMoves.find((it) => it.move_id === "pounce")
	expect(psybeam?.pp_cur).toEqual(9)
	expect(pounce?.pp_cur).toEqual(10)

	// Cleanup
	await call("remove_move", {
		_write_key: writeKey,
		_id: psybeamId,
	})
	await call("remove_move", {
		_write_key: writeKey,
		_id: pounceId,
	})
	const noMoreMoves = await callAll<any>("get_moveset", {
		_pokemon_id: pokemonId,
	})

	expect(noMoreMoves.length).toEqual(0)

	await call("remove_pokemon", {
		_write_key: writeKey,
		_id: pokemonId,
	})
	await call("delete_trainer", {
		_write_key: writeKey,
		_id: trainerId,
	})
})

test("updating held items", async () => {
	const {
		ret_id: trainerId,
		ret_read_key: readKey,
		ret_write_key: writeKey
	} = await call<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>("new_trainer", Iris())

	const pokemonId = await call<number>("add_pokemon", {
		_write_key: writeKey,
		...SunnyYellow(),
	})

	const miracleSeedId = await call<string>("add_held_item", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_item_id: "miracle-seed",
		_custom_name: null,
		_description: null,
	})

	const customItemId = await call<string>("add_held_item", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_item_id: null,
		_custom_name: "Lustergem",
		_description: "Does something super cool."
	})

	// Update
	await call("update_held_item", {
		_write_key: writeKey,
		_id: miracleSeedId,
		_item_id: "lum-berry",
		_custom_name: null,
		_description: null,
	})

	await call("update_held_item", {
		_write_key: writeKey,
		_id: customItemId,
		_item_id: null,
		_custom_name: "Lustergem",
		_description: "The holder may use Luster Purge once per day.",
	})

	// Assert
	const sunnyItems = await callAll<any>("get_held_items", {
		_pokemon_id: pokemonId,
	})

	const lumBerry = sunnyItems.find((it) => it.item_id === "lum-berry")
	const customItem = sunnyItems.find((it) => it.custom_name === "Lustergem")
	expect(lumBerry).not.toBeUndefined()
	expect(customItem?.description).toEqual("The holder may use Luster Purge once per day.")

	// Cleanup
	await call("remove_held_item", {
		_write_key: writeKey,
		_id: miracleSeedId,
	})
	await call("remove_held_item", {
		_write_key: writeKey,
		_id: customItemId,
	})
	const noMoreItems = await callAll<any>("get_held_items", {
		_pokemon_id: pokemonId,
	})

	expect(noMoreItems.length).toEqual(0)

	await call("remove_pokemon", {
		_write_key: writeKey,
		_id: pokemonId,
	})
	await call("delete_trainer", {
		_write_key: writeKey,
		_id: trainerId,
	})
})

test("no direct access allowed", async () => {
	const UNAUTHORIZED_SCHEMA = "PGRST106"

	await expectError(UNAUTHORIZED_SCHEMA, async (supabase) =>
		supabase.schema("private").from("trainers").select()
	)

	await expectError(UNAUTHORIZED_SCHEMA, async (supabase) =>
		supabase.schema("private").from("trainers").insert({ name: "Iris" })
	)

	await expectError(UNAUTHORIZED_SCHEMA, async (supabase) =>
		supabase.schema("private").from("pokemon").select()
	)

	await expectError(UNAUTHORIZED_SCHEMA, async (supabase) =>
		supabase.schema("private").from("moves").select()
	)

	await expectError(UNAUTHORIZED_SCHEMA, async (supabase) =>
		supabase.schema("private").from("held_items").select()
	)
})

test("uploading files", async () => {
	const UNAUTHORIZED = "403"

	const {
		ret_write_key: writeKey
	} = await call<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>("new_trainer", Iris())

	const file = new File([], "my-file.png", {
		type: "image/png",
	})

	// Attempt to upload to an invalid key
	await expectError(UNAUTHORIZED, async (supabase) =>
		supabase.storage.from("trainer_avatars").upload("my-file.png", file)
	)

	// Get a valid key, then upload
	const avatarFilename = await call<string>("new_trainer_avatar_filename", {
		_write_key: writeKey,
		_extension: ".png",
	})

	const { error: uploadShouldSucceed } = await supabase.storage.from("trainer_avatars").upload(avatarFilename, file)

	expect(uploadShouldSucceed).toBeNull()

	// Attempt to override the uploaded file
	await expectError(UNAUTHORIZED, async (supabase) =>
		supabase.storage.from("trainer_avatars").update(avatarFilename, file)
	)

	// Attempt to delete a valid key
	const { data: deleteValidKeyResult } = await supabase.storage.from("trainer_avatars").remove([avatarFilename])

	expect(deleteValidKeyResult?.length).toEqual(0)

	// Get a new key, then delete the old one
	await call<string>("new_trainer_avatar_filename", {
		_write_key: writeKey,
		_extension: ".png",
	})

	const { data: deleteOldKeyResult } = await supabase.storage.from("trainer_avatars").remove([avatarFilename])

	expect(deleteOldKeyResult?.length).toEqual(1)
})
