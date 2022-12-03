import type { Pokemon } from '$lib/creatures/types'
import { writable } from 'svelte/store'
import type { TrainerData } from './data'
import * as datastore from './data'
import type { ReadWriteKey, TrainerInfo, TrainerPokemon } from './types'

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

type AllTrainerFetchRequests = {
    [readKey: ReadWriteKey]: Promise<TrainerStore | undefined>
}

const createStore = () => {
    const { subscribe: storeSubscribe, update: storeUpdate } = writable<AllTrainers>({})
    const promises: AllTrainerFetchRequests = {}

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
                promises[readKey] = datastore.getTrainer(readKey).then((data) => {
                    if (data == null) return undefined

                    let update: TrainerUpdater | undefined = undefined
                    if (data.writeKey?.length > 0) {
                        update = {
                            info: (info: TrainerInfo) => {
                                return datastore.updateTrainerInfo(data.writeKey, info).then(() => {
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
                                return datastore.updatePokemon(data.writeKey, info).then(() => {
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
                                return datastore.addPokemonToTeam(data.writeKey, data.info.id, pokemon).then((result) => {
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

                    return {
                        subscribe: (s: (value: TrainerData) => void) => {
                            return storeSubscribe((all) => {
                                s(all[readKey] ?? data)

                                if (all[readKey] == null) {
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
        }
    }
}

export const trainers = createStore()
