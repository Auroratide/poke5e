import type { PlayerPokemon, Trainer } from './types'
import { Gender } from './types'

export const inMemoryPokemon: PlayerPokemon[] = [ {
    id: '1',
    trainerId: 'Renibel',
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
    proficiencies: ['arcana', 'intimidation', 'performance'],
    savingThrows: ['wis', 'cha'],
}, {
    id: '2',
    trainerId: 'Renibel',
    pokemonId: 'kirlia',
    nickname: 'Curly',
    level: 6,
    gender: Gender.Female,
    attributes: {
        str: 10,
        dex: 14,
        con: 8,
        int: 10,
        wis: 16,
        cha: 12,
    },
    ac: 12,
    hp: {
        current: 44,
        max: 44,
    },
    hitDice: {
        current: 6,
        max: 6,
    },
    proficiencies: ['insight', 'perception',],
    savingThrows: ['wis'],
}, {
    id: '3',
    trainerId: 'Renibel',
    pokemonId: 'litwick',
    nickname: 'Torchee',
    level: 6,
    gender: Gender.Male,
    attributes: {
        str: 12,
        dex: 7,
        con: 15,
        int: 6,
        wis: 13,
        cha: 10,
    },
    ac: 13,
    hp: {
        current: 47,
        max: 47,
    },
    hitDice: {
        current: 6,
        max: 6,
    },
    proficiencies: ['arcana'],
    savingThrows: ['wis'],
} ]

export const inMemoryTrainers: Trainer[] = [ {
    name: 'Renibel',
    pokemon: inMemoryPokemon.filter(p => p.trainerId === 'Renibel'),
} ]
