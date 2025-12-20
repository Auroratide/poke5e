import {
	type TrainerId,
	type Trainer,
	type ReadWriteKey,
	type TrainerPokemon,
	type TrainerInfo,
	type WithWriteKey,
	type LearnedMove,
	type PokemonId,
	type HeldItem,
	type InventoryItem,
} from "../types"
import { TrainerDataProviderError, type StorageResource, type TrainerData, type TrainerDataProvider } from "."
import type { SupabaseClient } from "@supabase/supabase-js"
import type { NonVolatileStatus } from "$lib/pokemon/status"
import { createEmptyChosenTrainerPath } from "$lib/trainers/paths"
import type { ChosenFeat } from "$lib/dnd/feats/ChosenFeat"
import { isCreatureSize } from "$lib/dnd/CreatureSize"
import { HitDice } from "$lib/dnd/hit-dice"
import { experienceNeededAtLevel } from "$lib/poke5e/experience"
import { Attributes, type Attribute } from "$lib/dnd/attributes"
import { SkillRanks, type Skill } from "$lib/dnd/skills"
import type { Data } from "$lib/DataClass"
import { Level } from "$lib/dnd/level"
import { Senses } from "$lib/dnd/senses"
import { Speeds } from "$lib/dnd/movement"
import { PokemonTeraType, PokemonType } from "$lib/pokemon/types-2"
import { PokemonGender } from "$lib/pokemon/gender"
import type { UserAssets } from "$lib/user-assets"
import { Nature, StandardNatures } from "$lib/pokemon/nature"
import { get } from "svelte/store"
import { PokemonSpecies, SpeciesIdentifier } from "$lib/poke5e/species"
import { TrainerLocalStorage } from "./TrainerLocalStorage"

const TRAINER_AVATARS_BUCKET = "trainer_avatars"

export class SupabaseTrainerProvider implements TrainerDataProvider {
	constructor(
		private supabase: SupabaseClient,
		private userAssets: UserAssets,
	) {}

	allTrainers = async (): Promise<Trainer[]> => {
		return Promise.all(
			TrainerLocalStorage.getReadKeys().map((key) => this.getOneTrainerInfo(key),
			)).then((trainers) => trainers.filter((it) => it != null))
	}
    
	getTrainer = async (readKey: ReadWriteKey): Promise<undefined | TrainerData> => {
		const trainer = await this.getOneTrainerInfo(readKey)

		if (!trainer) return undefined

		TrainerLocalStorage.addReadKey(readKey)
    
		const pokemon: TrainerPokemon[] = await this.getTrainersPokemon(trainer.id)

		const writeKey = TrainerLocalStorage.getWriteKey(readKey)
    
		return {
			info: trainer,
			pokemon,
			writeKey,
		}
	}

	private getOneTrainerInfo = async (readKey: ReadWriteKey): Promise<Trainer | undefined> => {
		const trainer = await this.supabase.rpc("get_trainer", { _read_key: readKey })
			.maybeSingle<TrainerRow>()
			.then(({ data, error }) => {
				if (error) {
					throw new TrainerDataProviderError("Could not get trainer.", error)
				}

				if (!data) return undefined

				return rowToTrainer(data, this.getStorageResource)
			})
		
		if (trainer == null) return undefined

		const [inventory, feats] = await Promise.all([
			this.getTrainerInventory(trainer.readKey),
			this.getTrainerFeats(trainer.readKey),
		])

		trainer.inventory = inventory
		trainer.feats = feats

		return trainer
	}

	private getTrainersPokemon = async (trainerId: string): Promise<TrainerPokemon[]> => {
		return await this.supabase.rpc("get_pokemon", { _trainer_id: trainerId })
			.select()
			.then(({ data, error }) => {
				if (error) {
					throw new TrainerDataProviderError("Could not trainer's pokemon.", error)
				}

				return data.map((it) => rowToPokemon(it, this.getUserAssetResource))
			})
			.then((pokemon) => Promise.all(pokemon.map((thePokemon) => {
				return this.getMoveset(thePokemon.id).then((moves) => ({
					...thePokemon,
					moves,
				}))
			})))
			.then((pokemon) => Promise.all(pokemon.map((thePokemon) => {
				return this.getHeldItems(thePokemon.id).then((items) => ({
					...thePokemon,
					items,
				}))
			})))
			.then((pokemon) => Promise.all(pokemon.map((thePokemon) => {
				return this.getPokemonFeats(thePokemon.id).then((feats) => ({
					...thePokemon,
					feats,
				}))
			})))
	}

