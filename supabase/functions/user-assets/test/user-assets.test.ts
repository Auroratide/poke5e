import { assertExists, assertGreater, assertEquals } from "@std/assert"
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { PostResponseBody } from "../index.ts";
import { env } from "./env.ts"

const SUPABASE_OPTIONS = {
	auth: {
		autoRefreshToken: false,
		persistSession: false,
		detectSessionInUrl: false,
	},
}

function initSupabase(): SupabaseClient {
	return createClient(env.SUPABASE_URL, env.SUPABASE_KEY, SUPABASE_OPTIONS)
}

Deno.test("pokemon avatar", async () => {
	// given
	const supabase = initSupabase()
	const { writeKey, trainerId } = await newTrainer(supabase)
	const pokemonId = await newPokemon(supabase, writeKey)

	// when
	const { data } = await supabase.functions.invoke<PostResponseBody>("user-assets", {
		body: {
			type: "pokemon-avatar",
			params: {
				id: pokemonId,
				key: writeKey,
				mimetype: "image/png",
			},
		}
	})

	// then
	const result = data?.values
	assertExists(result?.filename)
	assertGreater(result.filename.length, 0)
	assertExists(result.uploadUrl)
	assertGreater(result.uploadUrl.length, 0)

	// and
	const pokemonAfterAdd = await getPokemon(supabase, trainerId)
	assertEquals(pokemonAfterAdd[0].avatar_filename, result.filename)

	// when
	await supabase.functions.invoke<PostResponseBody>("user-assets", {
		method: "DELETE",
		body: {
			type: "pokemon-avatar",
			params: {
				id: pokemonId,
				key: writeKey,
			},
		}
	})

	// then
	const pokemonAfterDelete = await getPokemon(supabase, trainerId)
	assertEquals(pokemonAfterDelete[0].avatar_filename, null)
})

async function newTrainer(supabase: SupabaseClient) {
	const { data, error } = await supabase.rpc("new_trainer", {
		_name: "Functions Trainer",
		_description: "Used for testing",
		_level: 1,
		_strength: 10,
		_dexterity: 10,
		_constitution: 10,
		_intelligence: 10,
		_wisdom: 10,
		_charisma: 10,
		_ac: 10,
		_hp_cur: 10,
		_hp_max: 10,
		_hit_dice_cur: 1,
		_hit_dice_max: 1,
		_rank_athletics: 0,
		_rank_acrobatics: 0,
		_rank_sleight_of_hand: 0,
		_rank_stealth: 0,
		_rank_arcana: 0,
		_rank_history: 0,
		_rank_investigation: 0,
		_rank_nature: 0,
		_rank_religion: 0,
		_rank_animal_handling: 0,
		_rank_insight: 0,
		_rank_medicine: 0,
		_rank_perception: 0,
		_rank_survival: 0,
		_rank_deception: 0,
		_rank_intimidation: 0,
		_rank_performance: 0,
		_rank_persuasion: 0,
		_save_str: false,
		_save_dex: false,
		_save_con: false,
		_save_int: false,
		_save_wis: false,
		_save_cha: false,
		_species: null,
		_gender: null,
		_age: null,
		_home_region: null,
		_background: null,
		_money: 0,
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
		_special_grass: 0,
		_special_electric: 0,
		_special_psychic: 0,
		_special_ice: 0,
		_special_dragon: 0,
		_special_dark: 0,
		_special_fairy: 0,
		_path_name: null,
		_path_resource: 0,
		_path_rank_1_name: "",
		_path_rank_1_desc: null,
		_path_rank_2_name: null,
		_path_rank_2_desc: null,
		_path_rank_3_name: null,
		_path_rank_3_desc: null,
		_path_rank_4_name: null,
		_path_rank_4_desc: null,
	}).single<{
		ret_id: string,
		ret_read_key: string,
		ret_write_key: string,
	}>()

	if (error) {
		throw new Error(error.message)
	}

	return {
		trainerId: data.ret_id,
		readKey: data.ret_read_key,
		writeKey: data.ret_write_key,
	}
}

async function newPokemon(supabase: SupabaseClient, writeKey: string) {
	const { data, error } = await supabase.rpc("add_pokemon", {
		_write_key: writeKey,
		_nickname: "Functions Pokemon",
		_species: "eevee",
		_nature: "Hardy",
		_type: ["normal"],
		_level: 1,
		_gender: "female",
		_strength: 10,
		_dexterity: 10,
		_constitution: 10,
		_intelligence: 10,
		_wisdom: 10,
		_charisma: 10,
		_ac: 10,
		_hp_cur: 10,
		_hp_max: 10,
		_hit_dice_cur: 1,
		_hit_dice_max: 1,
		_rank_athletics: 0,
		_rank_acrobatics: 0,
		_rank_sleight_of_hand: 0,
		_rank_stealth: 0,
		_rank_arcana: 0,
		_rank_history: 0,
		_rank_investigation: 0,
		_rank_nature: 0,
		_rank_religion: 0,
		_rank_animal_handling: 0,
		_rank_insight: 0,
		_rank_medicine: 0,
		_rank_perception: 0,
		_rank_survival: 0,
		_rank_deception: 0,
		_rank_intimidation: 0,
		_rank_performance: 0,
		_rank_persuasion: 0,
		_save_str: false,
		_save_dex: false,
		_save_con: false,
		_save_int: false,
		_save_wis: false,
		_save_cha: false,
		_ability: "run-away",
		_notes: "",
		_tera_type: "normal",
		_exp: 0,
		_status: null,
		_held_item: null,
		_is_shiny: false,
		_custom_size: null,
		_hit_dice_size: null,
		_speed_walking: null,
		_speed_climbing: null,
		_speed_swimming: null,
		_speed_flying: null,
		_speed_hover: null,
		_speed_burrowing: null,
		_sense_darkvision: null,
		_sense_blindsight: null,
		_sense_tremorsense: null,
		_sense_truesight: null,
		_bond_level: 0,
		_bond_points_cur: 0,
		_bond_points_max: 0,
	}).single<number>()

	if (error) {
		throw new Error(error.message)
	}

	return data.toString()
}

async function getPokemon(supabase: SupabaseClient, trainerId: string) {
	const { data, error } = await supabase.rpc("get_pokemon", {
		_trainer_id: trainerId,
	}).select()

	if (error) {
		throw new Error(error.message)
	}

	return data
}

