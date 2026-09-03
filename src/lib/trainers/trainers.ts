import { derived, writable } from "svelte/store"
import type { TrainerData } from "./data"
import { provider } from "./data"
import type { InventoryItem, LearnedMove, PokemonId, ReadWriteKey, Trainer, TrainerInfo, TrainerPokemon } from "./types"
import { error } from "$lib/site/errors"
import type { PokemonSpecies } from "$lib/poke5e/species"
import { TrainerLocalStorage } from "./data/TrainerLocalStorage"
import { TagList } from "$lib/poke5e/tags"
import type { TransferCode } from "./pokemon-transfer"
import * as list from "$lib/utils/list"
import { PokemonStorage } from "./pokemon-storage"

type AllTrainers = (TrainerData & WithUpdater & WithRemover & WithTags)[]

type UpdaterOptions = {
	optimistic?: boolean
}

type AvatarUploadOptions = {
	updateAvatar?: {
		type: "new",
		value: File,
	} | {
		type: "remove",
	}
}

type TrainerUpdater = {
	info: (info: TrainerInfo, options?: UpdaterOptions & AvatarUploadOptions) => Promise<void>
	inventory: (info: TrainerInfo) => Promise<void>
	inventoryItem: (item: InventoryItem, options?: UpdaterOptions) => Promise<void>
	trainerFeats: (info: TrainerInfo) => Promise<void>
	retire: () => Promise<void>
	pokemon: (info: TrainerPokemon, options?: UpdaterOptions & AvatarUploadOptions) => Promise<void>
	moveset: (info: TrainerPokemon) => Promise<void>
	heldItems: (info: TrainerPokemon) => Promise<void>
	pokemonFeats: (info: TrainerPokemon) => Promise<void>
	move: (info: LearnedMove, options?: UpdaterOptions) => Promise<void>
	addToTeam: (pokemon: PokemonSpecies) => Promise<TrainerPokemon>
	acceptTransfer: (code: TransferCode) => Promise<TrainerPokemon>
	reorderTeam: (info: TrainerPokemon[]) => Promise<void>
	removeFromTeam: (id: string) => Promise<void>
	setStorage: (id: PokemonId, storage: PokemonStorage) => Promise<void>
}
type WithUpdater = {
	update?: TrainerUpdater
}

type WithRemover = {
	remove: () => Promise<void>
}

type WithTags = {
	tags: {
		trainer: (info: TrainerInfo) => Promise<void>,
		pokemon: (info: TrainerPokemon) => Promise<void>,
		getForPokemon: () => TagList,
	},
}

export type TrainerStore = {
	subscribe: (run: (value: TrainerData & WithUpdater & WithRemover & WithTags) => void) => () => void,
	verifyAccess: (writeKey: ReadWriteKey) => Promise<boolean>,
}

export type TrainerListStore = {
	subscribe: (run: (value: Trainer[]) => void) => () => void,
	reorder: (trainers: Trainer[]) => Promise<void>,
}

type AllTrainerFetchRequests = {
	[readKey: ReadWriteKey]: Promise<TrainerStore | undefined>
}

