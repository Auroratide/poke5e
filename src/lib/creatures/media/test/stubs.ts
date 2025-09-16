import type { Data } from "$lib/DataClass"
import { SpeciesMedia, type UploadedMedia } from "../SpeciesMedia"

export function stubSpeciesMedia<T = UploadedMedia>(template: Data<SpeciesMedia<T>> = {}): SpeciesMedia<T> {
	return new SpeciesMedia({
		normalPortrait: undefined,
		normalSprite: undefined,
		shinyPortrait: undefined,
		shinySprite: undefined,
		...template,
	})
}
