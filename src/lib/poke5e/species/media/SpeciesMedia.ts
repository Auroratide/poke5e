import { DataClass, type Data } from "$lib/DataClass"
import { PokemonGender } from "$lib/pokemon/gender"

export type UploadedMedia = {
	name: string,
	href: string,
}

export type SpeciesMediaType = keyof Data<SpeciesMedia<unknown>>["values"]

export type SpeciesMediaCustomization = {
	shinyHue: number,
}

export type SpeciesMediaTypeAttribution = {
	type: "human" | "ai" | "other" | "",
	name: string,
	href: string,
}

export type SpeciesMediaAttribution = {
	/**
	 * Temporary for the random fakemons that exist in the official list.
	 */
	href?: string,
	portrait: SpeciesMediaTypeAttribution,
	sprite: SpeciesMediaTypeAttribution,
}

export class SpeciesMedia<T> extends DataClass<{
	values: {
		normalPortrait?: T,
		normalSprite?: T,
		shinyPortrait?: T,
		shinySprite?: T,
		normalPortraitF?: T,
		normalSpriteF?: T,
		shinyPortraitF?: T,
		shinySpriteF?: T,
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

	static readonly attributionTypes: {
		name: string,
		value: SpeciesMediaTypeAttribution["type"]
	}[] = [ {
			name: "Human Drawn",
			value: "human",
		}, {
			name: "AI Generated",
			value: "ai",
		}, {
			name: "Other",
			value: "other",
		} ]

	portrait({ shiny = false, gender }: { shiny?: boolean, gender?: PokemonGender } = {}): {
		value: T,
		hueRotate: number,
	} {
		const set = this.setByGender(gender)

		if (shiny && set.shinyPortrait !== undefined) {
			return {
				value: set.shinyPortrait,
				hueRotate: 0,
			}
		}
		
		if (shiny && set.shinyPortrait === undefined) {
			return {
				value: set.normalPortrait!,
				hueRotate: this.customization.shinyHue,
			}
		}
		
		return {
			value: set.normalPortrait!,
			hueRotate: 0,
		}
	}

	sprite({ shiny = false, gender }: { shiny?: boolean, gender?: PokemonGender } = {}): {
		value: T,
		hueRotate: number,
		portraitFallback: boolean,
	} {
		const set = this.setByGender(gender)

		if (shiny && set.shinySprite !== undefined) {
			return {
				value: set.shinySprite,
				hueRotate: 0,
				portraitFallback: false,
			}
		}
		
		if (set.normalSprite !== undefined) {
			return {
				value: set.normalSprite,
				hueRotate: shiny ? this.customization.shinyHue : 0,
				portraitFallback: false,
			}
		}
		
		if (shiny && set.shinyPortrait !== undefined) {
			return {
				value: set.shinyPortrait,
				hueRotate: 0,
				portraitFallback: true,
			}
		}
		
		return {
			value: set.normalPortrait!,
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

	private setByGender(gender: PokemonGender = PokemonGender.Male): {
		normalPortrait?: T,
		normalSprite?: T,
		shinyPortrait?: T,
		shinySprite?: T,
	} {
		if (gender === PokemonGender.Female) {
			return {
				normalPortrait: this.data.values.normalPortraitF ?? this.data.values.normalPortrait,
				normalSprite: this.data.values.normalSpriteF ?? this.data.values.normalSprite,
				shinyPortrait: this.data.values.shinyPortraitF ?? this.data.values.shinyPortrait,
				shinySprite: this.data.values.shinySpriteF ?? this.data.values.shinySprite,
			}
		} else {
			return {
				normalPortrait: this.data.values.normalPortrait,
				normalSprite: this.data.values.normalSprite,
				shinyPortrait: this.data.values.shinyPortrait,
				shinySprite: this.data.values.shinySprite,
			}
		}
	}
}
