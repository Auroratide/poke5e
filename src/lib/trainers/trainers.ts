import type { Pokemon } from '$lib/creatures/types'
import { writable } from 'svelte/store'
import type { TrainerData, TrainerDataProviderError } from './data'
import { provider } from './data'
import type { LearnedMove, ReadWriteKey, Trainer, TrainerInfo, TrainerPokemon } from './types'
import { error } from '$lib/design/errors/store'

type AllTrainers = {
    [readKey: ReadWriteKey]: TrainerData
}

type TrainerUpdater = {
    info: (info: TrainerInfo) => Promise<void>
    pokemon: (info: TrainerPokemon) => Promise<void>
    moveset: (info: TrainerPokemon) => Promise<void>
    move: (info: LearnedMove) => Promise<void>
    addToTeam: (pokemon: Pokemon) => Promise<TrainerPokemon>
    removeFromTeam: (id: string) => Promise<void>
}

export type TrainerStore = {
    subscribe: (run: (value: TrainerData) => void) => () => void,
    update?: TrainerUpdater,
}

export type TrainerListStore = {
    subscribe: (run: (value: Trainer[]) => void) => () => void,
}

type AllTrainerFetchRequests = {
    [readKey: ReadWriteKey]: Promise<TrainerStore | undefined>
}

const createStore = () => {
    const { subscribe: storeSubscribe, update: storeUpdate } = writable<AllTrainers>({})
    const promises: AllTrainerFetchRequests = {}
    let listPromise: Promise<TrainerListStore> = undefined

    const storeUpdateOne = (readKey: string, update: (prev: TrainerData) => TrainerData) => {
        storeUpdate((prev) => ({
            ...prev,
            [readKey]: {
                ...prev[readKey],
                ...update(prev[readKey]),
            },
        }))
    }

    return {
        get: (readKey: ReadWriteKey) => {
            if (promises[readKey] == null) {
                promises[readKey] = provider.getTrainer(readKey).then((data) => {
                    if (data == null) return undefined

                    let update: TrainerUpdater | undefined = undefined
                    if (data.writeKey?.length > 0) {
                        update = {
                            info: (info: TrainerInfo) => {
                                return provider.updateTrainerInfo(data.writeKey, info).then(() => {
                                    storeUpdateOne(readKey, (prev) => ({
                                        ...prev,
                                        info: {
                                            ...prev.info,
                                            ...info,
                                        },
                                    }))
                                })
                            },
                            pokemon: (info: TrainerPokemon) => {
                                return provider.updatePokemon(data.writeKey, info).then(() => {
                                    storeUpdateOne(readKey, (prev) => {
                                        const pokemonList = [...prev.pokemon]
                                        const pokeIndex = pokemonList.findIndex((it) => it.id === info.id)
                                        pokemonList[pokeIndex] = {
                                            ...prev.pokemon[pokeIndex],
                                            ...info,
                                        }

                                        return {
                                            ...prev,
                                            pokemon: pokemonList,
                                        }
                                    })
                                })
                            },
                            moveset: (info: TrainerPokemon) => {
                                return provider.updateMoveset(data.writeKey, info.id, info.moves).then((newMoves) => {
                                    storeUpdateOne(readKey, (prev) => {
                                        const pokemonList = [...prev.pokemon]
                                        const pokeIndex = pokemonList.findIndex((it) => it.id === info.id)
                                        pokemonList[pokeIndex] = {
                                            ...prev.pokemon[pokeIndex],
                                            moves: newMoves,
                                        }
    
                                        return {
                                            ...prev,
                                            pokemon: pokemonList,
                                        }
                                    })
                                })
                            },
                            move: (info: LearnedMove) => {
                                return provider.updateOneMove(data.writeKey, info).then(() => {
                                    storeUpdateOne(readKey, (prev) => {
                                        const pokemonWithMove = prev.pokemon
                                            .find((p) => p.moves.map((m) => m.id).includes(info.id))
                                        if (!pokemonWithMove) {
                                            return prev
                                        }

                                        const moveIndex = pokemonWithMove.moves.findIndex((m) => m.id === info.id)
                                        pokemonWithMove.moves[moveIndex] = info

                                        return {
                                            ...prev,
                                        }
                                    })
                                })
                            },
                            addToTeam: (pokemon: Pokemon) => {
                                return provider.addPokemonToTeam(data.writeKey, data.info.id, pokemon).then((result) => {
                                    storeUpdateOne(readKey, (prev) => {
                                        const pokemonList = [...prev.pokemon, result]
    
                                        return {
                                            ...prev,
                                            pokemon: pokemonList,
                                        }
                                    })

                                    return result
                                })
                            },
                            removeFromTeam: (id: string) => {
                                return provider.removePokemon(data.writeKey, id).then(() => {
                                    storeUpdateOne(readKey, (prev) => {
                                        const pokemonList = prev.pokemon.filter((it) => it.id !== id)
    
                                        return {
                                            ...prev,
                                            pokemon: pokemonList,
                                        }
                                    })
                                }).catch((e: Error) => {
                                    error.show(e.message)
                                    throw e
                                })
                            },
                        }
                    }

                    let updated = false
                    return {
                        subscribe: (s: (value: TrainerData) => void) => {
                            return storeSubscribe((all) => {
                                s(all[readKey] ?? data)

                                if (!updated) {
                                    updated = true
                                    storeUpdate((prev) => ({
                                        ...prev,
                                        [readKey]: data,
                                    }))
                                }
                            })
                        },
                        update,
                    }
                })
            }

            return promises[readKey]
        },

        all: () => {
            if (listPromise == null) {
                listPromise = provider.allTrainers().then((data) => {
                    let updated = false
                    return {
                        subscribe: (s: (value: Trainer[]) => void) => {
                            return storeSubscribe((all) => {
                                s(Object.values(all).map((it) => it.info))

                                if (!updated) {
                                    updated = true
                                    storeUpdate((prev) => data.reduce((newAll, cur) => ({
                                        [cur.readKey]: {
                                            info: cur,
                                            pokemon: [],
                                        },
                                        ...newAll,
                                    }), prev))
                                }

                            })
                        }
                    }
                })
            }

            return listPromise
        },

        new: (info: TrainerInfo) => {
            return provider.newTrainer(info).then((result) => {
                storeUpdateOne(result.info.readKey, () => result)

                return result
            })
        }
    }
}

export const trainers = createStore()