	newTrainer = async (info: Pick<TrainerInfo, "name" | "description">): Promise<TrainerData & WithWriteKey> => {
		const toCreate: TrainerInfo = {
			...info,
			level: new Level(1),
			ac: 10,
			hp: {
				current: 8,
				max: 8,
			},
			hitDice: {
				current: 1,
				max: 1,
			},
			attributes: new Attributes({
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10,
			}),
			proficiencies: new SkillRanks({
				"athletics": 0,
				"acrobatics": 0,
				"sleight of hand": 0,
				"stealth": 0,
				"arcana": 0,
				"history": 0,
				"investigation": 0,
				"nature": 0,
				"religion": 0,
				"animal handling": 1,
				"insight": 0,
				"medicine": 0,
				"perception": 0,
				"survival": 0,
				"deception": 0,
				"intimidation": 0,
				"performance": 0,
				"persuasion": 0,
			}),
			savingThrows: ["cha"],
			biography: {
				species: "Human",
				gender: null,
				age: null,
				homeRegion: null,
				background: null,
			},
			money: 0,
			inventory: [],
			specializations: {
				ghost: 0,
				fairy: 0,
				normal: 0,
				fighting: 0,
				flying: 0,
				poison: 0,
				fire: 0,
				grass: 0,
				water: 0,
				electric: 0,
				psychic: 0,
				dark: 0,
				bug: 0,
				ice: 0,
				dragon: 0,
				steel: 0,
				rock: 0,
				ground: 0,
			},
			path: createEmptyChosenTrainerPath(),
			feats: [],
		}

		const { data, error } = await this.supabase.rpc("new_trainer", {
			_name: toCreate.name,
			_description: toCreate.description,
			_level: toCreate.level.data,
			_strength: toCreate.attributes.str.score,
			_dexterity: toCreate.attributes.dex.score,
			_constitution: toCreate.attributes.con.score,
			_intelligence: toCreate.attributes.int.score,
			_wisdom: toCreate.attributes.wis.score,
			_charisma: toCreate.attributes.cha.score,
			_ac: toCreate.ac,
			_hp_cur: toCreate.hp.current,
			_hp_max: toCreate.hp.max,
			_hit_dice_cur: toCreate.hitDice.current,
			_hit_dice_max: toCreate.hitDice.max,
			_rank_athletics: toCreate.proficiencies.data["athletics"],
			_rank_acrobatics: toCreate.proficiencies.data["acrobatics"],
			_rank_sleight_of_hand: toCreate.proficiencies.data["sleight of hand"],
			_rank_stealth: toCreate.proficiencies.data["stealth"],
			_rank_arcana: toCreate.proficiencies.data["arcana"],
			_rank_history: toCreate.proficiencies.data["history"],
			_rank_investigation: toCreate.proficiencies.data["investigation"],
			_rank_nature: toCreate.proficiencies.data["nature"],
			_rank_religion: toCreate.proficiencies.data["religion"],
			_rank_animal_handling: toCreate.proficiencies.data["animal handling"],
			_rank_insight: toCreate.proficiencies.data["insight"],
			_rank_medicine: toCreate.proficiencies.data["medicine"],
			_rank_perception: toCreate.proficiencies.data["perception"],
			_rank_survival: toCreate.proficiencies.data["survival"],
			_rank_deception: toCreate.proficiencies.data["deception"],
			_rank_intimidation: toCreate.proficiencies.data["intimidation"],
			_rank_performance: toCreate.proficiencies.data["performance"],
			_rank_persuasion: toCreate.proficiencies.data["persuasion"],
			_save_str: toCreate.savingThrows.includes("str"),
			_save_dex: toCreate.savingThrows.includes("dex"),
			_save_con: toCreate.savingThrows.includes("con"),
			_save_int: toCreate.savingThrows.includes("int"),
			_save_wis: toCreate.savingThrows.includes("wis"),
			_save_cha: toCreate.savingThrows.includes("cha"),
			_species: toCreate.biography.species,
			_gender: toCreate.biography.gender,
			_age: toCreate.biography.age,
			_home_region: toCreate.biography.homeRegion,
			_background: toCreate.biography.background,
			_money: toCreate.money,
			_special_normal: toCreate.specializations.normal ?? 0,
			_special_fighting: toCreate.specializations.fighting ?? 0,
			_special_flying: toCreate.specializations.flying ?? 0,
			_special_poison: toCreate.specializations.poison ?? 0,
			_special_ground: toCreate.specializations.ground ?? 0,
			_special_rock: toCreate.specializations.rock ?? 0,
			_special_bug: toCreate.specializations.bug ?? 0,
			_special_ghost: toCreate.specializations.ghost ?? 0,
			_special_steel: toCreate.specializations.steel ?? 0,
			_special_fire: toCreate.specializations.fire ?? 0,
			_special_water: toCreate.specializations.water ?? 0,
			_special_grass: toCreate.specializations.grass ?? 0,
			_special_electric: toCreate.specializations.electric ?? 0,
			_special_psychic: toCreate.specializations.psychic ?? 0,
			_special_ice: toCreate.specializations.ice ?? 0,
			_special_dragon: toCreate.specializations.dragon ?? 0,
			_special_dark: toCreate.specializations.dark ?? 0,
			_special_fairy: toCreate.specializations.fairy ?? 0,
			_path_name: toCreate.path.name,
			_path_resource: toCreate.path.resource,
			_path_rank_1_name: "",
			_path_rank_1_desc: toCreate.path.customFeatures.level2.description,
			_path_rank_2_name: toCreate.path.customFeatures.level5.name,
			_path_rank_2_desc: toCreate.path.customFeatures.level5.description,
			_path_rank_3_name: toCreate.path.customFeatures.level9.name,
			_path_rank_3_desc: toCreate.path.customFeatures.level9.description,
			_path_rank_4_name: toCreate.path.customFeatures.level15.name,
			_path_rank_4_desc: toCreate.path.customFeatures.level15.description,
		}).single<{
			ret_id: string,
			ret_read_key: string,
			ret_write_key: string,
		}>()

		if (error) {
			throw new TrainerDataProviderError("Could not create trainer.", error)
		}

		TrainerLocalStorage.addReadKey(data.ret_read_key)
		TrainerLocalStorage.addWriteKey(data.ret_read_key, data.ret_write_key)

		return {
			info: {
				...toCreate,
				id: data.ret_id,
				readKey: data.ret_read_key,
			},
			pokemon: [],
			writeKey: data.ret_write_key,
		}
	}

