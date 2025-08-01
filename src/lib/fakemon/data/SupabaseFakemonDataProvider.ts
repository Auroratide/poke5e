import type { PostgrestError, SupabaseClient } from "@supabase/supabase-js"
import { FakemonDataProviderError, FakemonPermissionError, type FakemonDataProvider, type ReadKey } from "./FakemonDataProvider"
import { Fakemon, type DraftFakemon } from "../Fakemon"
import { PokemonType } from "$lib/pokemon/types-2"
import type { Attribute } from "$lib/dnd/attributes"
import { isCreatureSize } from "$lib/dnd/CreatureSize"
import type { Data } from "$lib/DataClass"
import { HitDice } from "$lib/dnd/hit-dice"
import { GenderRatio } from "$lib/creatures/gender"

export class SupabaseFakemonDataProvider implements FakemonDataProvider {
	constructor(private readonly supabase: SupabaseClient) {}

	async getByReadKey(readKey: ReadKey): Promise<Fakemon | undefined> {
		return this.supabase.rpc("get_fakemon", { _read_key: readKey })
			.maybeSingle<FakemonRow>()
			.then(({ data, error }) => {
				this.validateError("Could not get fakemon.", error)

				if (!data) return undefined

				return rowToFakemon(data)
			})
	}

	async add(draft: DraftFakemon): Promise<Fakemon> {
		const { data, error } = await this.supabase.rpc("new_fakemon",
			this.toQuery(draft),
		).single<{
			ret_id: string,
			ret_read_key: string,
			ret_write_key: string,
		}>()

		this.validateError("Could not add fakemon.", error)

		return new Fakemon({
			...draft,
			id: data.ret_id,
			readKey: data.ret_read_key,
			writeKey: data.ret_write_key,
		})
	}

	async update(fakemon: Fakemon): Promise<boolean> {
		const writeKey = fakemon.data.writeKey
		if (writeKey == null) throw new FakemonPermissionError()

		const { data, error } = await this.supabase.rpc("update_fakemon", {
			_write_key: writeKey,
			...this.toQuery(fakemon.data),
		}).single<number>()

		this.validateError("Could not edit fakemon.", error)

		return data > 0
	}

	private validateError(message: string, e: PostgrestError | undefined) {
		if (e) {
			 
			console.error(e)
			throw new FakemonDataProviderError(message)
		}
	}

	private toQuery(fakemon: Omit<Data<Fakemon>, "id" | "readKey" | "writeKey">): object {
		return {
			_species_name: fakemon.speciesName,
			_type: fakemon.type,
			_size: fakemon.size,
			_sr: fakemon.sr,
			_min_level: fakemon.minLevel,
			_egg_groups: fakemon.eggGroups,
			_gender: fakemon.gender.data,
			_description: fakemon.description,
			_ac: fakemon.ac,
			_hp: fakemon.hp,
			_hit_dice: fakemon.hitDice.data,
			_speed_walking: fakemon.speed.walking,
			_speed_climbing: fakemon.speed.climbing,
			_speed_swimming: fakemon.speed.swimming,
			_speed_flying: fakemon.speed.flying,
			_speed_hover: fakemon.speed.hover,
			_speed_burrowing: fakemon.speed.burrowing,
			_sense_darkvision: fakemon.senses.darkvision,
			_sense_blindsight: fakemon.senses.blindsight,
			_sense_tremorsense: fakemon.senses.tremorsense,
			_sense_truesight: fakemon.senses.truesight,
			_strength: fakemon.attributes.str,
			_dexterity: fakemon.attributes.dex,
			_constitution: fakemon.attributes.con,
			_intelligence: fakemon.attributes.int,
			_wisdom: fakemon.attributes.wis,
			_charisma: fakemon.attributes.cha,
			_prof_athletics: fakemon.skills["athletics"] > 0,
			_prof_acrobatics: fakemon.skills["acrobatics"] > 0,
			_prof_sleight_of_hand: fakemon.skills["sleight of hand"] > 0,
			_prof_stealth: fakemon.skills["stealth"] > 0,
			_prof_arcana: fakemon.skills["arcana"] > 0,
			_prof_history: fakemon.skills["history"] > 0,
			_prof_investigation: fakemon.skills["investigation"] > 0,
			_prof_nature: fakemon.skills["nature"] > 0,
			_prof_religion: fakemon.skills["religion fakemon"] > 0,
			_prof_animal_handling: fakemon.skills["animal handling"] > 0,
			_prof_insight: fakemon.skills["insight"] > 0,
			_prof_medicine: fakemon.skills["medicine"] > 0,
			_prof_perception: fakemon.skills["perception"] > 0,
			_prof_survival: fakemon.skills["survival"] > 0,
			_prof_deception: fakemon.skills["deception"] > 0,
			_prof_intimidation: fakemon.skills["intimidation"] > 0,
			_prof_performance: fakemon.skills["performance"] > 0,
			_prof_persuasion: fakemon.skills["persuasion"] > 0,
			_save_str: fakemon.saves.includes("str"),
			_save_dex: fakemon.saves.includes("dex"),
			_save_con: fakemon.saves.includes("con"),
			_save_int: fakemon.saves.includes("int"),
			_save_wis: fakemon.saves.includes("wis"),
			_save_cha: fakemon.saves.includes("cha"),
			_abilities: fakemon.abilities.filter((it) => !it.hidden).map((it) => it.id),
			_hidden_abilities: fakemon.abilities.filter((it) => it.hidden).map((it) => it.id),
			_moves_start: fakemon.moves.start,
			_moves_level2: fakemon.moves.level2,
			_moves_level6: fakemon.moves.level6,
			_moves_level10: fakemon.moves.level10,
			_moves_level14: fakemon.moves.level14,
			_moves_level18: fakemon.moves.level18,
			_moves_egg: fakemon.moves.egg,
			_moves_tm: fakemon.moves.tm,
		}
	}
}

