import {
	type TrainerId,
	type Trainer,
	type ReadWriteKey,
	type TrainerPokemon,
	type TrainerInfo,
	Gender,
	Natures,
	type WithWriteKey,
	type LearnedMove,
	type PokemonId,
} from "../types"
import type { Skill, Attribute } from "$lib/dnd/types"
import type { Pokemon } from "$lib/creatures/types"
import { TrainerDataProviderError, type TrainerData, type TrainerDataProvider } from "."
import type { SupabaseClient } from "@supabase/supabase-js"
import { isPokeType, type TeraPokeType } from "$lib/pokemon/types"

export class SupabaseTrainerProvider implements TrainerDataProvider {
	constructor(private supabase: SupabaseClient) {}

	allTrainers = async (): Promise<Trainer[]> => {
		return Promise.all(getReadKeys().map((key) => this.supabase.rpc("get_trainer", { _read_key: key })
			.maybeSingle<TrainerRow>()
			.then(({ data, error }) => {
				if (error) {
					throw new TrainerDataProviderError("Could not get trainer.", error)
				}

				if (!data) return undefined

				return rowToTrainer(data)
			})),
		).then((trainers) => trainers.filter((it) => it != null))
	}
    
	getTrainer = async (readKey: ReadWriteKey): Promise<undefined | TrainerData> => {
		const trainer = await this.supabase.rpc("get_trainer", { _read_key: readKey })
			.maybeSingle<TrainerRow>()
			.then(({ data, error }) => {
				if (error) {
					throw new TrainerDataProviderError("Could not get trainer.", error)
				}

				if (!data) return undefined

				return rowToTrainer(data)
			})
        
		if (!trainer) return undefined

		addReadKey(readKey)
    
		const pokemon: TrainerPokemon[] = await this.supabase.rpc("get_pokemon", { _trainer_id: trainer.id })
			.select()
			.then(({ data, error }) => {
				if (error) {
					throw new TrainerDataProviderError("Could not trainer's pokemon.", error)
				}

				return data.map((it) => rowToPokemon(it))
			})
			.then((pokemon) => Promise.all(pokemon.map((thePokemon) => {
				return this.getMoveset(thePokemon.id).then((moves) => ({
					...thePokemon,
					moves,
				}))
			})))
    
		const writeKey = getWriteKey(readKey)
    
		return {
			info: trainer,
			pokemon,
			writeKey,
		}
	}

