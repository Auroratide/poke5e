import type { Pokemon } from '$lib/creatures/types'
import type { TrainerData, TrainerDataProvider } from '.'
import {
    type TrainerPokemon,
    type ReadWriteKey,
    type TrainerInfo,
    type TrainerId,
    Natures,
} from '../types'
import { Gender } from '../types'

let ID = 1
const nextId = () => (++ID).toString()
const DEFAULT_INITIAL_ENTRIES: TrainerData[] = [ {
    writeKey: 'QM9M65DPLEBV218UKFNG',
    info: {
        id: 'e2439894-8b10-4081-812c-0f16a773e959',
        readKey: 'YLFN6S3NGOPA',
        name: 'Renibel',
        description: 'A trainer that likes ghosts and urban legends.',
    },
    pokemon: [ {
        id: nextId(),
        trainerId: 'e2439894-8b10-4081-812c-0f16a773e959',
        pokemonId: 'mimikyu',
        nickname: 'Pikachu',
        nature: 'cheerful',
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
        id: nextId(),
        trainerId: 'e2439894-8b10-4081-812c-0f16a773e959',
        pokemonId: 'kirlia',
        nickname: 'Curly',
        nature: 'curious',
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
        id: nextId(),
        trainerId: 'e2439894-8b10-4081-812c-0f16a773e959',
        pokemonId: 'litwick',
        nickname: 'Torchee',
        nature: 'apathetic',
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
}, {
    writeKey: '0DHGNM55DGSU9MLA1J7D',
    info: {
        id: 'f87e5b9a-d011-4194-983d-95c0c8db84fc',
        readKey: '7JD88HNDIURS',
        name: 'Iris',
        description: 'A trainer that likes colors and flowers.',
    },
    pokemon: [],
} ]

export class InMemoryTrainerProvider implements TrainerDataProvider {
    constructor(private entries: TrainerData[] = DEFAULT_INITIAL_ENTRIES) {}

    getTrainer = async (readKey: ReadWriteKey): Promise<TrainerData | undefined> => {
        return this.entries.find((it) => it.info.readKey === readKey)
    }

    updateTrainerInfo = async (writeKey: ReadWriteKey, info: TrainerInfo): Promise<boolean> => {
        if (!writeKey) return false
        
        const trainer = this.entries.find((it) => it.writeKey === writeKey)
        if (trainer) {
            trainer.info = {
                ...trainer.info,
                ...info,
            }

            return true
        } else {
            return false
        }
    }

    updatePokemon = async (writeKey: ReadWriteKey, info: TrainerPokemon): Promise<boolean> => {
        if (!writeKey) return false
        
        const trainer = this.entries.find((it) => it.writeKey === writeKey)
        const pokemonIndex = trainer?.pokemon.findIndex((it) => it.id === info.id)
        if (pokemonIndex != null) {
            trainer.pokemon[pokemonIndex] = {
                ...trainer.pokemon[pokemonIndex],
                ...info,
            }

            return true
        } else {
            return false
        }
    }

    addPokemonToTeam = async (writeKey: ReadWriteKey, trainerId: TrainerId, pokemon: Pokemon): Promise<TrainerPokemon> => {
        if (!writeKey) throw new Error('Invalid write key')
        
        const trainer = this.entries.find((it) => it.writeKey === writeKey)
        if (trainer) {
            const newPokemon = {
                id: nextId(),
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

            trainer.pokemon.push(newPokemon)

            return newPokemon
        } else {
            throw new Error('Invalid write key')
        }
    }
}
