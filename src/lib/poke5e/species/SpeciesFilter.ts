import type { CreatureSize } from "$lib/dnd/CreatureSize"
import { relativeNumberCompare, type RelativeValue } from "$lib/ui/forms"
import type { PokemonSpecies } from "./PokemonSpecies"

export class SpeciesFilter {
	private filters: {
		name: string,
		size: CreatureSize | ""
		sr: undefined | {
			relative: RelativeValue,
			value: number,
		}
	} = {
			name: "",
			size: "",
			sr: undefined,
		}

	count(): number {
		return Object.values(this.filters).reduce((sum, cur) => sum + (cur == null || cur === "" ? 0 : 1), 0)
	}

	name(value: string): SpeciesFilter {
		this.filters.name = value
		return this
	}

	size(value: CreatureSize | ""): SpeciesFilter {
		this.filters.size = value
		return this
	}

	sr(relative: RelativeValue, value: number | undefined): SpeciesFilter {
		this.filters.sr = value != null ? {
			relative,
			value,
		} : undefined
		return this
	}

	apply = (species: PokemonSpecies): boolean => {
		return species.name.toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase())
			&& (this.filters.size === "" || species.size === this.filters.size)
			&& (this.filters.sr == null || relativeNumberCompare(this.filters.sr.relative, species.sr.data, this.filters.sr.value))
	}
}
