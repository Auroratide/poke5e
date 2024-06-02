import type { Pokemon } from "$lib/creatures/types"
import { writable } from "svelte/store"
import type { TrainerData } from "./data"
import { provider } from "./data"
import type { LearnedMove, ReadWriteKey, Trainer, TrainerInfo, TrainerPokemon } from "./types"
import { error } from "$lib/design/errors/store"

type AllTrainers = {
	[readKey: ReadWriteKey]: TrainerData & WithUpdater & WithRemover
}

type UpdaterOptions = {
	optimistic?: boolean
}

type TrainerUpdater = {
	info: (info: TrainerInfo, options?: UpdaterOptions) => Promise<void>
	retire: () => Promise<void>
	pokemon: (info: TrainerPokemon, options?: UpdaterOptions) => Promise<void>
	moveset: (info: TrainerPokemon) => Promise<void>
	move: (info: LearnedMove, options?: UpdaterOptions) => Promise<void>
	addToTeam: (pokemon: Pokemon) => Promise<TrainerPokemon>
	removeFromTeam: (id: string) => Promise<void>
}
type WithUpdater = {
	update?: TrainerUpdater
}

type WithRemover = {
	remove: () => Promise<void>
}

export type TrainerStore = {
	subscribe: (run: (value: TrainerData & WithUpdater & WithRemover) => void) => () => void,
	verifyAccess: (writeKey: ReadWriteKey) => Promise<boolean>,
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

	const createRemoveTrainer = (info: Trainer) => () => {
		return provider.removeTrainer(info.id, info.readKey).then(() => {
			storeUpdate((prev) => {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { [info.readKey]: _, ...rest } = prev
				return rest
			})
		})
	}

	return {
		get: (readKey: ReadWriteKey) => {
			if (promises[readKey] == null) {
				promises[readKey] = provider.getTrainer(readKey).then((data) => {
					if (data == null) return undefined

					const createUpdate = (data: TrainerData, options: UpdaterOptions = {}) => ({
						info: (info: TrainerInfo) => {
							const original = data.info
							const updateStore = (info: TrainerInfo) => storeUpdateOne(readKey, (prev) => ({
								...prev,
								info: {
									...prev.info,
									...info,
								},
							}))

							if (options.optimistic) {
								updateStore(info)

								return provider.updateTrainerInfo(data.writeKey, info).then(() => {}).catch((e) => {
									updateStore(original)
									error.show(e.message)
									throw e
								})
							} else {
								return provider.updateTrainerInfo(data.writeKey, info).then(() => {
									updateStore(info)
								}).catch((e: Error) => {
									error.show(e.message)
									throw e
								})
							}
						},
						retire: () => {
							return provider.deleteTrainer(data.writeKey, data.info.id, data.info.readKey).then(() => {
								storeUpdate((prev) => {
									// eslint-disable-next-line @typescript-eslint/no-unused-vars
									const { [data.info.readKey]: _, ...rest } = prev
									return rest
								})
							}).catch((e: Error) => {
								error.show(e.message)
								throw e
							})
						},
						pokemon: (info: TrainerPokemon, options: UpdaterOptions = {}) => {
							let original: TrainerPokemon = undefined
							const updateStore = (info: TrainerPokemon) => storeUpdateOne(readKey, (prev) => {
								const pokemonList = [...prev.pokemon]
								const pokeIndex = pokemonList.findIndex((it) => it.id === info.id)
								original = pokemonList[pokeIndex]
								pokemonList[pokeIndex] = {
									...prev.pokemon[pokeIndex],
									...info,
								}

								return {
									...prev,
									pokemon: pokemonList,
								}
							})

							if (options.optimistic) {
								updateStore(info)

								return provider.updatePokemon(data.writeKey, info).then(() => {}).catch((e) => {
									updateStore(original)
									error.show(e.message)
									throw e
								})
							} else {
								return provider.updatePokemon(data.writeKey, info).then(() => {
									updateStore(info)
								}).catch((e: Error) => {
									error.show(e.message)
									throw e
								})
							}
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
							}).catch((e: Error) => {
								error.show(e.message)
								throw e
							})
						},
						move: (info: LearnedMove, options: UpdaterOptions = {}) => {
							let original: LearnedMove = undefined
							const updateStore = (info: LearnedMove) => {
								storeUpdateOne(readKey, (prev) => {
									const pokemonWithMove = prev.pokemon
										.find((p) => p.moves.map((m) => m.id).includes(info.id))
									if (!pokemonWithMove) {
										return prev
									}

									const moveIndex = pokemonWithMove.moves.findIndex((m) => m.id === info.id)
									original = pokemonWithMove.moves[moveIndex]
									pokemonWithMove.moves[moveIndex] = info

									return {
										...prev,
									}
								})
							}

							if (options.optimistic) {
								updateStore(info)

								return provider.updateOneMove(data.writeKey, info).then(() => {}).catch((e) => {
									updateStore(original)
									error.show(e.message)
									throw e
								})
							} else {
								return provider.updateOneMove(data.writeKey, info).then(() => {
									updateStore(info)
								}).catch((e: Error) => {
									error.show(e.message)
									throw e
								})
							}
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
							}).catch((e: Error) => {
								error.show(e.message)
								throw e
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
					})

					let update: TrainerUpdater | undefined = undefined
					if (data.writeKey?.length > 0) {
						update = createUpdate(data)
					}

					let updated = false
					return {
						subscribe: (s: (value: TrainerData & WithUpdater & WithRemover) => void) => {
							return storeSubscribe((all) => {
								s(all[readKey] ?? {
									...data,
									update,
									remove: createRemoveTrainer(data.info),
								})

								if (!updated) {
									updated = true
									storeUpdate((prev) => ({
										...prev,
										[readKey]: {
											...data,
											update,
											remove: createRemoveTrainer(data.info),
										},
									}))
								}
							})
						},
						verifyAccess: (writeKey: ReadWriteKey) => {
							return provider.verifyWriteKey(data.info, writeKey).then((isVerified) => {
								if (isVerified) {
									storeUpdateOne(readKey, (prev) => ({
										...prev,
										writeKey: writeKey,
										update: createUpdate({
											...prev,
											writeKey: writeKey,
										}),
									}))
								}

								return isVerified
							})
						},
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
											remove: createRemoveTrainer(cur),
										},
										...newAll,
									}), prev))
								}

							})
						},
					}
				})
			}

			return listPromise
		},

		new: (info: Pick<TrainerInfo, "name" | "description">) => {
			return provider.newTrainer(info).then((result) => {
				storeUpdateOne(result.info.readKey, () => result)

				return result
			})
		},
	}
}

export const trainers = createStore()
