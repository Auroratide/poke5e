import type { Unsubscriber, Writable } from "svelte/store"
import type { Fakemon, WriteKey } from "../Fakemon"
import type { StoredFakemon } from "./FakemonStore"
import { FakemonStoreUpdater } from "./FakemonUpdater"
import { provider } from "../data"
import { FakemonLocalStorage } from "../data/FakemonLocalStorage"

export type SingleStoredFakemon = {
	value: Fakemon,
	update?: FakemonStoreUpdater,
}

export type SingleFakemonStore = {
	subscribe: (run: (value: SingleStoredFakemon) => void) => Unsubscriber,
	verifyAccess: (writeKey: WriteKey) => Promise<boolean>,
	remove: () => Promise<void>,
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
		verifyAccess: async (writeKey: WriteKey) => {
			const isVerified = await provider.verifyWriteKey(storedFakemon.value, writeKey)
			if (isVerified) {
				fakemonStore.update((prev) => ({
					...prev,
					[storedFakemon.value.data.readKey]: createStoredFakemon(storedFakemon.value.copy({
						writeKey: writeKey,
					}), fakemonStore),
				}))
			}

			return isVerified
		},
		remove: async () => {
			fakemonStore.update((prev) => {
				const {
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					[storedFakemon.value.data.readKey]: _,
					...rest
				} = prev

				return rest
			})

			FakemonLocalStorage.remove(storedFakemon.value.data.readKey)
		},
	}
}