type Uuid = string

type FakemonRow = {
	id: Uuid,
	read_key: string,
   write_key?: string,
	species_name: string,
	type: string[],
	size: string,
	sr: string,
	min_level: number,
	egg_groups: string[],
	gender: string,
	description: string,
	ac: number,
	hp: number,
	hit_dice: string,
	speed_walking: number,
	speed_climbing: number,
	speed_swimming: number,
	speed_flying: number,
	speed_hover: number,
	speed_burrowing: number,
	sense_darkvision: number,
	sense_blindsight: number,
	sense_tremorsense: number,
	sense_truesight: number,
	strength: number,
	dexterity: number,
	constitution: number,
	intelligence: number,
	wisdom: number,
	charisma: number,
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
	abilities: string[],
	hidden_abilities: string[],
	moves_start: string[],
	moves_level2: string[],
	moves_level6: string[],
	moves_level10: string[],
	moves_level14: string[],
	moves_level18: string[],
	moves_egg: string[],
	moves_tm: number[],
}

const booleansToList = <T extends string>(obj: { [key in T]: boolean }): T[] =>
	Object.entries(obj)
		.filter(([, val]) => val)
		.map(([key]) => key as T)

function rowToFakemon(row: FakemonRow): Fakemon {
	return new Fakemon({
		id: row.id,
		readKey: row.read_key,
		writeKey: row.write_key,
		speciesName: row.species_name,
		type: row.type.filter(PokemonType.isPokeType),
		size: isCreatureSize(row.size) ? row.size : "small",
		sr: parseFloat(row.sr),
		minLevel: row.min_level,
		eggGroups: row.egg_groups,
		gender: new GenderRatio(row.gender),
		description: row.description,
		ac: row.ac,
		hp: row.hp,
		hitDice: HitDice.isHitDice(row.hit_dice) ? new HitDice(row.hit_dice) : new HitDice("d6"),
		speed: {
			walking: row.speed_walking,
			swimming: row.speed_swimming,
			climbing: row.speed_climbing,
			flying: row.speed_flying,
			hover: row.speed_hover,
			burrowing: row.speed_burrowing,
		},
		senses: {
			darkvision: row.sense_darkvision,
			blindsight: row.sense_blindsight,
			tremorsense: row.sense_tremorsense,
			truesight: row.sense_truesight,
		},
		attributes: {
			str: row.strength,
			dex: row.dexterity,
			con: row.constitution,
			int: row.intelligence,
			wis: row.wisdom,
			cha: row.charisma,
		},
		skills: {
			"athletics": row.prof_athletics ? 1 : 0,
			"acrobatics": row.prof_acrobatics ? 1 : 0,
			"sleight of hand": row.prof_sleight_of_hand ? 1 : 0,
			"stealth": row.prof_stealth ? 1 : 0,
			"arcana": row.prof_arcana ? 1 : 0,
			"history": row.prof_history ? 1 : 0,
			"investigation": row.prof_investigation ? 1 : 0,
			"nature": row.prof_nature ? 1 : 0,
			"religion": row.prof_religion ? 1 : 0,
			"animal handling": row.prof_animal_handling ? 1 : 0,
			"insight": row.prof_insight ? 1 : 0,
			"medicine": row.prof_medicine ? 1 : 0,
			"perception": row.prof_perception ? 1 : 0,
			"survival": row.prof_survival ? 1 : 0,
			"deception": row.prof_deception ? 1 : 0,
			"intimidation": row.prof_intimidation ? 1 : 0,
			"performance": row.prof_performance ? 1 : 0,
			"persuasion": row.prof_persuasion ? 1 : 0,
		},
		saves: booleansToList<Attribute>({
			str: row.save_str,
			dex: row.save_dex,
			con: row.save_con,
			int: row.save_int,
			wis: row.save_wis,
			cha: row.save_cha,
		}),
		abilities: row.abilities.map((it) => ({
			id: it,
			hidden: false,
		})).concat(row.hidden_abilities.map((it) => ({
			id: it,
			hidden: true,
		}))),
		moves: {
			start: row.moves_start,
			level2: row.moves_level2,
			level6: row.moves_level6,
			level10: row.moves_level10,
			level14: row.moves_level14,
			level18: row.moves_level18,
			egg: row.moves_egg,
			tm: row.moves_tm,
		},
	})
}
