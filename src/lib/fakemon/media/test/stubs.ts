import type { Data } from "$lib/DataClass"
import { FakemonMedia, type UploadedMedia } from "../FakemonMedia"

export function stubFakemonMedia<T = UploadedMedia>(template: Data<FakemonMedia<T>> = {}): FakemonMedia<T> {
	return new FakemonMedia({
		normalPortrait: undefined,
		normalSprite: undefined,
		shinyPortrait: undefined,
		shinySprite: undefined,
		...template,
	})
}
