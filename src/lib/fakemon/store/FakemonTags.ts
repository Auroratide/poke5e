import type { Writable } from "svelte/store"
import type { StoredFakemon } from "./FakemonStore"
import type { FakemonDataProvider } from "../data/FakemonDataProvider"
import type { Fakemon } from "../Fakemon"
import { error } from "$lib/site/errors"
import type { ImageInputValue } from "$lib/ui/forms"
import { SpeciesMedia } from "$lib/poke5e/species/media"
import { TagsLocalStorage } from "$lib/poke5e/tags"

export type UpdateInfoOptions = {
	media?: SpeciesMedia<ImageInputValue>,
}

export class FakemonTags {
	constructor(
		private readonly provider: FakemonDataProvider,
		private readonly fakemonStore: Writable<StoredFakemon>,
	) {}

	update = async (updatedFakemon: Fakemon) => {
		try {
			if (updatedFakemon.data.writeKey) {
				await this.provider.update(updatedFakemon)
			} else {
				TagsLocalStorage.set(updatedFakemon.data.readKey, updatedFakemon.tags)
			}

			this.fakemonStore.update((prev) => ({
				...prev,
				[updatedFakemon.data.readKey]: {
					value: updatedFakemon,
					update: prev[updatedFakemon.data.readKey].update,
					tags: this,
				},
			}))
		} catch (e) {
			error.show("FakemonTags.update", e as Error)
			throw e
		}
	}
}
