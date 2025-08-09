import { writable } from "svelte/store"
import type { ReadKey } from "../Fakemon"
import { createSingleFakemonStore, type SingleFakemonStore, type SingleStoredFakemon } from "./SingleFakemonStore"
import { provider } from "../data"

export type StoredFakemon = Record<ReadKey, SingleStoredFakemon>

export interface FakemonStore {
	get: (key: ReadKey) => Promise<SingleFakemonStore>
}

function createStore(): FakemonStore {
	const fakemonStore = writable<StoredFakemon>({})
	const promises: Record<ReadKey, Promise<SingleFakemonStore | undefined>> = {}

	return {
		get: async (key: ReadKey): Promise<SingleFakemonStore> => {
			if (promises[key] == null) {
				promises[key] = provider.getByReadKey(key).then((fakemon) => {
					if (fakemon == null) return undefined

					return createSingleFakemonStore(fakemon, fakemonStore)
				})
			}

			return promises[key]
		},
	}
}

export const fakemonStore = createStore()