	newTrainer = async (info: Pick<TrainerInfo, "name" | "description">): Promise<TrainerData & WithWriteKey> => {
		const toCreate: TrainerInfo = {
			...info,
			level: 1,
			ac: 10,
			hp: {
				current: 8,
				max: 8,
			},
			hitDice: {
				current: 1,
				max: 1,
			},
			attributes: {
				str: 10,
				dex: 10,
				con: 10,
				int: 10,
				wis: 10,
				cha: 10,
			},
			proficiencies: ["animal handling"],
			savingThrows: ["cha"],
		}

		const { data, error } = await this.supabase.rpc("new_trainer", {
			_name: toCreate.name,
			_description: toCreate.description,
			_level: toCreate.level,
			_strength: toCreate.attributes.str,
			_dexterity: toCreate.attributes.dex,
			_constitution: toCreate.attributes.con,
			_intelligence: toCreate.attributes.int,
			_wisdom: toCreate.attributes.wis,
			_charisma: toCreate.attributes.cha,
			_ac: toCreate.ac,
			_hp_cur: toCreate.hp.current,
			_hp_max: toCreate.hp.max,
			_hit_dice_cur: toCreate.hitDice.current,
			_hit_dice_max: toCreate.hitDice.max,
			_prof_athletics: toCreate.proficiencies.includes("athletics"),
			_prof_acrobatics: toCreate.proficiencies.includes("acrobatics"),
			_prof_sleight_of_hand: toCreate.proficiencies.includes("sleight of hand"),
			_prof_stealth: toCreate.proficiencies.includes("stealth"),
			_prof_arcana: toCreate.proficiencies.includes("arcana"),
			_prof_history: toCreate.proficiencies.includes("history"),
			_prof_investigation: toCreate.proficiencies.includes("investigation"),
			_prof_nature: toCreate.proficiencies.includes("nature"),
			_prof_religion: toCreate.proficiencies.includes("religion"),
			_prof_animal_handling: toCreate.proficiencies.includes("animal handling"),
			_prof_insight: toCreate.proficiencies.includes("insight"),
			_prof_medicine: toCreate.proficiencies.includes("medicine"),
			_prof_perception: toCreate.proficiencies.includes("perception"),
			_prof_survival: toCreate.proficiencies.includes("survival"),
			_prof_deception: toCreate.proficiencies.includes("deception"),
			_prof_intimidation: toCreate.proficiencies.includes("intimidation"),
			_prof_performance: toCreate.proficiencies.includes("performance"),
			_prof_persuasion: toCreate.proficiencies.includes("persuasion"),
			_save_str: toCreate.savingThrows.includes("str"),
			_save_dex: toCreate.savingThrows.includes("dex"),
			_save_con: toCreate.savingThrows.includes("con"),
			_save_int: toCreate.savingThrows.includes("int"),
			_save_wis: toCreate.savingThrows.includes("wis"),
			_save_cha: toCreate.savingThrows.includes("cha"),
		}).single<{
			ret_id: string,
			ret_read_key: string,
			ret_write_key: string,
		}>()

		if (error) {
			throw new TrainerDataProviderError("Could not create trainer.", error)
		}

		addReadKey(data.ret_read_key)
		addWriteKey(data.ret_read_key, data.ret_write_key)

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
			_level: info.level,
			_strength: info.attributes.str,
			_dexterity: info.attributes.dex,
			_constitution: info.attributes.con,
			_intelligence: info.attributes.int,
			_wisdom: info.attributes.wis,
			_charisma: info.attributes.cha,
			_ac: info.ac,
			_hp_cur: info.hp.current,
			_hp_max: info.hp.max,
			_hit_dice_cur: info.hitDice.current,
			_hit_dice_max: info.hitDice.max,
			_prof_athletics: info.proficiencies.includes("athletics"),
			_prof_acrobatics: info.proficiencies.includes("acrobatics"),
			_prof_sleight_of_hand: info.proficiencies.includes("sleight of hand"),
			_prof_stealth: info.proficiencies.includes("stealth"),
			_prof_arcana: info.proficiencies.includes("arcana"),
			_prof_history: info.proficiencies.includes("history"),
			_prof_investigation: info.proficiencies.includes("investigation"),
			_prof_nature: info.proficiencies.includes("nature"),
			_prof_religion: info.proficiencies.includes("religion"),
			_prof_animal_handling: info.proficiencies.includes("animal handling"),
			_prof_insight: info.proficiencies.includes("insight"),
			_prof_medicine: info.proficiencies.includes("medicine"),
			_prof_perception: info.proficiencies.includes("perception"),
			_prof_survival: info.proficiencies.includes("survival"),
			_prof_deception: info.proficiencies.includes("deception"),
			_prof_intimidation: info.proficiencies.includes("intimidation"),
			_prof_performance: info.proficiencies.includes("performance"),
			_prof_persuasion: info.proficiencies.includes("persuasion"),
			_save_str: info.savingThrows.includes("str"),
			_save_dex: info.savingThrows.includes("dex"),
			_save_con: info.savingThrows.includes("con"),
			_save_int: info.savingThrows.includes("int"),
			_save_wis: info.savingThrows.includes("wis"),
			_save_cha: info.savingThrows.includes("cha"),
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not update trainer.", error)
		}

		if (data <= 0) {
			throw new TrainerDataProviderError("Either this trainer does not exist or you do not have permission to edit them.")
		}

