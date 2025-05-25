import type { Specializations } from "../specializations"

export function stubSpecializations(template: Partial<Specializations>): Specializations {
	return {
		normal: 0,
		fighting: 0,
		flying: 0,
		fire: 0,
		water: 0,
		grass: 0,
		electric: 0,
		rock: 0,
		ground: 0,
		dark: 0,
		fairy: 0,
		dragon: 0,
		bug: 0,
		steel: 0,
		psychic: 0,
		poison: 0,
		ghost: 0,
		ice: 0,
		...template,
	}
}
