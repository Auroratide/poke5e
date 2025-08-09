import type { Unsubscriber, Writable } from "svelte/store"
import type { Fakemon } from "../Fakemon"
import type { StoredFakemon } from "./FakemonStore"
import { FakemonStoreUpdater } from "./FakemonUpdater"
import { provider } from "../data"

export type SingleStoredFakemon = {
	value: Fakemon,
	update?: FakemonStoreUpdater,
}

export type SingleFakemonStore = {
	subscribe: (run: (value: SingleStoredFakemon) => void) => Unsubscriber
}

export function createStoredFakemon(fakemon: Fakemon, fakemonStore: Writable<StoredFakemon>): SingleStoredFakemon {
	return {
		value: fakemon,
		update: fakemon.data.writeKey != null ? new FakemonStoreUpdater(
			provider,
			fakemonStore,
		) : undefined,
	}
}

export function createSingleFakemonStore(storedFakemon: SingleStoredFakemon, fakemonStore: Writable<StoredFakemon>): SingleFakemonStore {
	return {
		subscribe: (run: (value: SingleStoredFakemon) => void) => {
			return fakemonStore.subscribe((all) => {
				run(all[storedFakemon.value.data.readKey] ?? storedFakemon)
			})
		},
	}
}
