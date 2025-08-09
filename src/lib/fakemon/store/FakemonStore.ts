import { writable } from "svelte/store"
import type { DraftFakemon, Fakemon, ReadKey } from "../Fakemon"
import { createSingleFakemonStore, createStoredFakemon, type SingleFakemonStore, type SingleStoredFakemon } from "./SingleFakemonStore"
import { provider } from "../data"

export type StoredFakemon = Record<ReadKey, SingleStoredFakemon>

export interface FakemonStore {
	get: (key: ReadKey) => Promise<SingleFakemonStore>
	new: (fakemon: DraftFakemon) => Promise<Fakemon>
}

function createStore(): FakemonStore {
	const fakemonStore = writable<StoredFakemon>({})
	const promises: Record<ReadKey, Promise<SingleFakemonStore | undefined>> = {}

	return {
		get: async (key: ReadKey): Promise<SingleFakemonStore> => {
			if (promises[key] == null) {
				promises[key] = provider.getByReadKey(key).then((fakemon) => {
					if (fakemon == null) return undefined

					return createSingleFakemonStore(createStoredFakemon(fakemon, fakemonStore), fakemonStore)
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
	}
}

export const fakemonStore = createStore()
