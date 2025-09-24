import { DataClass, type Data } from "$lib/DataClass"

export type UploadedMedia = {
	name: string,
	href: string,
}

export type SpeciesMediaType = keyof Data<SpeciesMedia<unknown>>["values"]

export type SpeciesMediaCustomization = {
	shinyHue: number,
}

export type SpeciesMediaAttribution = {
	/**
	 * Temporary for the random fakemons that exist in the official list.
	 */
	href?: string,
}

export class SpeciesMedia<T> extends DataClass<{
	values: {
		normalPortrait?: T,
		normalSprite?: T,
		shinyPortrait?: T,
		shinySprite?: T,
	},
	customization?: SpeciesMediaCustomization,
	attribution?: SpeciesMediaAttribution,
}> {
	static readonly types: SpeciesMediaType[] = [
		"normalPortrait",
		"normalSprite",
		"shinyPortrait",
		"shinySprite",
	] as const

	portrait({ shiny = false }: { shiny?: boolean } = {}): {
		value: T,
		hueRotate: number,
	} {
		if (shiny && this.data.values.shinyPortrait !== undefined) {
			return {
				value: this.data.values.shinyPortrait,
				hueRotate: 0,
			}
		}
		
		if (shiny && this.data.values.shinyPortrait === undefined) {
			return {
				value: this.data.values.normalPortrait!,
				hueRotate: this.customization.shinyHue,
			}
		}
		
		return {
			value: this.data.values.normalPortrait!,
			hueRotate: 0,
		}
	}

	sprite({ shiny = false }: { shiny?: boolean } = {}): {
		value: T,
		hueRotate: number,
		portraitFallback: boolean,
	} {
		if (shiny && this.data.values.shinySprite !== undefined) {
			return {
				value: this.data.values.shinySprite,
				hueRotate: 0,
				portraitFallback: false,
			}
		}
		
		if (this.data.values.normalSprite !== undefined) {
			return {
				value: this.data.values.normalSprite,
				hueRotate: shiny ? this.customization.shinyHue : 0,
				portraitFallback: false,
			}
		}
		
		if (shiny && this.data.values.shinyPortrait !== undefined) {
			return {
				value: this.data.values.shinyPortrait,
				hueRotate: 0,
				portraitFallback: true,
			}
		}
		
		return {
			value: this.data.values.normalPortrait!,
			hueRotate: shiny ? this.customization.shinyHue : 0,
			portraitFallback: true,
		}
	}

	hasAnyMedia(): boolean {
		return Object.values(this.data.values).some((it) => it != null)
	}

	get customization(): SpeciesMediaCustomization {
		return this.data.customization ?? {
			shinyHue: 0,
		}
	}

	static forEachType<T>(fn: (type: SpeciesMediaType) => T): SpeciesMedia<T> {
		return new SpeciesMedia({
			values: SpeciesMedia.types.reduce((obj, type) => ({
				...obj,
				[type]: fn(type),
			}), {}),
		})
	}
}
