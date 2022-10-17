import type { PlayerPokemon, Trainer } from './types'
import { Gender } from './types'

export const inMemoryPokemon: PlayerPokemon[] = [ {
    id: '1',
    trainerId: 'Renibel',
    pokemonId: 'mimikyu',
    nickname: 'Pikachu',
    level: 11,
    gender: Gender.Male,
    attributes: {
        str: 10,
        dex: 14,
        con: 16,
        int: 6,
        wis: 18,
        cha: 13,
    },
    ac: 17,
    hp: {
        current: 44,
        max: 97,
    },
    hitDice: {
        current: 11,
        max: 11,
    },
    proficiencies: ['arcana', 'intimidation', 'performance'],
    savingThrows: ['wis', 'cha'],
    moves: [ {
        moveId: 'mimic',
        pp: {
            current: 5,
            max: 5,
        },
        notes: '2d8 + 10 ghost'
    }, {
        moveId: 'astonish',
        pp: {
            current: 10,
            max: 10,
        },
    }, {
        moveId: 'copycat',
        pp: {
            current: 10,
            max: 10,
        },
    }, {
        moveId: 'protect',
        pp: {
            current: 3,
            max: 3,
        },
    }, {
        moveId: 'charm',
        pp: {
            current: 10,
            max: 10,
        },
    } ],
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
    moves: [ {
        moveId: 'psychic',
        pp: {
            current: 5,
            max: 5,
        },
    }, {
        moveId: 'teleport',
        pp: {
            current: 10,
            max: 10,
        },
    }, {
        moveId: 'heal-pulse',
        pp: {
            current: 5,
            max: 5,
        },
    }, {
        moveId: 'magical-leaf',
        pp: {
            current: 5,
            max: 5,
        },
    } ],
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
    moves: [ {
        moveId: 'hex',
        pp: {
            current: 5,
            max: 5,
        },
    }, {
        moveId: 'smog',
        pp: {
            current: 5,
            max: 5,
        },
    }, {
        moveId: 'will-o-wisp',
        pp: {
            current: 10,
            max: 10,
        },
    }, {
        moveId: 'flame-burst',
        pp: {
            current: 10,
            max: 10,
        },
    } ],
} ]

export const inMemoryTrainers: Trainer[] = [ {
    name: 'Renibel',
    pokemon: inMemoryPokemon.filter(p => p.trainerId === 'Renibel'),
} ]
