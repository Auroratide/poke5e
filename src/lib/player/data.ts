import { Gender } from './types'

export const inMemoryPokemon = [ {
    id: '1',
    pokemonId: 'mimikyu',
    nickname: 'Pikachu',
    level: 6,
    gender: Gender.Male,
    attributes: {
        str: 10,
        dex: 14,
        con: 16,
        int: 6,
        wis: 16,
        cha: 12,
    },
    ac: 17,
    hp: {
        current: 44,
        max: 52,
    },
    hitDice: {
        current: 6,
        max: 6,
    },
} ]