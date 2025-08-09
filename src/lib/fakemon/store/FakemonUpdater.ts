import type { Writable } from "svelte/store"
import type { StoredFakemon } from "./FakemonStore"
import type { FakemonDataProvider } from "../data/FakemonDataProvider"
import type { Fakemon } from "../Fakemon"
import { error } from "$lib/design/errors/store"

export class FakemonStoreUpdater {
	constructor(
		private readonly provider: FakemonDataProvider,
		private readonly fakemonStore: Writable<StoredFakemon>,
	) {}

	info = async (updatedFakemon: Fakemon) => {
		try {
			await this.provider.update(updatedFakemon)

			this.fakemonStore.update((prev) => ({
				...prev,
				[updatedFakemon.data.readKey]: {
					value: updatedFakemon,
					update: this,
				},
			}))
		} catch (e) {
			error.show(e.message)
			throw e
		}
	}
}