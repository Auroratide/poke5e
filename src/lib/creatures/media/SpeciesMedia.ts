import { DataClass, type Data } from "$lib/DataClass"

export type UploadedMedia = {
	name: string,
	href: string,
}

export type SpeciesMediaType = keyof Data<SpeciesMedia<unknown>>

export class SpeciesMedia<T> extends DataClass<{
	normalPortrait?: T,
	normalSprite?: T,
	shinyPortrait?: T,
	shinySprite?: T,
}> {
	static readonly types: SpeciesMediaType[] = [
		"normalPortrait",
		"normalSprite",
		"shinyPortrait",
		"shinySprite",
	] as const

	static forEachType<T>(fn: (type: SpeciesMediaType) => T): SpeciesMedia<T> {
		return new SpeciesMedia(
			SpeciesMedia.types.reduce((obj, type) => ({
				...obj,
				[type]: fn(type),
			}), {}),
		)
	}
}
