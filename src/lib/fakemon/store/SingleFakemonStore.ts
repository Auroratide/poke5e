import type { Unsubscriber, Writable } from "svelte/store"
import type { Fakemon } from "../Fakemon"
import type { StoredFakemon } from "./FakemonStore"

export type SingleStoredFakemon = {
	value: Fakemon,
}

export type SingleFakemonStore = {
	subscribe: (run: (value: SingleStoredFakemon) => void) => Unsubscriber
}

export function createSingleFakemonStore(fakemon: Fakemon, fakemonStore: Writable<StoredFakemon>): SingleFakemonStore {
	return {
		subscribe: (run: (value: SingleStoredFakemon) => void) => {
			return fakemonStore.subscribe((all) => {
				run(all[fakemon.data.readKey] ?? {
					value: fakemon,
				})
			})
		},
	}
}