	updateTrainerInfo = async (writeKey: ReadWriteKey, info: TrainerInfo): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("update_trainer", {
			_write_key: writeKey,
			_name: info.name,
			_description: info.description,
			_level: info.level.data,
			_strength: info.attributes.str.score,
			_dexterity: info.attributes.dex.score,
			_constitution: info.attributes.con.score,
			_intelligence: info.attributes.int.score,
			_wisdom: info.attributes.wis.score,
			_charisma: info.attributes.cha.score,
			_ac: info.ac,
			_hp_cur: info.hp.current,
			_hp_max: info.hp.max,
			_hit_dice_cur: info.hitDice.current,
			_hit_dice_max: info.hitDice.max,
			_rank_athletics: info.proficiencies.data["athletics"],
			_rank_acrobatics: info.proficiencies.data["acrobatics"],
			_rank_sleight_of_hand: info.proficiencies.data["sleight of hand"],
			_rank_stealth: info.proficiencies.data["stealth"],
			_rank_arcana: info.proficiencies.data["arcana"],
			_rank_history: info.proficiencies.data["history"],
			_rank_investigation: info.proficiencies.data["investigation"],
			_rank_nature: info.proficiencies.data["nature"],
			_rank_religion: info.proficiencies.data["religion"],
			_rank_animal_handling: info.proficiencies.data["animal handling"],
			_rank_insight: info.proficiencies.data["insight"],
			_rank_medicine: info.proficiencies.data["medicine"],
			_rank_perception: info.proficiencies.data["perception"],
			_rank_survival: info.proficiencies.data["survival"],
			_rank_deception: info.proficiencies.data["deception"],
			_rank_intimidation: info.proficiencies.data["intimidation"],
			_rank_performance: info.proficiencies.data["performance"],
			_rank_persuasion: info.proficiencies.data["persuasion"],
			_save_str: info.savingThrows.includes("str"),
			_save_dex: info.savingThrows.includes("dex"),
			_save_con: info.savingThrows.includes("con"),
			_save_int: info.savingThrows.includes("int"),
			_save_wis: info.savingThrows.includes("wis"),
			_save_cha: info.savingThrows.includes("cha"),
			_species: info.biography.species,
			_gender: info.biography.gender,
			_age: info.biography.age,
			_home_region: info.biography.homeRegion,
			_background: info.biography.background,
			_money: info.money,
			_special_normal: info.specializations.normal ?? 0,
			_special_fighting: info.specializations.fighting ?? 0,
			_special_flying: info.specializations.flying ?? 0,
			_special_poison: info.specializations.poison ?? 0,
			_special_ground: info.specializations.ground ?? 0,
			_special_rock: info.specializations.rock ?? 0,
			_special_bug: info.specializations.bug ?? 0,
			_special_ghost: info.specializations.ghost ?? 0,
			_special_steel: info.specializations.steel ?? 0,
			_special_fire: info.specializations.fire ?? 0,
			_special_water: info.specializations.water ?? 0,
			_special_grass: info.specializations.grass ?? 0,
			_special_electric: info.specializations.electric ?? 0,
			_special_psychic: info.specializations.psychic ?? 0,
			_special_ice: info.specializations.ice ?? 0,
			_special_dragon: info.specializations.dragon ?? 0,
			_special_dark: info.specializations.dark ?? 0,
			_special_fairy: info.specializations.fairy ?? 0,
			_path_name: info.path.name,
			_path_resource: info.path.resource,
			_path_rank_1_name: "",
			_path_rank_1_desc: info.path.customFeatures.level2.description,
			_path_rank_2_name: info.path.customFeatures.level5.name,
			_path_rank_2_desc: info.path.customFeatures.level5.description,
			_path_rank_3_name: info.path.customFeatures.level9.name,
			_path_rank_3_desc: info.path.customFeatures.level9.description,
			_path_rank_4_name: info.path.customFeatures.level15.name,
			_path_rank_4_desc: info.path.customFeatures.level15.description,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not update trainer.", error)
		}

		if (data <= 0) {
			throw new TrainerDataProviderError("Either this trainer does not exist or you do not have permission to edit them.")
		}

		return data > 0
	}

	updateTrainerAvatar = async (writeKey: ReadWriteKey, newAvatar: File, oldResource?: StorageResource): Promise<StorageResource> => {
		const filename = await this.generateTrainerAvatarFilename(writeKey, newAvatar)

		const { error: uploadError } = await this.supabase.storage.from(TRAINER_AVATARS_BUCKET).upload(filename, newAvatar)

		if (uploadError) {
			throw new TrainerDataProviderError("Could not upload file for trainer.")
		}

		await this.removeOldTrainerAvatar(oldResource)

		return this.getStorageResource(TRAINER_AVATARS_BUCKET, filename)
	}

	removeTrainerAvatar = async (writeKey: ReadWriteKey, oldResource?: StorageResource): Promise<void> => {
		const { data, error } = await this.supabase.rpc("remove_trainer_avatar", {
			_write_key: writeKey,
		}).single<number>()

		if (data != null && data <= 0) {
			throw new TrainerDataProviderError("You do not have permission to edit this trainer.")
		}

		if (error) {
			throw new TrainerDataProviderError("Could not remove trainer's avatar image", error)
		}

		await this.removeOldTrainerAvatar(oldResource)
	}

	private generateTrainerAvatarFilename = async (writeKey: ReadWriteKey, newAvatar: File): Promise<string> => {
		const extension = newAvatar.name.split(".").at(-1)
		const { data: filename, error: newFilenameError } = await this.supabase.rpc("new_trainer_avatar_filename", {
			_write_key: writeKey,
			_extension: "." + extension,
		}).single<string>()

		if (newFilenameError) {
			throw new TrainerDataProviderError("Could not generate filename for trainer avatar.", newFilenameError)
		}

		return filename
	}

	private removeOldTrainerAvatar = async (oldResource?: StorageResource) => {
		if (oldResource != null) {
			const { error: deleteError } = await this.supabase.storage.from(TRAINER_AVATARS_BUCKET).remove([oldResource.name])

			if (deleteError) {
				console.warn("Could not remove old trainer avatar. Ignoring this error.")
			}
		}
	}

	removeTrainer = async (id: TrainerId, readKey: ReadWriteKey): Promise<void> => {
		TrainerLocalStorage.removeWriteKey(readKey)
		TrainerLocalStorage.removeReadKey(readKey)
	}

	deleteTrainer = async (writeKey: ReadWriteKey, id: TrainerId, readKey: ReadWriteKey): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("delete_trainer", {
			_write_key: writeKey,
			_id: id,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not delete trainer.", error)
		}

		if (data <= 0) {
			throw new TrainerDataProviderError("Either this trainer does not exist or you do not have permission to edit them.")
		}

		TrainerLocalStorage.removeWriteKey(readKey)
		TrainerLocalStorage.removeReadKey(readKey)
    
		return data > 0
	}

