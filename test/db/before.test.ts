import { expect, test } from "vitest"
import { Iris, SunnyYellow } from "./stubs"
import { call, callAll, expectError, supabase } from "./supabase"

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
	const IrisUpdated = () => ({
		...Iris(),
		_hp_cur: 44,
		_species: "Human",
		_gender: "Female",
		_age: 22,
		_home_region: "Unova",
		_background: "Thief",
		_money: 3000,
		_special_normal: 0,
		_special_fighting: 0,
		_special_flying: 0,
		_special_poison: 0,
		_special_ground: 0,
		_special_rock: 0,
		_special_bug: 0,
		_special_ghost: 0,
		_special_steel: 0,
		_special_fire: 0,
		_special_water: 0,
		_special_grass: 1,
		_special_electric: 0,
		_special_psychic: 0,
		_special_ice: 0,
		_special_dragon: 0,
		_special_dark: 0,
		_special_fairy: 0,
		_path_name: "Nurse",
		_path_resource: 3,
		_path_rank_1_name: "",
		_path_rank_1_desc: "",
		_path_rank_2_name: "",
		_path_rank_2_desc: "",
		_path_rank_3_name: "",
		_path_rank_3_desc: "",
		_path_rank_4_name: "",
		_path_rank_4_desc: "",
	})

	await call("update_trainer", {
		_write_key: writeKey,
		...IrisUpdated(),
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
	expect(irisInfo.special_grass).toEqual(1)
	expect(irisInfo.path_name).toEqual("Nurse")
	expect(irisInfo.path_resource).toEqual(3)

	// Custom Trainer Path
	await call("update_trainer", {
		_write_key: writeKey,
		...IrisUpdated(),
		_path_name: "Flower Girl",
		_path_resource: 0,
		_path_rank_1_name: "Lily",
		_path_rank_1_desc: "Lily Ability",
		_path_rank_2_name: "Tulip",
		_path_rank_2_desc: "Tulip Ability",
		_path_rank_3_name: "Sunflower",
		_path_rank_3_desc: "Sunflower Ability",
		_path_rank_4_name: "Rose",
		_path_rank_4_desc: "Rose Ability",
	})

	const irisInfoCustomPath = await call<any>("get_trainer", {
		_read_key: readKey,
	})

	expect(irisInfoCustomPath.path_name).toEqual("Flower Girl")
	expect(irisInfoCustomPath.path_resource).toEqual(0)
	expect(irisInfoCustomPath.path_rank_1_name).toEqual("Lily")
	expect(irisInfoCustomPath.path_rank_1_desc).toEqual("Lily Ability")
	expect(irisInfoCustomPath.path_rank_2_name).toEqual("Tulip")
	expect(irisInfoCustomPath.path_rank_2_desc).toEqual("Tulip Ability")
	expect(irisInfoCustomPath.path_rank_3_name).toEqual("Sunflower")
	expect(irisInfoCustomPath.path_rank_3_desc).toEqual("Sunflower Ability")
	expect(irisInfoCustomPath.path_rank_4_name).toEqual("Rose")
	expect(irisInfoCustomPath.path_rank_4_desc).toEqual("Rose Ability")

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

test("updating trainer inventory", async () => {
	const {
		ret_id: trainerId,
		ret_read_key: readKey,
		ret_write_key: writeKey
	} = await call<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>("new_trainer", Iris())

	const potionId = await call<string>("add_inventory_item", {
		_write_key: writeKey,
		_item_id: "potion",
		_quantity: 1,
		_custom_name: null,
		_description: null,
		_rank: 0,
	})

	const customItemId = await call<string>("add_inventory_item", {
		_write_key: writeKey,
		_item_id: null,
		_quantity: 1,
		_custom_name: "Lustergem",
		_description: "Does something super cool.",
		_rank: 1,
	})

	// Update
	await call("update_inventory_item", {
		_write_key: writeKey,
		_id: potionId,
		_item_id: "potion",
		_quantity: 2,
		_custom_name: null,
		_description: null,
		_rank: 1,
	})

	await call("update_inventory_item", {
		_write_key: writeKey,
		_id: customItemId,
		_item_id: null,
		_quantity: 1,
		_custom_name: "Lustergem",
		_description: "The holder may use Luster Purge once per day.",
		_rank: 0,
	})

	// Assert
	const irisItems = await callAll<any>("get_inventory_items", {
		_read_key: readKey,
	})

	const potion = irisItems[1]
	const customItem = irisItems[0]
	expect(potion?.item_id).toEqual("potion")
	expect(potion?.quantity).toEqual(2)
	expect(customItem?.custom_name).toEqual("Lustergem")
	expect(customItem?.description).toEqual("The holder may use Luster Purge once per day.")

	// Cleanup
	await call("remove_inventory_item", {
		_write_key: writeKey,
		_id: potionId,
	})
	await call("remove_inventory_item", {
		_write_key: writeKey,
		_id: customItemId,
	})
	const noMoreItems = await callAll<any>("get_inventory_items", {
		_read_key: readKey,
	})

	expect(noMoreItems.length).toEqual(0)

	await call("delete_trainer", {
		_write_key: writeKey,
		_id: trainerId,
	})
})

test("updating feats", async () => {
	const {
		ret_id: trainerId,
		ret_read_key: readKey,
		ret_write_key: writeKey
	} = await call<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>("new_trainer", Iris())

	const keenMindId = await call<string>("add_trainer_feat", {
		_write_key: writeKey,
		_feat_name: "Keen Mind",
		_description: null,
		_is_custom: false,
		_rank: 0,
	})

	const customFeatId = await call<string>("add_trainer_feat", {
		_write_key: writeKey,
		_feat_name: "Custom Feat",
		_description: "Does something super cool.",
		_is_custom: true,
		_rank: 1,
	})

	// Update
	await call("update_trainer_feat", {
		_write_key: writeKey,
		_id: keenMindId,
		_feat_name: "Keen Mind",
		_description: "Custom description.",
		_is_custom: false,
		_rank: 1,
	})

	await call("update_trainer_feat", {
		_write_key: writeKey,
		_id: customFeatId,
		_feat_name: "Chopstick Mastery",
		_description: "You can catch flies with chopsticks.",
		_is_custom: true,
		_rank: 0,
	})

	// Assert
	const irisFeats = await callAll<any>("get_trainer_feats", {
		_read_key: readKey,
	})

	const keenMind = irisFeats[1]
	const customFeat = irisFeats[0]
	expect(keenMind?.feat_name).toEqual("Keen Mind")
	expect(keenMind?.description).toEqual("Custom description.")
	expect(keenMind?.is_custom).toBe(false)
	expect(customFeat?.feat_name).toEqual("Chopstick Mastery")
	expect(customFeat?.description).toEqual("You can catch flies with chopsticks.")
	expect(customFeat?.is_custom).toBe(true)

	// Pokemon Too
	const pokemonId = await call<number>("add_pokemon", {
		_write_key: writeKey,
		...SunnyYellow(),
	})

	const extraMoveId = await call<string>("add_pokemon_feat", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_feat_name: "Extra Move",
		_description: null,
		_is_custom: false,
		_rank: 0,
	})

	const extraTypeId = await call<string>("add_pokemon_feat", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_feat_name: "Extra Type",
		_description: "You have a third type now.",
		_is_custom: true,
		_rank: 1,
	})

	await call("update_pokemon_feat", {
		_write_key: writeKey,
		_id: extraMoveId,
		_feat_name: "Extra Move",
		_description: "Custom description.",
		_is_custom: false,
		_rank: 1,
	})

	await call("update_pokemon_feat", {
		_write_key: writeKey,
		_id: extraTypeId,
		_feat_name: "Extra Type",
		_description: "You have a third type in addition to your other types.",
		_is_custom: true,
		_rank: 0,
	})

	const sunnyFeats = await callAll<any>("get_pokemon_feats", {
		_pokemon_id: pokemonId,
	})

	const extraMove = sunnyFeats[1]
	const extraType = sunnyFeats[0]
	expect(extraMove?.feat_name).toEqual("Extra Move")
	expect(extraMove?.description).toEqual("Custom description.")
	expect(extraMove?.is_custom).toBe(false)
	expect(extraType?.feat_name).toEqual("Extra Type")
	expect(extraType?.description).toEqual("You have a third type in addition to your other types.")
	expect(extraType?.is_custom).toBe(true)

	// Cleanup
	await call("remove_pokemon_feat", {
		_write_key: writeKey,
		_id: extraMoveId,
	})
	await call("remove_pokemon_feat", {
		_write_key: writeKey,
		_id: extraTypeId,
	})

	const noMorePokemonFeats = await callAll<any>("get_pokemon_feats", {
		_pokemon_id: pokemonId,
	})

	expect(noMorePokemonFeats.length).toEqual(0)

	await call("remove_trainer_feat", {
		_write_key: writeKey,
		_id: keenMindId,
	})
	await call("remove_trainer_feat", {
		_write_key: writeKey,
		_id: customFeatId,
	})
	const noMoreTrainerFeats = await callAll<any>("get_trainer_feats", {
		_read_key: readKey,
	})

	expect(noMoreTrainerFeats.length).toEqual(0)

	await call("delete_trainer", {
		_write_key: writeKey,
		_id: trainerId,
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
		_rank: 0,
	})

	const pounceId = await call<string>("add_move", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_move_id: "pounce",
		_pp_cur: 10,
		_pp_max: 10,
		_notes: "",
		_rank: 1,
	})

	// Update
	await call("update_move", {
		_write_key: writeKey,
		_id: psybeamId,
		_move_id: "psybeam",
		_pp_cur: 9,
		_pp_max: 10,
		_notes: "",
		_rank: 1,
	})

	await call("update_move", {
		_write_key: writeKey,
		_id: pounceId,
		_move_id: "pounce",
		_pp_cur: 10,
		_pp_max: 10,
		_notes: "",
		_rank: 0,
	})

	// Assert
	const sunnyMoves = await callAll<any>("get_moveset", {
		_pokemon_id: pokemonId,
	})

	const psybeam = sunnyMoves[1]
	const pounce = sunnyMoves[0]
	expect(psybeam?.move_id).toEqual("psybeam")
	expect(psybeam?.pp_cur).toEqual(9)
	expect(pounce?.move_id).toEqual("pounce")
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
		_rank: 0,
	})

	const customItemId = await call<string>("add_held_item", {
		_write_key: writeKey,
		_pokemon_id: pokemonId,
		_item_id: null,
		_custom_name: "Lustergem",
		_description: "Does something super cool.",
		_rank: 1,
	})

	// Update
	await call("update_held_item", {
		_write_key: writeKey,
		_id: miracleSeedId,
		_item_id: "lum-berry",
		_custom_name: null,
		_description: null,
		_rank: 1,
	})

	await call("update_held_item", {
		_write_key: writeKey,
		_id: customItemId,
		_item_id: null,
		_custom_name: "Lustergem",
		_description: "The holder may use Luster Purge once per day.",
		_rank: 0,
	})

	// Assert
	const sunnyItems = await callAll<any>("get_held_items", {
		_pokemon_id: pokemonId,
	})

	const lumBerry = sunnyItems[1]
	const customItem = sunnyItems[0]
	expect(lumBerry?.item_id).toEqual("lum-berry")
	expect(customItem?.custom_name).toEqual("Lustergem")
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

	await expectError(UNAUTHORIZED_SCHEMA, async (supabase) =>
		supabase.schema("private").from("inventory_items").select()
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
