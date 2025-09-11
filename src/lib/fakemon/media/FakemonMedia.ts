import { DataClass, type Data } from "$lib/DataClass"

export type UploadedMedia = {
	name: string,
	href: string,
}

type FakemonMediaType = keyof Data<FakemonMedia<unknown>>

export class FakemonMedia<T> extends DataClass<{
	normalPortrait?: T,
	normalSprite?: T,
	shinyPortrait?: T,
	shinySprite?: T,
}> {
	static readonly types: FakemonMediaType[] = [
		"normalPortrait",
		"normalSprite",
		"shinyPortrait",
		"shinySprite",
	] as const

	static forEachType<T>(fn: (type: FakemonMediaType) => T): FakemonMedia<T> {
		return new FakemonMedia(
			FakemonMedia.types.reduce((obj, type) => ({
				...obj,
				[type]: fn(type),
			}), {}),
		)
	}
}
