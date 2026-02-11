import type { CreatureSize } from "$lib/dnd/CreatureSize"
import type { PokeType } from "$lib/pokemon/types"
import { relativeNumberCompare, type RelativeValue } from "$lib/ui/forms"
import type { PokemonSpecies } from "./PokemonSpecies"

export class SpeciesFilter {
	private filters: {
		name: string,
		size: CreatureSize | ""
		sr: undefined | {
			relative: RelativeValue,
			value: number,
		},
		minLevel: undefined | {
			relative: RelativeValue,
			value: number,
		},
		type: string,
		eggGroup: string,
		biome: string,
	} = {
			name: "",
			size: "",
			sr: undefined,
			minLevel: undefined,
			type: "",
			eggGroup: "",
			biome: "",
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

	minLevel(relative: RelativeValue, value: number | undefined): SpeciesFilter {
		this.filters.minLevel = value != null ? {
			relative,
			value,
		} : undefined
		return this
	}

	type(value: string): SpeciesFilter {
		this.filters.type = value
		return this
	}

	eggGroup(value: string): SpeciesFilter {
		this.filters.eggGroup = value
		return this
	}

	biome(value: string): SpeciesFilter {
		this.filters.biome = value
		return this
	}

	apply = (species: PokemonSpecies): boolean => {
		return species.name.toLocaleLowerCase().includes(this.filters.name.toLocaleLowerCase())
			&& (this.filters.size === "" || species.size === this.filters.size)
			&& (this.filters.sr == null || relativeNumberCompare(this.filters.sr.relative, species.sr.data, this.filters.sr.value))
			&& (this.filters.minLevel == null || relativeNumberCompare(this.filters.minLevel.relative, species.minLevel, this.filters.minLevel.value))
			&& (this.filters.type === "" || species.type.includes(this.filters.type.toLocaleLowerCase() as PokeType))
			&& (this.filters.eggGroup === "" || species.eggGroups.includes(this.filters.eggGroup))
			&& (this.filters.biome === "" || species.habitat.biomes.includes(this.filters.biome))
	}
}