		return data > 0
	}

	removeTrainer = async (id: TrainerId, readKey: ReadWriteKey): Promise<void> => {
		removeWriteKey(readKey)
		removeReadKey(readKey)
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

		removeWriteKey(readKey)
		removeReadKey(readKey)
    
		return data > 0
	}

	updatePokemon = async (writeKey: ReadWriteKey, info: TrainerPokemon): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("update_pokemon", {
			_write_key: writeKey,
			_id: parseInt(info.id),
			_species: info.pokemonId,
			_nickname: info.nickname,
			_type: info.type,
			_nature: info.nature,
			_level: info.level,
			_gender: info.gender,
			_strength: info.attributes.str,
			_dexterity: info.attributes.dex,
			_constitution: info.attributes.con,
			_intelligence: info.attributes.int,
			_wisdom: info.attributes.wis,
			_charisma: info.attributes.cha,
			_ac: info.ac,
			_hp_cur: info.hp.current,
			_hp_max: info.hp.max,
			_hit_dice_cur: info.hitDice.current,
			_hit_dice_max: info.hitDice.max,
			_prof_athletics: info.proficiencies.includes("athletics"),
			_prof_acrobatics: info.proficiencies.includes("acrobatics"),
			_prof_sleight_of_hand: info.proficiencies.includes("sleight of hand"),
			_prof_stealth: info.proficiencies.includes("stealth"),
			_prof_arcana: info.proficiencies.includes("arcana"),
			_prof_history: info.proficiencies.includes("history"),
			_prof_investigation: info.proficiencies.includes("investigation"),
			_prof_nature: info.proficiencies.includes("nature"),
			_prof_religion: info.proficiencies.includes("religion"),
			_prof_animal_handling: info.proficiencies.includes("animal handling"),
			_prof_insight: info.proficiencies.includes("insight"),
			_prof_medicine: info.proficiencies.includes("medicine"),
			_prof_perception: info.proficiencies.includes("perception"),
			_prof_survival: info.proficiencies.includes("survival"),
			_prof_deception: info.proficiencies.includes("deception"),
			_prof_intimidation: info.proficiencies.includes("intimidation"),
			_prof_performance: info.proficiencies.includes("performance"),
			_prof_persuasion: info.proficiencies.includes("persuasion"),
			_save_str: info.savingThrows.includes("str"),
			_save_dex: info.savingThrows.includes("dex"),
			_save_con: info.savingThrows.includes("con"),
			_save_int: info.savingThrows.includes("int"),
			_save_wis: info.savingThrows.includes("wis"),
			_save_cha: info.savingThrows.includes("cha"),
			_ability: info.ability,
			_notes: info.notes,
			_tera_type: info.teraType,
			_exp: 0,
			_status: null,
			_held_item: null,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not update pokemon.", error)
		}

		if (data <= 0) {
			throw new TrainerDataProviderError("Either this pokemon does not exist or you do not have permission to edit them.")
		}
    
		return data > 0
	}

	addPokemonToTeam = async (writeKey: ReadWriteKey, trainerId: TrainerId, pokemon: Pokemon): Promise<TrainerPokemon> => {
		const trainerPokemon: Omit<TrainerPokemon, "id"> = {
			trainerId: trainerId,
			pokemonId: pokemon.id,
			nickname: pokemon.name,
			type: pokemon.type,
			nature: Natures[0],
			level: pokemon.minLevel,
			gender: Gender.None,
			attributes: pokemon.attributes,
			ac: pokemon.ac,
			ability: pokemon.abilities[0]?.id,
			hp: {
				current: pokemon.hp,
				max: pokemon.hp,
			},
			hitDice: {
				current: pokemon.minLevel,
				max: pokemon.minLevel,
			},
			proficiencies: pokemon.skills,
			savingThrows: pokemon.savingThrows,
			moves: [],
			notes: "",
			teraType: pokemon.type[0],
		}
    
		const { data, error } = await this.supabase.rpc("add_pokemon", {
			_write_key: writeKey,
			_nickname: pokemon.name,
			_species: pokemon.id,
			_nature: Natures[0],
			_type: pokemon.type,
			_level: pokemon.minLevel,
			_gender: Gender.None,
			_strength: pokemon.attributes.str,
			_dexterity: pokemon.attributes.dex,
			_constitution: pokemon.attributes.con,
			_intelligence: pokemon.attributes.int,
			_wisdom: pokemon.attributes.wis,
			_charisma: pokemon.attributes.cha,
			_ac: pokemon.ac,
			_hp_cur: pokemon.hp,
			_hp_max: pokemon.hp,
			_hit_dice_cur: pokemon.minLevel,
			_hit_dice_max: pokemon.minLevel,
			_prof_athletics: pokemon.skills.includes("athletics"),
			_prof_acrobatics: pokemon.skills.includes("acrobatics"),
			_prof_sleight_of_hand: pokemon.skills.includes("sleight of hand"),
			_prof_stealth: pokemon.skills.includes("stealth"),
			_prof_arcana: pokemon.skills.includes("arcana"),
			_prof_history: pokemon.skills.includes("history"),
			_prof_investigation: pokemon.skills.includes("investigation"),
			_prof_nature: pokemon.skills.includes("nature"),
			_prof_religion: pokemon.skills.includes("religion"),
			_prof_animal_handling: pokemon.skills.includes("animal handling"),
			_prof_insight: pokemon.skills.includes("insight"),
			_prof_medicine: pokemon.skills.includes("medicine"),
			_prof_perception: pokemon.skills.includes("perception"),
			_prof_survival: pokemon.skills.includes("survival"),
			_prof_deception: pokemon.skills.includes("deception"),
			_prof_intimidation: pokemon.skills.includes("intimidation"),
			_prof_performance: pokemon.skills.includes("performance"),
			_prof_persuasion: pokemon.skills.includes("persuasion"),
			_save_str: pokemon.savingThrows.includes("str"),
			_save_dex: pokemon.savingThrows.includes("dex"),
			_save_con: pokemon.savingThrows.includes("con"),
			_save_int: pokemon.savingThrows.includes("int"),
			_save_wis: pokemon.savingThrows.includes("wis"),
			_save_cha: pokemon.savingThrows.includes("cha"),
			_ability: pokemon.abilities[0]?.id,
			_notes: "",
			_tera_type: pokemon.type[0],
			_exp: 0,
			_status: null,
			_held_item: null,
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

	updateMoveset = async (writeKey: ReadWriteKey, pokemonId: PokemonId, newMoveset: LearnedMove[]): Promise<LearnedMove[]> => {
		const existingMoveset = await this.getMoveset(pokemonId)
		const newIds = newMoveset.map((it) => it.id)
		const existingIds = existingMoveset.map((it) => it.id)

		const deletedIds = existingIds.filter((id) => !newIds.includes(id))
		await Promise.all(deletedIds.map((id) => this.supabase.rpc("remove_move", {
			_write_key: writeKey,
			_id: id,
		}).single<number>().then(({ data, error }) => {
			if (error) {
				throw new TrainerDataProviderError("Could not delete move.", error)
			}
            
			if (data <= 0) {
				throw new TrainerDataProviderError("Either this pokemon does not exist or you do not have permission to edit them.")
			}

			return data > 0
		})))

		return await Promise.all(newMoveset.map((move) => {
			if (existingIds.includes(move.id)) {
				return this.supabase.rpc("update_move", {
					_write_key: writeKey,
					_id: move.id,
					_move_id: move.moveId,
					_pp_cur: move.pp.current,
					_pp_max: move.pp.max,
					_notes: move.notes,
				}).single<number>().then(({ data, error }) => {
					if (error) {
						throw new TrainerDataProviderError("Could not update move.", error)
					}

					if (data <= 0) {
						throw new TrainerDataProviderError("Either this pokemon does not exist or you do not have permission to edit them.")
					}

					return { ...move }
				})
			} else {
				return this.supabase.rpc("add_move", {
					_write_key: writeKey,
					_pokemon_id: pokemonId,
					_move_id: move.moveId,
					_pp_cur: move.pp.current,
					_pp_max: move.pp.max,
					_notes: move.notes,
				}).single<string>().then(({ data, error }) => {
					if (error) {
						throw new TrainerDataProviderError("Could not add move.", error)
					}

					return {
						...move,
						id: data,
					}
				})
			}
		}))
	}

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

	verifyWriteKey = async (trainer: Trainer, writeKey: ReadWriteKey): Promise<boolean> => {
		const { data, error } = await this.supabase.rpc("verify_write_key", {
			_id: trainer.id,
			_write_key: writeKey,
		}).single<number>()

		if (error) {
			throw new TrainerDataProviderError("Could not verify trainer.", error)
		}

		if (data > 0) {
			addWriteKey(trainer.readKey, writeKey)
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
}

export const getReadKeys = (): ReadWriteKey[] =>
	localStorage.getItem("trainers")?.split(",")?.filter((it) => it !== "") ?? []

export const addReadKey = (key: ReadWriteKey) => {
	const previous = getReadKeys()
	const newList = [...new Set(previous.concat(key))]
	localStorage.setItem("trainers", newList.join(","))
}

export const removeReadKey = (key: ReadWriteKey) => {
	const previous = getReadKeys()
	const newList = previous.filter((it) => it !== key)
	localStorage.setItem("trainers", newList.join(","))
}

export const getWriteKey = (readKey: ReadWriteKey): ReadWriteKey | undefined =>
	localStorage.getItem(`write:${readKey}`)

export const addWriteKey = (readKey: ReadWriteKey, writeKey: ReadWriteKey) => {
	localStorage.setItem(`write:${readKey}`, writeKey)
}

export const removeWriteKey = (readKey: ReadWriteKey) => {
	localStorage.removeItem(`write:${readKey}`)
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
}

const rowToTrainer = (row: TrainerRow): Trainer => ({
	id: row.id,
	readKey: row.read_key,
	name: row.name,
	description: row.description,
	level: row.level,
	attributes: {
		str: row.strength,
		dex: row.dexterity,
		con: row.constitution,
		int: row.intelligence,
		wis: row.wisdom,
		cha: row.charisma,
	},
	ac: row.ac,
	hp: {
		current: row.hp_cur,
		max: row.hp_max,
	},
	hitDice: {
		current: row.hit_dice_cur,
		max: row.hit_dice_max,
	},
	proficiencies: booleansToList<Skill>({
		"athletics": row.prof_athletics,
		"acrobatics": row.prof_acrobatics,
		"sleight of hand": row.prof_sleight_of_hand,
		"stealth": row.prof_stealth,
		"arcana": row.prof_arcana,
		"history": row.prof_history,
		"investigation": row.prof_investigation,
		"nature": row.prof_nature,
		"religion": row.prof_religion,
		"animal handling": row.prof_animal_handling,
		"insight": row.prof_insight,
		"medicine": row.prof_medicine,
		"perception": row.prof_perception,
		"survival": row.prof_survival,
		"deception": row.prof_deception,
		"intimidation": row.prof_intimidation,
		"performance": row.prof_performance,
		"persuasion": row.prof_persuasion,
	}),
	savingThrows: booleansToList<Attribute>({
		str: row.save_str,
		dex: row.save_dex,
		con: row.save_con,
		int: row.save_int,
		wis: row.save_wis,
		cha: row.save_cha,
	}),
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
	status: string,
	held_item: string,
}

const booleansToList = <T extends string>(obj: { [key in T]: boolean }): T[] =>
	Object.entries(obj)
		.filter(([, val]) => val)
		.map(([key]) => key as T)

const rowToPokemon = (row: PokemonRow): TrainerPokemon => ({
	id: row.id.toString(),
	trainerId: row.trainer_id,
	pokemonId: row.species,
	nickname: row.nickname,
	type: row.type.filter(isPokeType),
	nature: row.nature,
	level: row.level,
	gender: row.gender as Gender,
	attributes: {
		str: row.strength,
		dex: row.dexterity,
		con: row.constitution,
		int: row.intelligence,
		wis: row.wisdom,
		cha: row.charisma,
	},
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
	proficiencies: booleansToList<Skill>({
		"athletics": row.prof_athletics,
		"acrobatics": row.prof_acrobatics,
		"sleight of hand": row.prof_sleight_of_hand,
		"stealth": row.prof_stealth,
		"arcana": row.prof_arcana,
		"history": row.prof_history,
		"investigation": row.prof_investigation,
		"nature": row.prof_nature,
		"religion": row.prof_religion,
		"animal handling": row.prof_animal_handling,
		"insight": row.prof_insight,
		"medicine": row.prof_medicine,
		"perception": row.prof_perception,
		"survival": row.prof_survival,
		"deception": row.prof_deception,
		"intimidation": row.prof_intimidation,
		"performance": row.prof_performance,
		"persuasion": row.prof_persuasion,
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
	notes: row.notes,
	teraType: row.tera_type as TeraPokeType,
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
