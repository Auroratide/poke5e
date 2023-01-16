import type { Pokemon } from '$lib/creatures/types'
import { writable } from 'svelte/store'
import type { TrainerData } from './data'
import { provider } from './data'
import type { ReadWriteKey, Trainer, TrainerInfo, TrainerPokemon } from './types'

type AllTrainers = {
    [readKey: ReadWriteKey]: TrainerData
}

type TrainerUpdater = {
    info: (info: TrainerInfo) => Promise<void>
    pokemon: (info: TrainerPokemon) => Promise<void>
    addToTeam: (pokemon: Pokemon) => Promise<TrainerPokemon>
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