export const createStore = () => {
	const trainerStore = writable<AllTrainers>([])
	const { subscribe: storeSubscribe, update: storeUpdate } = trainerStore
	const promises: AllTrainerFetchRequests = {}
	let listPromise: Promise<TrainerListStore> = undefined

	const storeUpdateOne = (readKey: string, update: (prev: TrainerData) => TrainerData) => {
		storeUpdate((prev) => {
			const prevEntry = prev.find((it) => it.info.readKey === readKey)
			const updated = update(prevEntry)
			const replacement = {
				...prevEntry,
				...updated,
				tags: createTagUpdater(updated),
			}

			return list.replaceOrAddById(prev, replacement, (it) => it.info.readKey)
		})
	}

	const createRemoveTrainer = (info: Trainer) => () => {
		return provider.removeTrainer(info.id, info.readKey).then(() => {
			storeUpdate((prev) => {
				 
				return prev.filter((it) => it.info.readKey !== info.readKey)
			})
		})
	}

	const createTagUpdater = (data: TrainerData): WithTags["tags"] => {
		return {
			trainer: async (info: TrainerInfo) => {
				if (data.writeKey) {
					await provider.updateTrainerInfo(data.writeKey, data.info.readKey, info)
				} else {
					TrainerLocalStorage.tags.setTrainer(data.info.readKey, info.tags)
				}

				storeUpdateOne(data.info.readKey, (prev) => ({
					...prev,
					info: {
						...prev.info,
						...info,
					},
				}))
			},
			pokemon: async (info: TrainerPokemon) => {
				if (data.writeKey) {
					await provider.updatePokemon(data.writeKey, data.info.readKey, info)
				} else {
					TrainerLocalStorage.tags.setPokemon(data.info.readKey, info.id, info.tags)
				}

				storeUpdateOne(data.info.readKey, (prev) => {
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
			},
			getForPokemon: () => {
				return Object.values(data.pokemon).reduce((tags, f) =>
					TagList.merge(tags, f.tags), TagList.empty(),
				)
			},
		}
	}

	return {
		get: (readKey: ReadWriteKey) => {
			if (promises[readKey] == null) {
				promises[readKey] = provider.getTrainer(readKey).then((data) => {
					if (data == null) return undefined
					storeUpdateOne(data.info.readKey, () => data)

					const createUpdate = (data: TrainerData) => ({
						info: async (info: TrainerInfo, options: UpdaterOptions & AvatarUploadOptions = {}) => {
							const original = data.info

							let avatar = info.avatar
							if (options.updateAvatar != null) {
								if (options.updateAvatar.type === "new") {
									avatar = await provider.updateTrainerAvatar(data.writeKey, data.info.readKey, options.updateAvatar.value, info.avatar).catch((e) => {
										error.show("updateTrainerAvatar", e)
										throw e
									})
								} else {
									await provider.removeTrainerAvatar(data.writeKey, data.info.readKey, info.avatar).catch((e) => {
										error.show("removeTrainerAvatar", e)
										throw e
									})
									avatar = null
								}
							}

							const updateStore = (info: TrainerInfo) => storeUpdateOne(readKey, (prev) => ({
								...prev,
								info: {
									...prev.info,
									...info,
									avatar: avatar,
								},
							}))

							if (options.optimistic) {
								updateStore(info)

								return provider.updateTrainerInfo(data.writeKey, data.info.readKey, info).then(() => {}).catch((e) => {
									updateStore(original)
									error.show("updateTrainerInfo", e)
									throw e
								})
							} else {
								return provider.updateTrainerInfo(data.writeKey, data.info.readKey, info).then(() => {
									updateStore(info)
								}).catch((e: Error) => {
									error.show("updateTrainerInfo", e)
									throw e
								})
							}
						},
						inventory: (info: TrainerInfo) => {
							return provider.updateTrainerInventory(data.writeKey, data.info.readKey, info.inventory).then((newInventory) => {
								storeUpdateOne(readKey, (prev) => ({
									...prev,
									info: {
										...prev.info,
										inventory: newInventory,
									},
								}))
							}).catch((e: Error) => {
								error.show("updateTrainerInventory", e)
								throw e
							})
						},
						inventoryItem: (info: InventoryItem, options: UpdaterOptions = {}) => {
							let original: InventoryItem = undefined
							const updateStore = (info: InventoryItem) => {
								storeUpdateOne(readKey, (prev) => {
									const index = prev.info.inventory.findIndex((it) => it.id === info.id)

									original = prev.info.inventory[index]
									prev.info.inventory[index] = info

									return {
										...prev,
									}
								})
							}

							if (options.optimistic) {
								updateStore(info)

								return provider.updateTrainerItem(data.writeKey, info).then(() => {}).catch((e) => {
									updateStore(original)
									error.show("updateTrainerItem", e)
									throw e
								})
							} else {
								return provider.updateTrainerItem(data.writeKey, info).then(() => {
									updateStore(info)
								}).catch((e: Error) => {
									error.show("updateTrainerItem", e)
									throw e
								})
							}
						},
						trainerFeats: (info: TrainerInfo) => {
							return provider.updateTrainerFeats(data.writeKey, data.info.readKey, info.feats).then((newFeats) => {
								storeUpdateOne(readKey, (prev) => ({
									...prev,
									info: {
										...prev.info,
										feats: newFeats,
									},
								}))
							}).catch((e: Error) => {
								error.show("updateTrainerFeats", e)
								throw e
							})
						},
						retire: () => {
							return provider.deleteTrainer(data.writeKey, data.info.id, data.info.readKey).then(() => {
								storeUpdate((prev) => {
									 
									return prev.filter((it) => it.info.readKey !== data.info.readKey)
								})
							}).catch((e: Error) => {
								error.show("deleteTrainer", e)
								throw e
							})
						},
						pokemon: async (info: TrainerPokemon, options: UpdaterOptions & AvatarUploadOptions = {}) => {
							let original: TrainerPokemon = undefined

							let avatar = info.avatar
							if (options.updateAvatar != null) {
								if (options.updateAvatar.type === "new") {
									avatar = await provider.updatePokemonAvatar(data.writeKey, data.info.readKey, info, options.updateAvatar.value).catch((e) => {
										error.show("updatePokemonAvatar", e)
										throw e
									})
								} else {
									await provider.removePokemonAvatar(data.writeKey, data.info.readKey, info).catch((e) => {
										error.show("removePokemonAvatar", e)
										throw e
									})
									avatar = null
								}
							}

							const updateStore = (info: TrainerPokemon) => storeUpdateOne(readKey, (prev) => {
								const pokemonList = [...prev.pokemon]
								const pokeIndex = pokemonList.findIndex((it) => it.id === info.id)
								original = pokemonList[pokeIndex]
								pokemonList[pokeIndex] = {
									...prev.pokemon[pokeIndex],
									...info,
									avatar: avatar,
								}

								return {
									...prev,
									pokemon: pokemonList,
								}
							})

							if (options.optimistic) {
								updateStore(info)

								return provider.updatePokemon(data.writeKey, data.info.readKey, info).then(() => {}).catch((e) => {
									updateStore(original)
									error.show("updatePokemon", e)
									throw e
								})
							} else {
								return provider.updatePokemon(data.writeKey, data.info.readKey,  info).then(() => {
									updateStore(info)
								}).catch((e: Error) => {
									error.show("updatePokemon", e)
									throw e
								})
							}
						},
						moveset: (info: TrainerPokemon) => {
							return provider.updateMoveset(data.writeKey, data.info.readKey, info.id, info.moves).then((newMoves) => {
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
								error.show("updateMoveset", e)
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
									error.show("updateOneMove", e)
									throw e
								})
							} else {
								return provider.updateOneMove(data.writeKey, info).then(() => {
									updateStore(info)
								}).catch((e: Error) => {
									error.show("updateOneMove", e)
									throw e
								})
							}
						},
						heldItems: (info: TrainerPokemon) => {
							return provider.updateAllHeldItems(data.writeKey, info.id, info.items).then((newItems) => {
								storeUpdateOne(readKey, (prev) => {
									const pokemonList = [...prev.pokemon]
									const pokeIndex = pokemonList.findIndex((it) => it.id === info.id)
									pokemonList[pokeIndex] = {
										...prev.pokemon[pokeIndex],
										items: newItems,
									}

									return {
										...prev,
										pokemon: pokemonList,
									}
								})
							}).catch((e: Error) => {
								error.show("updateAllHeldItems", e)
								throw e
							})
						},
						pokemonFeats: (info: TrainerPokemon) => {
							return provider.updatePokemonFeats(data.writeKey, info.id, info.feats).then((newFeats) => {
								storeUpdateOne(readKey, (prev) => {
									const pokemonList = [...prev.pokemon]
									const pokeIndex = pokemonList.findIndex((it) => it.id === info.id)
									pokemonList[pokeIndex] = {
										...prev.pokemon[pokeIndex],
										feats: newFeats,
									}

									return {
										...prev,
										pokemon: pokemonList,
									}
								})
							}).catch((e: Error) => {
								error.show("updatePokemonFeats", e)
								throw e
							})
						},
						addToTeam: (pokemon: PokemonSpecies) => {
							return provider.addPokemonToTeam(data.writeKey, data.info.readKey, data.info.id, pokemon, data.pokemon.length + 1).then((result) => {
								storeUpdateOne(readKey, (prev) => {
									const pokemonList = [...prev.pokemon, result]

									return {
										...prev,
										pokemon: pokemonList,
									}
								})

								return result
							}).catch((e: Error) => {
								error.show("addPokemonToTeam", e)
								throw e
							})
						},
						acceptTransfer: (code: TransferCode) => {
							return provider.acceptPokemonTransfer(data.writeKey, data.info.readKey, data.info.id, code).then((result) => {
								storeUpdateOne(readKey, (prev) => {
									const pokemonList = [...prev.pokemon, result]

									return {
										...prev,
										pokemon: pokemonList,
									}
								})

								return result
							}).catch((e: Error) => {
								throw e
							})
						},
						reorderTeam: (order: TrainerPokemon[]) => {
							// The whole roster, boxed pokemon included: reorder_pokemon
							// renumbers only the ids it is given, so a party-only list would
							// leave the box on stale ranks colliding with the party's new
							// 1..N. Roster.svelte maps a drag within the visible party back
							// onto the full list for exactly this reason.
							return provider.reorderPokemonTeam(data.writeKey, data.info.readKey, order).then(() => {
								storeUpdateOne(readKey, (prev) => {
									return {
										...prev,
										pokemon: order,
									}
								})
							}).catch((e: Error) => {
								error.show("reorderPokemonTeam", e)
								throw e
							})
						},
						removeFromTeam: (id: string) => {
							return provider.removePokemon(data.writeKey, data.info.readKey, id).then(() => {
								storeUpdateOne(readKey, (prev) => {
									const pokemonList = prev.pokemon.filter((it) => it.id !== id)

									return {
										...prev,
										pokemon: pokemonList,
									}
								})
							}).catch((e: Error) => {
								error.show("removePokemon", e)
								throw e
							})
						},
						// Deposit and withdraw. The store keeps one flat roster, so this only
						// flips a field and, where the server moved the pokemon, moves it to
						// the matching place in the array. Getting that wrong would not lose
						// anything, but the list would jump when the trainer is next loaded.
						setStorage: (id: PokemonId, storage: PokemonStorage) => {
							return provider.setPokemonStorage(data.writeKey, data.info.readKey, id, storage).then(() => {
								storeUpdateOne(readKey, (prev) => {
									const moved = prev.pokemon.find((it) => it.id === id)
									if (moved == null) return prev

									const updated = { ...moved, storage }

									// set_pokemon_storage hands a pokemon rejoining the party
									// rank MAX+1, so it comes back at the end. Leaving the party
									// keeps its rank, and so its position -- which is what lets
									// a deposit happen without renumbering the party.
									return {
										...prev,
										pokemon: storage === PokemonStorage.Party
											? [...prev.pokemon.filter((it) => it.id !== id), updated]
											: prev.pokemon.map((it) => it.id === id ? updated : it),
									}
								})
							}).catch((e: Error) => {
								error.show("setPokemonStorage", e)
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
						subscribe: (s: (value: TrainerData & WithUpdater & WithRemover & WithTags) => void) => {
							return storeSubscribe((all) => {
								const cached = all.find((it) => it.info.readKey === readKey)
								s(cached ?? {
									...data,
									update,
									remove: createRemoveTrainer(data.info),
									tags: createTagUpdater(data),
								})

								if (!updated) {
									updated = true
									storeUpdate((prev) => {
										const replacement = {
											...data,
											update,
											remove: createRemoveTrainer(data.info),
											tags: createTagUpdater(data),
										}
										return list.replaceOrAddById(prev, replacement, (it) => it.info.readKey)
									})
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
										tags: createTagUpdater(data),
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
								s(all.map((it) => it.info))

								if (!updated) {
									updated = true
									storeUpdate((prev) => {
										return data.map((cur) => {
											const cached = prev.find((it) => it.info.readKey === cur.readKey)
											const data: TrainerData = {
												info: cur,
												pokemon: [],
												writeKey: TrainerLocalStorage.getWriteKey(cur.readKey),
											}

											return cached ?? {
												info: cur,
												pokemon: [],
												remove: createRemoveTrainer(cur),
												tags: createTagUpdater(data),
											}
										})
									})
								}
							})
						},

						reorder: (trainers: Trainer[]) => {
							const orderedReadKeys = trainers.map((it) => it.readKey)
							return provider.reorderTrainers(orderedReadKeys).then(() => {
								storeUpdate((prev) => {
									return list.sortAccordingTo(prev, trainers, (it) => it.info.readKey, (it) => it.readKey)
								})
							})
						},
					}
				})
			}

			return listPromise
		},

		new: (info: Pick<TrainerInfo, "name" | "description" | "hp">) => {
			return provider.newTrainer(info).then((result) => {
				storeUpdateOne(result.info.readKey, () => result)

				return result
			}).catch((e: Error) => {
				error.show("newTrainer", e)
				throw e
			})
		},

		tags: () => {
			return derived(trainerStore, (trainers) => {
				return Object.values(trainers).reduce((tags, f) =>
					TagList.merge(tags, f.info.tags), TagList.empty(),
				)
			})
		},
	}
}

export const trainers = createStore()
