import type { Writable } from "svelte/store"
import type { StoredFakemon } from "./FakemonStore"
import type { FakemonDataProvider } from "../data/FakemonDataProvider"
import type { Fakemon } from "../Fakemon"
import { error } from "$lib/site/errors"
import type { ImageInputValue } from "$lib/ui/forms"
import { SpeciesMedia } from "$lib/poke5e/species/media"

export type UpdateInfoOptions = {
	media?: SpeciesMedia<ImageInputValue>,
}

export class FakemonStoreUpdater {
	constructor(
		private readonly provider: FakemonDataProvider,
		private readonly fakemonStore: Writable<StoredFakemon>,
	) {}

	info = async (updatedFakemon: Fakemon, options: UpdateInfoOptions) => {
		try {
			if (options.media != null) {
				const updatedMedia = await this.provider.updateMedia(updatedFakemon.data.writeKey, options.media)

				SpeciesMedia.types.forEach((type) => {
					if (options.media.data.values[type]?.type === "remove") {
						updatedFakemon.data.species.media.values[type] = undefined
					} else if (options.media.data.values[type]?.type === "new") {
						updatedFakemon.data.species.media.values[type] = updatedMedia.data.values[type]
					}
				})
			}

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