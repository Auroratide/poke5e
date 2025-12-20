import type { Data } from "$lib/DataClass"
import { SpeciesMedia, type UploadedMedia } from "../SpeciesMedia"

export function stubSpeciesMedia<T = UploadedMedia>(template: Partial<Data<SpeciesMedia<T>>> = {}): SpeciesMedia<T> {
	return new SpeciesMedia({
		values: {
			normalPortrait: undefined,
			normalSprite: undefined,
			shinyPortrait: undefined,
			shinySprite: undefined,
		},
		customization: {
			shinyHue: 0,
		},
		attribution: {
			portrait: {
				type: "",
				name: "",
				href: "",
			},
			sprite: {
				type: "",
				name: "",
				href: "",
			},
		},
		...template,
	})
}
