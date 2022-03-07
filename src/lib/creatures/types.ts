import type { PokeType } from '../pokemon/types'
import type { Attribute, CreatureSize, HitDice, Skill } from '../dnd/types'

export type Pokemon = {
    id: string,
    name: string,
    number: number,
    type: PokeType[],
    size: CreatureSize,
    sr: string,
    minLevel: number,
    eggGroup: string[],
    gender: string,
    description: string,
    ac: number,
    hp: number,
    hitDice: HitDice,
    speed: {
        type: string,
        value: number,
    }[],
    attributes: {
        str: number,
        dex: number,
        con: number,
        int: number,
        wis: number,
        cha: number,
    },
    skills: Skill[],
    savingThrows: Attribute[],
    abilities: {
        name: string,
        description: string,
        hidden?: boolean,
    }[],
    evolution?: {
        stage: number,
        maxStage: number,
        description: string,
    },
    moves: {
        start: string[],
        level2: string[],
        level6: string[],
        level10: string[],
        level14: string[],
        level18: string[],
        egg: string[],
        tm: number[],
    },
}
