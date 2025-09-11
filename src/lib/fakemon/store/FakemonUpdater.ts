import type { Writable } from "svelte/store"
import type { StoredFakemon } from "./FakemonStore"
import type { FakemonDataProvider } from "../data/FakemonDataProvider"
import type { Fakemon } from "../Fakemon"
import { error } from "$lib/design/errors/store"
import { FakemonMedia } from "../media"
import type { ImageInputValue } from "$lib/design/forms"

export type UpdateInfoOptions = {
	media?: FakemonMedia<ImageInputValue>,
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

				FakemonMedia.types.forEach((type) => {
					if (options.media.data[type]?.type === "remove") {
						updatedFakemon.data.media[type] = undefined
					} else if (options.media.data[type]?.type === "new") {
						updatedFakemon.data.media[type] = updatedMedia.data[type]
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