	updatePokemon = async (writeKey: ReadWriteKey, info: TrainerPokemon): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("update_pokemon", {
			_write_key: writeKey,
			_id: parseInt(info.id),
			_species: info.pokemonId.data,
			_nickname: info.nickname,
			_type: info.type.data,
			_nature: info.nature.data,
			_level: info.level.data,
			_gender: info.gender,
			_strength: info.attributes.str.score,
			_dexterity: info.attributes.dex.score,
			_constitution: info.attributes.con.score,
			_intelligence: info.attributes.int.score,
			_wisdom: info.attributes.wis.score,
			_charisma: info.attributes.cha.score,
			_ac: info.ac,
			_hp_cur: info.hp.current,
			_hp_max: info.hp.max,
			_hit_dice_cur: info.hitDice.current,
			_hit_dice_max: info.hitDice.max,
			_rank_athletics: info.proficiencies.data["athletics"],
			_rank_acrobatics: info.proficiencies.data["acrobatics"],
			_rank_sleight_of_hand: info.proficiencies.data["sleight of hand"],
			_rank_stealth: info.proficiencies.data["stealth"],
			_rank_arcana: info.proficiencies.data["arcana"],
			_rank_history: info.proficiencies.data["history"],
			_rank_investigation: info.proficiencies.data["investigation"],
			_rank_nature: info.proficiencies.data["nature"],
			_rank_religion: info.proficiencies.data["religion"],
			_rank_animal_handling: info.proficiencies.data["animal handling"],
			_rank_insight: info.proficiencies.data["insight"],
			_rank_medicine: info.proficiencies.data["medicine"],
			_rank_perception: info.proficiencies.data["perception"],
			_rank_survival: info.proficiencies.data["survival"],
			_rank_deception: info.proficiencies.data["deception"],
			_rank_intimidation: info.proficiencies.data["intimidation"],
			_rank_performance: info.proficiencies.data["performance"],
			_rank_persuasion: info.proficiencies.data["persuasion"],
			_save_str: info.savingThrows.includes("str"),
			_save_dex: info.savingThrows.includes("dex"),
			_save_con: info.savingThrows.includes("con"),
			_save_int: info.savingThrows.includes("int"),
			_save_wis: info.savingThrows.includes("wis"),
			_save_cha: info.savingThrows.includes("cha"),
			_ability: info.ability ?? "",
			_notes: info.notes,
			_tera_type: info.teraType.data,
			_exp: info.exp,
			_status: info.status,
			_held_item: null,
			_is_shiny: info.isShiny,
			_custom_size: info.customSize ?? null,
			_hit_dice_size: info.customHitDiceSize?.data ?? null,
			_speed_walking: info.speeds.data.walking ?? null,
			_speed_climbing: info.speeds.data.climbing ?? null,
			_speed_swimming: info.speeds.data.swimming ?? null,
			_speed_flying: info.speeds.data.flying ?? null,
			_speed_hover: info.speeds.data.hover ?? null,
			_speed_burrowing: info.speeds.data.burrowing ?? null,
			_sense_darkvision: info.senses.data.darkvision ?? null,
			_sense_blindsight: info.senses.data.blindsight ?? null,
			_sense_tremorsense: info.senses.data.tremorsense ?? null,
			_sense_truesight: info.senses.data.truesight ?? null,
			_bond_level: info.bond.level,
			_bond_points_cur: info.bond.points.current,
			_bond_points_max: info.bond.points.max,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not update pokemon.", error)
		}

		if (data <= 0) {
			throw new TrainerDataProviderError("Either this pokemon does not exist or you do not have permission to edit them.")
		}
    
		return data > 0
	}

	updatePokemonAvatar = async (writeKey: ReadWriteKey, info: TrainerPokemon, newAvatar: File): Promise<StorageResource> => {
		const { data, error } = await this.supabase.functions.invoke<PostUserAssetsResponseBody>("user-assets", {
			method: "POST",
			body: {
				type: "pokemon-avatar",
				params: {
					id: info.id,
					key: writeKey,
					mimetype: newAvatar.type,
					sizeInBytes: newAvatar.size,
				},
			},
		})

		if (error) {
			throw new TrainerDataProviderError("Could not upload file for pokemon.")
		}

		await this.userAssets.upload(data.values.uploadUrl, newAvatar)

		return this.getUserAssetResource(data.values.filename)
	}

	removePokemonAvatar = async (writeKey: ReadWriteKey, info: TrainerPokemon): Promise<void> => {
		const { error } = await this.supabase.functions.invoke("user-assets", {
			method: "DELETE",
			body: {
				type: "pokemon-avatar",
				params: {
					id: info.id,
					key: writeKey,
				},
			},
		})

		if (error) {
			console.error(error)
			throw new TrainerDataProviderError("Could not delete file for pokemon.")
		}
	}

