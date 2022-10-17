import type { Skill, Attribute } from '../dnd/types'
import type { Pokemon } from '../creatures/types'
import type { Move } from '$lib/moves/types'

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

export type LearnedMove = {
    moveId: string,
    pp: Resource,
    notes?: string,
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
    moves: LearnedMove[],
}

export type WithPokemonData = {
    pokemonData: Pokemon,
}

export type WithMoveData = {
    moveData: {
        [key: string]: Move
    }
}

export type TrainerId = string

export type Trainer = {
    name: TrainerId,
    pokemon: PlayerPokemon[],
}
