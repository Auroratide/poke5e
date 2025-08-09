import type { Unsubscriber, Writable } from "svelte/store"
import type { Fakemon } from "../Fakemon"
import type { StoredFakemon } from "./FakemonStore"
import { createStoredFakemon } from "./SingleFakemonStore"

export type FakemonListStore = {
	subscribe: (run: (value: Fakemon[]) => void) => Unsubscriber
}

export function createFakemonListStore(fakemon: Fakemon[], fakemonStore: Writable<StoredFakemon>): FakemonListStore {
	let updated = false
	return {
		subscribe: (run: (value: Fakemon[]) => void) => {
			return fakemonStore.subscribe((all) => {
				run(Object.values(all).map((it) => it.value))

				if (!updated) {
					updated = true
					fakemonStore.update((prev) => fakemon.reduce((newAll, cur) => ({
						...newAll,
						[cur.data.readKey]: createStoredFakemon(cur, fakemonStore),
					}), prev))
				}
			})
		},
	}
}