	addPokemonToTeam = async (writeKey: ReadWriteKey, trainerId: TrainerId, pokemon: PokemonSpecies): Promise<TrainerPokemon> => {
		const trainerPokemon: Omit<TrainerPokemon, "id"> = {
			trainerId: trainerId,
			pokemonId: pokemon.id,
			nickname: pokemon.data.name,
			type: pokemon.type,
			nature: new Nature(get(StandardNatures)[0]),
			level: new Level(pokemon.data.minLevel),
			exp: experienceNeededAtLevel(pokemon.data.minLevel),
			gender: PokemonGender.None,
			attributes: pokemon.attributes,
			ac: pokemon.data.ac,
			ability: pokemon.abilities.toList()[0]?.id,
			hp: {
				current: pokemon.data.hp,
				max: pokemon.data.hp,
			},
			hitDice: {
				current: pokemon.data.minLevel,
				max: pokemon.data.minLevel,
			},
			proficiencies: pokemon.skills.copy(),
			savingThrows: pokemon.data.saves,
			moves: [],
			items: [],
			notes: pokemon.data.notes ?? "",
			teraType: new PokemonTeraType(pokemon.type.primary),
			status: null,
			isShiny: false,
			feats: [],
			customSize: undefined,
			customHitDiceSize: undefined,
			speeds: new Speeds({}),
			senses: new Senses({}),
			bond: {
				level: 0,
				points: {
					current: 0,
					max: 0,
				},
			},
		}

		const { data, error } = await this.supabase.rpc("add_pokemon", {
			_write_key: writeKey,
			_nickname: pokemon.data.name,
			_species: pokemon.id.data,
			_nature: trainerPokemon.nature.data,
			_type: pokemon.type.data,
			_level: pokemon.data.minLevel,
			_gender: PokemonGender.None,
			_strength: pokemon.attributes.str.score,
			_dexterity: pokemon.attributes.dex.score,
			_constitution: pokemon.attributes.con.score,
			_intelligence: pokemon.attributes.int.score,
			_wisdom: pokemon.attributes.wis.score,
			_charisma: pokemon.attributes.cha.score,
			_ac: pokemon.data.ac,
			_hp_cur: pokemon.data.hp,
			_hp_max: pokemon.data.hp,
			_hit_dice_cur: pokemon.data.minLevel,
			_hit_dice_max: pokemon.data.minLevel,
			_rank_athletics: trainerPokemon.proficiencies.data["athletics"],
			_rank_acrobatics: trainerPokemon.proficiencies.data["acrobatics"],
			_rank_sleight_of_hand: trainerPokemon.proficiencies.data["sleight of hand"],
			_rank_stealth: trainerPokemon.proficiencies.data["stealth"],
			_rank_arcana: trainerPokemon.proficiencies.data["arcana"],
			_rank_history: trainerPokemon.proficiencies.data["history"],
			_rank_investigation: trainerPokemon.proficiencies.data["investigation"],
			_rank_nature: trainerPokemon.proficiencies.data["nature"],
			_rank_religion: trainerPokemon.proficiencies.data["religion"],
			_rank_animal_handling: trainerPokemon.proficiencies.data["animal handling"],
			_rank_insight: trainerPokemon.proficiencies.data["insight"],
			_rank_medicine: trainerPokemon.proficiencies.data["medicine"],
			_rank_perception: trainerPokemon.proficiencies.data["perception"],
			_rank_survival: trainerPokemon.proficiencies.data["survival"],
			_rank_deception: trainerPokemon.proficiencies.data["deception"],
			_rank_intimidation: trainerPokemon.proficiencies.data["intimidation"],
			_rank_performance: trainerPokemon.proficiencies.data["performance"],
			_rank_persuasion: trainerPokemon.proficiencies.data["persuasion"],
			_save_str: pokemon.data.saves.includes("str"),
			_save_dex: pokemon.data.saves.includes("dex"),
			_save_con: pokemon.data.saves.includes("con"),
			_save_int: pokemon.data.saves.includes("int"),
			_save_wis: pokemon.data.saves.includes("wis"),
			_save_cha: pokemon.data.saves.includes("cha"),
			_ability: pokemon.abilities.toList()[0]?.id ?? "",
			_notes: trainerPokemon.notes ?? "",
			_tera_type: pokemon.type.primary,
			_exp: trainerPokemon.exp,
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
			throw new TrainerDataProviderError("Could not add pokemon.", error)
		}

		return {
			...trainerPokemon,
			id: data.toString(),
		}
	}

	removePokemon = async (writeKey: string, id: string): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("remove_pokemon", {
			_write_key: writeKey,
			_id: id,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not remove pokemon.", error)
		}

		return data > 0
	}

	private updateListOfThings = async <T extends { id: string }>({
		thingName,
		writeKey,
		newThings,
		getExistingThings,
		removeFunctionName,
		updateFunctionName,
		addFunctionName,
		mapThingToDbArgument,
	}: {
		thingName: string,
		writeKey: ReadWriteKey,
		newThings: T[],
		getExistingThings: () => Promise<T[]>,
		removeFunctionName: string,
		updateFunctionName: string,
		addFunctionName: string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		mapThingToDbArgument: (thing: T, index: number, type: "add" | "update") => any,
	}): Promise<T[]> => {
		const existingThings = await getExistingThings()
		const newIds = newThings.map((it) => it.id)
		const existingIds = existingThings.map((it) => it.id)

		const deletedIds = existingIds.filter((id) => !newIds.includes(id))
		await Promise.all(deletedIds.map((id) => this.supabase.rpc(removeFunctionName, {
			_write_key: writeKey,
			_id: id,
		}).single<number>().then(({ data, error }) => {
			if (error) {
				throw new TrainerDataProviderError(`Could not delete ${thingName}.`, error)
			}

			if (data <= 0) {
				throw new TrainerDataProviderError("Either this trainer/pokemon does not exist or you do not have permission to edit them.")
			}

			return data > 0
		})))

		return await Promise.all(newThings.map((thing, index) => {
			if (existingIds.includes(thing.id)) {
				return this.supabase.rpc(updateFunctionName, mapThingToDbArgument(thing, index, "update")).single<number>().then(({ data, error }) => {
					if (error) {
						throw new TrainerDataProviderError(`Could not update ${thingName}.`, error)
					}

					if (data <= 0) {
						throw new TrainerDataProviderError("Either this trainer/pokemon does not exist or you do not have permission to edit them.")
					}

					return { ...thing }
				})
			} else {
				return this.supabase.rpc(addFunctionName, mapThingToDbArgument(thing, index, "add")).single<string>().then(({ data, error }) => {
					if (error) {
						throw new TrainerDataProviderError(`Could not add ${thingName}.`, error)
					}

					return {
						...thing,
						id: data,
					}
				})
			}
		}))
	}

	updateMoveset = async (writeKey: ReadWriteKey, pokemonId: PokemonId, newMoveset: LearnedMove[]) => this.updateListOfThings<LearnedMove>({
		thingName: "move",
		writeKey: writeKey,
		newThings: newMoveset,
		getExistingThings: () => this.getMoveset(pokemonId),
		removeFunctionName: "remove_move",
		updateFunctionName: "update_move",
		addFunctionName: "add_move",
		mapThingToDbArgument: (move, index, type) => ({
			_write_key: writeKey,
			_pokemon_id: type === "add" ? pokemonId : undefined,
			_id: type === "update" ? move.id : undefined,
			_move_id: move.moveId,
			_pp_cur: move.pp.current,
			_pp_max: move.pp.max,
			_notes: move.notes,
			_rank: index,
		}),
	})

	updateOneMove = async (writeKey: string, move: LearnedMove): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("update_move", {
			_write_key: writeKey,
			_id: move.id,
			_move_id: move.moveId,
			_pp_cur: move.pp.current,
			_pp_max: move.pp.max,
			_notes: move.notes,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not update pokemon.", error)
		}

		if (data <= 0) {
			throw new TrainerDataProviderError("Either this pokemon does not exist or you do not have permission to edit them.")
		}

		return data > 0
	}

	updateAllHeldItems = async (writeKey: ReadWriteKey, pokemonId: PokemonId, newHeldItems: HeldItem[]) => this.updateListOfThings<HeldItem>({
		thingName: "held item",
		writeKey: writeKey,
		newThings: newHeldItems,
		getExistingThings: () => this.getHeldItems(pokemonId),
		removeFunctionName: "remove_held_item",
		updateFunctionName: "update_held_item",
		addFunctionName: "add_held_item",
		mapThingToDbArgument: (item, index, type) => ({
			_write_key: writeKey,
			_pokemon_id: type === "add" ? pokemonId : undefined,
			_id: type === "update" ? item.id : undefined,
			_item_id: item.type === "standard" ? item.itemId : null,
			_custom_name: item.type === "custom" ? item.name : null,
			_description: item.type === "custom" ? item.description : null,
			_rank: index,
		}),
	})

	updateTrainerInventory = async (writeKey: ReadWriteKey, newInventory: InventoryItem[]) => this.updateListOfThings<InventoryItem>({
		thingName: "inventory item",
		writeKey: writeKey,
		newThings: newInventory,
		getExistingThings: () => this.getTrainerInventory(TrainerLocalStorage.getReadKey(writeKey)),
		removeFunctionName: "remove_inventory_item",
		updateFunctionName: "update_inventory_item",
		addFunctionName: "add_inventory_item",
		mapThingToDbArgument: (item, index, type) => ({
			_write_key: writeKey,
			_id: type === "update" ? item.id : undefined,
			_item_id: item.type === "standard" ? item.itemId : null,
			_quantity: item.quantity,
			_custom_name: item.type === "custom" ? item.name : null,
			_description: item.type === "custom" ? item.description : null,
			_rank: index,
		}),
	})

	updateTrainerFeats = async (writeKey: ReadWriteKey, newFeats: ChosenFeat[]) => this.updateListOfThings<ChosenFeat>({
		thingName: "feat",
		writeKey: writeKey,
		newThings: newFeats,
		getExistingThings: () => this.getTrainerFeats(TrainerLocalStorage.getReadKey(writeKey)),
		removeFunctionName: "remove_trainer_feat",
		updateFunctionName: "update_trainer_feat",
		addFunctionName: "add_trainer_feat",
		mapThingToDbArgument: (feat, index, type) => ({
			_write_key: writeKey,
			_id: type === "update" ? feat.id : undefined,
			_feat_name: feat.name,
			_description: feat.description,
			_is_custom: feat.isCustom,
			_rank: index,
		}),
	})

	updatePokemonFeats = async (writeKey: ReadWriteKey, pokemonId: PokemonId, newFeats: ChosenFeat[]) => this.updateListOfThings<ChosenFeat>({
		thingName: "feat",
		writeKey: writeKey,
		newThings: newFeats,
		getExistingThings: () => this.getPokemonFeats(pokemonId),
		removeFunctionName: "remove_pokemon_feat",
		updateFunctionName: "update_pokemon_feat",
		addFunctionName: "add_pokemon_feat",
		mapThingToDbArgument: (feat, index, type) => ({
			_write_key: writeKey,
			_pokemon_id: type === "add" ? pokemonId : undefined,
			_id: type === "update" ? feat.id : undefined,
			_feat_name: feat.name,
			_description: feat.description,
			_is_custom: feat.isCustom,
			_rank: index,
		}),
	})

	updateTrainerItem = async (writeKey: ReadWriteKey, item: InventoryItem): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("update_inventory_item", {
			_write_key: writeKey,
			_id: item.id,
			_item_id: item.type === "standard" ? item.itemId : null,
			_quantity: item.quantity,
			_custom_name: item.type === "custom" ? item.name : null,
			_description: item.type === "custom" ? item.description : null,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not update inventory item.", error)
		}

		if (data <= 0) {
			throw new TrainerDataProviderError("Either this trainer does not exist or you do not have permission to edit them.")
		}

		return data > 0
	}

	verifyWriteKey = async (trainer: Trainer, writeKey: ReadWriteKey): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("verify_write_key", {
			_id: trainer.id,
			_write_key: writeKey,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not verify trainer.", error)
		}

		if (data > 0) {
			TrainerLocalStorage.addWriteKey(trainer.readKey, writeKey)
		}

		return data > 0
	}

	private getMoveset = async (id: PokemonId): Promise<LearnedMove[]> => {
		const { data, error } = await this.supabase.rpc("get_moveset", { _pokemon_id: id })
			.select()

		if (error) {
			throw new TrainerDataProviderError("Could not get moveset.", error)
		}

		return data?.map((move) => rowToMove(move)) ?? []
	}

	private getHeldItems = async (id: PokemonId): Promise<HeldItem[]> => {
		const { data, error } = await this.supabase.rpc("get_held_items", { _pokemon_id: id })
			.select()

		if (error) {
			throw new TrainerDataProviderError("Could not get held items.", error)
		}

		return data?.map((row) => rowToHeldItem(row)) ?? []
	}

	private getTrainerInventory = async (readKey: ReadWriteKey): Promise<InventoryItem[]> => {
		const { data, error } = await this.supabase.rpc("get_inventory_items", { _read_key: readKey })
			.select()

		if (error) {
			throw new TrainerDataProviderError("Could not get inventory items.", error)
		}

		return data?.map((row) => rowToInventoryItem(row)) ?? []
	}

	private getTrainerFeats = async (readKey: ReadWriteKey): Promise<ChosenFeat[]> => {
		const { data, error } = await this.supabase.rpc("get_trainer_feats", { _read_key: readKey })
			.select()

		if (error) {
			throw new TrainerDataProviderError("Could not get trainer feats.", error)
		}

		return data?.map((row) => rowToTrainerFeat(row)) ?? []
	}

	private getPokemonFeats = async (pokemonId: PokemonId): Promise<ChosenFeat[]> => {
		const { data, error } = await this.supabase.rpc("get_pokemon_feats", { _pokemon_id: pokemonId  })
			.select()

		if (error) {
			throw new TrainerDataProviderError("Could not get pokemon feats.", error)
		}

		return data?.map((row) => rowToPokemonFeat(row)) ?? []
	}

	private getStorageResource = (bucket: string, name: string) => ({
		name: name,
		href: this.supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl,
	})

	private getUserAssetResource = (name: string) => ({
		name: name,
		href: this.userAssets.getAssetUrl(name),
	})
}

type TrainerRow = {
	id: string,
	read_key: string,
	name: string,
	description: string,
	level: number,
	strength: number,
	dexterity: number,
	constitution: number,
	intelligence: number,
	wisdom: number,
	charisma: number,
	ac: number,
	hp_cur: number,
	hp_max: number,
	hit_dice_cur: number,
	hit_dice_max: number,
	prof_athletics: boolean,
	prof_acrobatics: boolean,
	prof_sleight_of_hand: boolean,
	prof_stealth: boolean,
	prof_arcana: boolean,
	prof_history: boolean,
	prof_investigation: boolean,
	prof_nature: boolean,
	prof_religion: boolean,
	prof_animal_handling: boolean,
	prof_insight: boolean,
	prof_medicine: boolean,
	prof_perception: boolean,
	prof_survival: boolean,
	prof_deception: boolean,
	prof_intimidation: boolean,
	prof_performance: boolean,
	prof_persuasion: boolean,
	save_str: boolean,
	save_dex: boolean,
	save_con: boolean,
	save_int: boolean,
	save_wis: boolean,
	save_cha: boolean,
	species: string | null,
	gender: string | null,
	age: number | null,
	home_region: string | null,
	background: string | null,
	avatar_filename: string | null,
	money: number,
	special_normal: number,
	special_fighting: number,
	special_flying: number,
	special_poison: number,
	special_ground: number,
	special_rock: number,
	special_bug: number,
	special_ghost: number,
	special_steel: number,
	special_fire: number,
	special_water: number,
	special_grass: number,
	special_electric: number,
	special_psychic: number,
	special_ice: number,
	special_dragon: number,
	special_dark: number,
	special_fairy: number,
	path_name: string,
	path_resource: number,
	path_rank_1_name: string,
	path_rank_1_desc: string,
	path_rank_2_name: string,
	path_rank_2_desc: string,
	path_rank_3_name: string,
	path_rank_3_desc: string,
	path_rank_4_name: string,
	path_rank_4_desc: string,
	rank_athletics: number,
	rank_acrobatics: number,
	rank_sleight_of_hand: number,
	rank_stealth: number,
	rank_arcana: number,
	rank_history: number,
	rank_investigation: number,
	rank_nature: number,
	rank_religion: number,
	rank_animal_handling: number,
	rank_insight: number,
	rank_medicine: number,
	rank_perception: number,
	rank_survival: number,
	rank_deception: number,
	rank_intimidation: number,
	rank_performance: number,
	rank_persuasion: number,
}

const rowToTrainer = (row: TrainerRow, getStorageResource: (bucket: string, name: string) => StorageResource) => ({
	id: row.id,
	readKey: row.read_key,
	name: row.name,
	description: row.description,
	level: new Level(row.level),
	attributes: new Attributes({
		str: row.strength,
		dex: row.dexterity,
		con: row.constitution,
		int: row.intelligence,
		wis: row.wisdom,
		cha: row.charisma,
	}),
	ac: row.ac,
	hp: {
		current: row.hp_cur,
		max: row.hp_max,
	},
	hitDice: {
		current: row.hit_dice_cur,
		max: row.hit_dice_max,
	},
	proficiencies: consolidateSkillRankProfAndRank({
		"athletics": [row.prof_athletics, row.rank_athletics],
		"acrobatics": [row.prof_acrobatics, row.rank_acrobatics ],
		"sleight of hand": [row.prof_sleight_of_hand, row.rank_sleight_of_hand ],
		"stealth": [row.prof_stealth, row.rank_stealth ],
		"arcana": [row.prof_arcana, row.rank_arcana ],
		"history": [row.prof_history, row.rank_history ],
		"investigation": [row.prof_investigation, row.rank_investigation ],
		"nature": [row.prof_nature, row.rank_nature ],
		"religion": [row.prof_religion, row.rank_religion ],
		"animal handling": [row.prof_animal_handling, row.rank_animal_handling ],
		"insight": [row.prof_insight, row.rank_insight ],
		"medicine": [row.prof_medicine, row.rank_medicine ],
		"perception": [row.prof_perception, row.rank_perception ],
		"survival": [row.prof_survival, row.rank_survival ],
		"deception": [row.prof_deception, row.rank_deception ],
		"intimidation": [row.prof_intimidation, row.rank_intimidation ],
		"performance": [row.prof_performance, row.rank_performance ],
		"persuasion": [row.prof_persuasion, row.rank_persuasion ],
	}),
	savingThrows: booleansToList<Attribute>({
		str: row.save_str,
		dex: row.save_dex,
		con: row.save_con,
		int: row.save_int,
		wis: row.save_wis,
		cha: row.save_cha,
	}),
	biography: {
		species: row.species,
		gender: row.gender,
		age: row.age,
		homeRegion: row.home_region,
		background: row.background,
	},
	money: row.money,
	inventory: [],
	avatar: row.avatar_filename != null ?
		getStorageResource(TRAINER_AVATARS_BUCKET, row.avatar_filename) :
		null,
	specializations: {
		normal: row.special_normal,
		fighting: row.special_fighting,
		flying: row.special_flying,
		poison: row.special_poison,
		ground: row.special_ground,
		rock: row.special_rock,
		bug: row.special_bug,
		ghost: row.special_ghost,
		steel: row.special_steel,
		fire: row.special_fire,
		water: row.special_water,
		grass: row.special_grass,
		electric: row.special_electric,
		psychic: row.special_psychic,
		ice: row.special_ice,
		dragon: row.special_dragon,
		dark: row.special_dark,
		fairy: row.special_fairy,
	},
	path: {
		name: row.path_name,
		resource: row.path_resource,
		customFeatures: {
			level2: {
				description: row.path_rank_1_desc,
			},
			level5: {
				name: row.path_rank_2_name,
				description: row.path_rank_2_desc,
			},
			level9: {
				name: row.path_rank_3_name,
				description: row.path_rank_3_desc,
			},
			level15: {
				name: row.path_rank_4_name,
				description: row.path_rank_4_desc,
			},
		},
	},
	feats: [],
})

type PokemonRow = {
	id: number,
	trainer_id: string,
	species: string,
	nickname: string,
	type: string[],
	nature: string,
	level: number,
	gender: string,
	strength: number,
	dexterity: number,
	constitution: number,
	intelligence: number,
	wisdom: number,
	charisma: number,
	ac: number,
	hp_cur: number,
	hp_max: number,
	hit_dice_cur: number,
	hit_dice_max: number,
	prof_athletics: boolean,
	prof_acrobatics: boolean,
	prof_sleight_of_hand: boolean,
	prof_stealth: boolean,
	prof_arcana: boolean,
	prof_history: boolean,
	prof_investigation: boolean,
	prof_nature: boolean,
	prof_religion: boolean,
	prof_animal_handling: boolean,
	prof_insight: boolean,
	prof_medicine: boolean,
	prof_perception: boolean,
	prof_survival: boolean,
	prof_deception: boolean,
	prof_intimidation: boolean,
	prof_performance: boolean,
	prof_persuasion: boolean,
	save_str: boolean,
	save_dex: boolean,
	save_con: boolean,
	save_int: boolean,
	save_wis: boolean,
	save_cha: boolean,
	ability: string,
	notes: string,
	tera_type: string,
	exp: number,
	status: string | null,
	held_item: string,
	is_shiny: boolean,
	custom_size: string | null,
	hit_dice_size: string | null,
	speed_walking: number | null,
	speed_climbing: number | null,
	speed_swimming: number | null,
	speed_flying: number | null,
	speed_hover: number | null,
	speed_burrowing: number | null,
	sense_darkvision: number | null,
	sense_blindsight: number | null,
	sense_tremorsense: number | null,
	sense_truesight: number | null,
	bond_level: number,
	bond_points_cur: number,
	bond_points_max: number,
	rank_athletics: number,
	rank_acrobatics: number,
	rank_sleight_of_hand: number,
	rank_stealth: number,
	rank_arcana: number,
	rank_history: number,
	rank_investigation: number,
	rank_nature: number,
	rank_religion: number,
	rank_animal_handling: number,
	rank_insight: number,
	rank_medicine: number,
	rank_perception: number,
	rank_survival: number,
	rank_deception: number,
	rank_intimidation: number,
	rank_performance: number,
	rank_persuasion: number,
	avatar_filename?: string,
}

const booleansToList = <T extends string>(obj: { [key in T]: boolean }): T[] =>
	Object.entries(obj)
		.filter(([, val]) => val)
		.map(([key]) => key as T)

/**
 * Temporary until proficiency is redundant. Needed since we
 * must transition from the Old Ways to the New Ways
 */
const consolidateSkillRankProfAndRank = (ranks: Record<Skill, [boolean, number]>): SkillRanks =>
	new SkillRanks(Object.entries(ranks)
		.reduce((result, [key, [proficient, rank]]) => ({
			...result,
			[key]: rank > 0 ? rank : (proficient ? 1 : 0),
		}), {} as Data<SkillRanks>),
	)

const rowToPokemon = (row: PokemonRow, getStorageResource: (name: string) => StorageResource): TrainerPokemon => ({
	id: row.id.toString(),
	trainerId: row.trainer_id,
	pokemonId: new SpeciesIdentifier(row.species),
	nickname: row.nickname,
	type: new PokemonType(row.type.filter(PokemonType.isPokeType)),
	nature: new Nature(row.nature),
	level: new Level(row.level),
	exp: row.exp,
	gender: row.gender as PokemonGender,
	attributes: new Attributes({
		str: row.strength,
		dex: row.dexterity,
		con: row.constitution,
		int: row.intelligence,
		wis: row.wisdom,
		cha: row.charisma,
	}),
	ac: row.ac,
	hp: {
		current: row.hp_cur,
		max: row.hp_max,
	},
	hitDice: {
		current: row.hit_dice_cur,
		max: row.hit_dice_max,
	},
	ability: row.ability,
	proficiencies: consolidateSkillRankProfAndRank({
		"athletics": [row.prof_athletics, row.rank_athletics],
		"acrobatics": [row.prof_acrobatics, row.rank_acrobatics ],
		"sleight of hand": [row.prof_sleight_of_hand, row.rank_sleight_of_hand ],
		"stealth": [row.prof_stealth, row.rank_stealth ],
		"arcana": [row.prof_arcana, row.rank_arcana ],
		"history": [row.prof_history, row.rank_history ],
		"investigation": [row.prof_investigation, row.rank_investigation ],
		"nature": [row.prof_nature, row.rank_nature ],
		"religion": [row.prof_religion, row.rank_religion ],
		"animal handling": [row.prof_animal_handling, row.rank_animal_handling ],
		"insight": [row.prof_insight, row.rank_insight ],
		"medicine": [row.prof_medicine, row.rank_medicine ],
		"perception": [row.prof_perception, row.rank_perception ],
		"survival": [row.prof_survival, row.rank_survival ],
		"deception": [row.prof_deception, row.rank_deception ],
		"intimidation": [row.prof_intimidation, row.rank_intimidation ],
		"performance": [row.prof_performance, row.rank_performance ],
		"persuasion": [row.prof_persuasion, row.rank_persuasion ],
	}),
	savingThrows: booleansToList<Attribute>({
		str: row.save_str,
		dex: row.save_dex,
		con: row.save_con,
		int: row.save_int,
		wis: row.save_wis,
		cha: row.save_cha,
	}),
	moves: [],
	items: [],
	notes: row.notes,
	teraType: PokemonTeraType.isTeraType(row.tera_type) ? new PokemonTeraType(row.tera_type) : undefined,
	status: row.status as NonVolatileStatus | null,
	isShiny: row.is_shiny,
	feats: [],
	customSize: isCreatureSize(row.custom_size) ? row.custom_size : undefined,
	customHitDiceSize: HitDice.isHitDice(row.hit_dice_size) ? new HitDice(row.hit_dice_size) : undefined,
	speeds: new Speeds({
		walking: row.speed_walking,
		climbing: row.speed_climbing,
		swimming: row.speed_swimming,
		flying: row.speed_flying,
		hover: row.speed_hover,
		burrowing: row.speed_burrowing,
	}),
	senses: new Senses({
		darkvision: row.sense_darkvision,
		blindsight: row.sense_blindsight,
		tremorsense: row.sense_tremorsense,
		truesight: row.sense_truesight,
	}),
	bond: {
		level: row.bond_level,
		points: {
			current: row.bond_points_cur,
			max: row.bond_points_max,
		},
	},
	avatar: row.avatar_filename ? getStorageResource(row.avatar_filename) : undefined,
})

type MoveRow = {
	id: string,
	move_id: string,
	pp_cur: number,
	pp_max: number,
	notes: string | undefined,
}

const rowToMove = (row: MoveRow): LearnedMove => ({
	id: row.id.toString(),
	moveId: row.move_id,
	pp: {
		current: row.pp_cur,
		max: row.pp_max,
	},
	notes: row.notes,
})

type HeldItemRow = {
	id: string,
	item_id: string | null,
	custom_name: string | null,
	description: string | null,
}

const rowToHeldItem = (row: HeldItemRow): HeldItem => ({
	id: row.id.toString(),
	type: row.item_id != null ? "standard" : "custom",
	itemId: row.item_id,
	name: row.custom_name,
	description: row.description,
})

type InventoryItemRow = {
	id: string,
	item_id: string | null,
	quantity: number,
	custom_name: string | null,
	description: string | null,
}

const rowToInventoryItem = (row: InventoryItemRow): InventoryItem => ({
	id: row.id.toString(),
	type: row.item_id != null ? "standard" : "custom",
	itemId: row.item_id,
	quantity: row.quantity,
	name: row.custom_name,
	description: row.description,
})

type TrainerFeatRow = {
	id: string,
	feat_name: string,
	description: string | null,
	is_custom: boolean,
}

const rowToTrainerFeat = (row: TrainerFeatRow): ChosenFeat => ({
	id: row.id.toString(),
	name: row.feat_name,
	description: row.description,
	isCustom: row.is_custom,
})

type PokemonFeatRow = {
	id: string,
	feat_name: string,
	description: string | null,
	is_custom: boolean,
}

const rowToPokemonFeat = (row: PokemonFeatRow): ChosenFeat => ({
	id: row.id.toString(),
	name: row.feat_name,
	description: row.description,
	isCustom: row.is_custom,
})

type PostUserAssetsResponseBody = {
	values: {
		filename: string,
		uploadUrl: string,
	},
}
