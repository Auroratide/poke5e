import {
    type TrainerId,
    type Trainer,
    type ReadWriteKey,
    type TrainerPokemon,
    type TrainerInfo,
    Gender,
    Natures,
} from '../types'
import type { Skill, Attribute } from '$lib/dnd/types'
import type { Pokemon } from '$lib/creatures/types'
import type { TrainerData, TrainerDataProvider } from '.'
import type { SupabaseClient } from '@supabase/supabase-js'

export class SupabaseTrainerProvider implements TrainerDataProvider {
    constructor(private supabase: SupabaseClient) {}

    allTrainers = async (): Promise<Trainer[]> => {
        return Promise.all(getReadKeys().map((key) => this.supabase.rpc('get_trainer', { _read_key: key })
            .maybeSingle()
            .then(({ data, error }) => {
                if (!data) return undefined
                return rowToTrainer(data)
            }))
        ).then((trainers) => trainers.filter((it) => it != null))
    }
    
    getTrainer = async (readKey: ReadWriteKey): Promise<undefined | TrainerData> => {
        const trainer = await this.supabase.rpc('get_trainer', { _read_key: readKey })
            .maybeSingle()
            .then(({ data, error }) => {
                if (!data) return undefined
                return rowToTrainer(data)
            })
        
        if (!trainer) return undefined
    
        const pokemon = await this.supabase.rpc('get_pokemon', { _trainer_id: trainer.id })
            .select()
            .then(({ data, error }) => {
                return data.map((it) => rowToPokemon(it))
            })
    
        const writeKey = getWriteKey(readKey)
    
        return {
            info: trainer,
            pokemon,
            writeKey,
        }
    }

    updateTrainerInfo = async (writeKey: ReadWriteKey, info: TrainerInfo): Promise<boolean> => {
        const { data, error } = await this.supabase.rpc('update_trainer', {
            _write_key: writeKey,
            _name: info.name,
            _description: info.description,
        }).single()
    
        return data > 0
    }

    updatePokemon = async (writeKey: ReadWriteKey, info: TrainerPokemon): Promise<boolean> => {
        const { data, error } = await this.supabase.rpc('update_pokemon', {
            _write_key: writeKey,
            _id: parseInt(info.id),
            _species: info.pokemonId,
            _nickname: info.nickname,
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
            _prof_athletics: info.proficiencies.includes('athletics'),
            _prof_acrobatics: info.proficiencies.includes('acrobatics'),
            _prof_sleight_of_hand: info.proficiencies.includes('sleight of hand'),
            _prof_stealth: info.proficiencies.includes('stealth'),
            _prof_arcana: info.proficiencies.includes('arcana'),
            _prof_history: info.proficiencies.includes('history'),
            _prof_investigation: info.proficiencies.includes('investigation'),
            _prof_nature: info.proficiencies.includes('nature'),
            _prof_religion: info.proficiencies.includes('religion'),
            _prof_animal_handling: info.proficiencies.includes('animal handling'),
            _prof_insight: info.proficiencies.includes('insight'),
            _prof_medicine: info.proficiencies.includes('medicine'),
            _prof_perception: info.proficiencies.includes('perception'),
            _prof_survival: info.proficiencies.includes('survival'),
            _prof_deception: info.proficiencies.includes('deception'),
            _prof_intimidation: info.proficiencies.includes('intimidation'),
            _prof_performance: info.proficiencies.includes('performance'),
            _prof_persuasion: info.proficiencies.includes('persuasion'),
            _save_str: info.savingThrows.includes('str'),
            _save_dex: info.savingThrows.includes('dex'),
            _save_con: info.savingThrows.includes('con'),
            _save_int: info.savingThrows.includes('int'),
            _save_wis: info.savingThrows.includes('wis'),
            _save_cha: info.savingThrows.includes('cha'),
        }).single()
    
        return data > 0
    }

    addPokemonToTeam = async (writeKey: ReadWriteKey, trainerId: TrainerId, pokemon: Pokemon): Promise<TrainerPokemon> => {
        const trainerPokemon: Omit<TrainerPokemon, 'id'> = {
            trainerId: trainerId,
            pokemonId: pokemon.id,
            nickname: pokemon.name,
            nature: Natures[0],
            level: pokemon.minLevel,
            gender: Gender.None,
            attributes: pokemon.attributes,
            ac: pokemon.ac,
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
        }
    
        const { data, error } = await this.supabase.rpc('add_pokemon', {
            _write_key: writeKey,
            _nickname: pokemon.name,
            _species: pokemon.id,
            _nature: Natures[0],
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
            _prof_athletics: pokemon.skills.includes('athletics'),
            _prof_acrobatics: pokemon.skills.includes('acrobatics'),
            _prof_sleight_of_hand: pokemon.skills.includes('sleight of hand'),
            _prof_stealth: pokemon.skills.includes('stealth'),
            _prof_arcana: pokemon.skills.includes('arcana'),
            _prof_history: pokemon.skills.includes('history'),
            _prof_investigation: pokemon.skills.includes('investigation'),
            _prof_nature: pokemon.skills.includes('nature'),
            _prof_religion: pokemon.skills.includes('religion'),
            _prof_animal_handling: pokemon.skills.includes('animal handling'),
            _prof_insight: pokemon.skills.includes('insight'),
            _prof_medicine: pokemon.skills.includes('medicine'),
            _prof_perception: pokemon.skills.includes('perception'),
            _prof_survival: pokemon.skills.includes('survival'),
            _prof_deception: pokemon.skills.includes('deception'),
            _prof_intimidation: pokemon.skills.includes('intimidation'),
            _prof_performance: pokemon.skills.includes('performance'),
            _prof_persuasion: pokemon.skills.includes('persuasion'),
            _save_str: pokemon.savingThrows.includes('str'),
            _save_dex: pokemon.savingThrows.includes('dex'),
            _save_con: pokemon.savingThrows.includes('con'),
            _save_int: pokemon.savingThrows.includes('int'),
            _save_wis: pokemon.savingThrows.includes('wis'),
            _save_cha: pokemon.savingThrows.includes('cha'),
        }).single()
    
        if (error) {
            console.error(error)
        }
    
        return {
            ...trainerPokemon,
            id: data.toString()
        }
    }
}

export const getReadKeys = (): ReadWriteKey[] =>
    (localStorage.getItem('trainers') ?? '').split(',')

export const getWriteKey = (id: TrainerId): ReadWriteKey | undefined =>
    localStorage.getItem(`write:${id}`)

type TrainerRow = {
    id: string,
    read_key: string,
    name: string,
    description: string,
}

const rowToTrainer = (row: TrainerRow): Trainer => ({
    id: row.id,
    readKey: row.read_key,
    name: row.name,
    description: row.description,
})

type PokemonRow = {
    id: number,
    trainer_id: string,
    species: string,
    nickname: string,
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
    proficiencies: booleansToList<Skill>({
        'athletics': row.prof_athletics,
        'acrobatics': row.prof_acrobatics,
        'sleight of hand': row.prof_sleight_of_hand,
        'stealth': row.prof_stealth,
        'arcana': row.prof_arcana,
        'history': row.prof_history,
        'investigation': row.prof_investigation,
        'nature': row.prof_nature,
        'religion': row.prof_religion,
        'animal handling': row.prof_animal_handling,
        'insight': row.prof_insight,
        'medicine': row.prof_medicine,
        'perception': row.prof_perception,
        'survival': row.prof_survival,
        'deception': row.prof_deception,
        'intimidation': row.prof_intimidation,
        'performance': row.prof_performance,
        'persuasion': row.prof_persuasion,
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
})
