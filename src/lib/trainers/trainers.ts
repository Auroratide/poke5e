import type { TrainerId, Trainer, ReadWriteKey, TrainerPokemon, Gender } from './types'
import { supabase } from '../supabase'
import type { Skill, Attribute } from '$lib/dnd/types'

export type TrainerData = {
    info: Trainer,
    pokemon: TrainerPokemon[],
    writable: boolean,
}

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
    nickname?: string,
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

export const getTrainer = async (readKey: ReadWriteKey): Promise<undefined | TrainerData> => {
    const trainer = await supabase.rpc('get_trainer', { _read_key: readKey })
        .maybeSingle()
        .then(({ data, error }) => {
            if (!data) return undefined
            return rowToTrainer(data)
        })
    
    if (!trainer) return undefined

    const pokemon = await supabase.rpc('get_pokemon', { _trainer_id: trainer.id })
        .select()
        .then(({ data, error }) => {
            return data.map((it) => rowToPokemon(it))
        })

    const writeId = getWriteKey(readKey)

    return {
        info: trainer,
        pokemon,
        writable: writeId?.length > 0,
    }
}
