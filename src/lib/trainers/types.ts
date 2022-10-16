import type { Skill, Attribute } from '../dnd/types'
import type { Pokemon } from '../creatures/types'

export type Resource = {
    current: number,
    max: number,
}

export enum Gender {
    Male = 'male',
    Female = 'female',
    None = 'none',
    Other = 'other',
}

export type PokemonId = string
export type PlayerPokemon = {
    id: PokemonId,
    trainerId: TrainerId,
    pokemonId: string,
    nickname: string,
    level: number,
    gender: Gender,
    attributes: {
        str: number,
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number,
    },
    ac: number,
    hp: Resource,
    hitDice: Resource,
    proficiencies: Skill[],
    savingThrows: Attribute[],
}

export type WithPokemonData = {
    pokemonData: Pokemon,
}

export type TrainerId = string

export type Trainer = {
    name: TrainerId,
    pokemon: PlayerPokemon[],
}
