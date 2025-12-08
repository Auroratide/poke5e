import { writable } from "svelte/store"
import type { DraftFakemon, Fakemon, ReadKey, WriteKey } from "../Fakemon"
import { createSingleFakemonStore, createStoredFakemon, type SingleFakemonStore, type SingleStoredFakemon } from "./SingleFakemonStore"
import { provider } from "../data"
import { createFakemonListStore, type FakemonListStore } from "./FakemonListStore"
import { FakemonLocalStorage } from "../data/FakemonLocalStorage"
import { provider as evoProvider } from "$lib/pokemon/evolution/data"

export type StoredFakemon = Record<ReadKey, SingleStoredFakemon>

export interface FakemonStore {
	get: (key: ReadKey) => Promise<SingleFakemonStore>
	new: (fakemon: DraftFakemon) => Promise<Fakemon>
	all: () => Promise<FakemonListStore>
	getWriteKey: (key: ReadKey) => WriteKey | undefined
	reset: () => Promise<void>
}

export function createStore(): FakemonStore {
	const fakemonStore = writable<StoredFakemon>({})
	const promises: Record<ReadKey, Promise<SingleFakemonStore | undefined>> = {}
	let listPromise: Promise<FakemonListStore> = undefined

	const getOne = (key: ReadKey) => {
		if (promises[key] != null) return

		promises[key] = provider.getByReadKey(key).then((fakemon) => {
			if (fakemon == null) return undefined

			const store = createStoredFakemon(fakemon, fakemonStore)

			fakemonStore.update((prev) => ({
				...prev,
				[fakemon.data.readKey]: store,
			}))

			return createSingleFakemonStore(store, fakemonStore)
		})
	}

	return {
		get: async (key: ReadKey): Promise<SingleFakemonStore> => {
			if (promises[key] == null) {
				promises[key] = provider.getByReadKey(key).then((fakemon) => {
					if (fakemon == null) return undefined

					evoProvider.get(fakemon.species.id).then((evos) => {
						evos.forEach((evo) => {
							if (evo.from.isFakemon()) {
								getOne(evo.from.toFakemonReadKey())
							}

							if (evo.to.isFakemon()) {
								getOne(evo.to.toFakemonReadKey())
							}
						})
					})

					const storedFakemon = createStoredFakemon(fakemon, fakemonStore)

					fakemonStore.update((prev) => ({
						...prev,
						[fakemon.data.readKey]: storedFakemon,
					}))

					return createSingleFakemonStore(storedFakemon, fakemonStore)
				})
			}

			return promises[key]
		},

		new: async (fakemon: DraftFakemon): Promise<Fakemon> => {
			return provider.add(fakemon).then((result) => {
				const storedFakemon = createStoredFakemon(result, fakemonStore)
				const singlePokemonStore = createSingleFakemonStore(storedFakemon, fakemonStore)
				promises[result.data.readKey] = Promise.resolve(singlePokemonStore)

				fakemonStore.update((prev) => ({
					...prev,
					[result.data.readKey]: storedFakemon,
				}))

				return result
			})
		},

		all: async (): Promise<FakemonListStore> => {
			if (listPromise == null) {
				listPromise = provider.getAllKnown().then((fakemon) => {
					return createFakemonListStore(fakemon, fakemonStore)
				})
			}

			return listPromise
		},

		getWriteKey: (key: ReadKey): WriteKey | undefined => {
			return FakemonLocalStorage.get(key).writeKey
		},
		
		reset: async () => {
			fakemonStore.set({})
		},
	}
}

export const fakemonStore = createStore()
