import type { CreatureSize } from "$lib/dnd/CreatureSize"
import type { Habitat } from "$lib/poke5e/habitat"
import { EggGroup } from "$lib/pokemon/egg-group"
import { PokemonType } from "$lib/pokemon/types"
import type { PokemonJson } from "$lib/srd/pokemon/schema"
import { SpeciesRating } from "../sr"
import { SpeciesIdentifier } from "./SpeciesIdentifier"

/**
 * Projection of PokemonSpecies to remove unused fields during SSR
 */
export type PokemonListing = {
	id: SpeciesIdentifier,
	name: string,
	aliases: string[],
	number: number,
	type: PokemonType,
	size: CreatureSize,
	sr: SpeciesRating,
	minLevel: number,
	eggGroups: EggGroup,
	habitat: Habitat,
}

export type PokemonListingJson = Pick<PokemonJson,
	"id" | "name" | "number" | "type" | "size" | "sr" | "minLevel" | "eggGroup" | "habitat">

const LISTING_FIELDS = ["id", "name", "number", "type", "size", "sr", "minLevel", "eggGroup", "habitat"] as const

export const PokemonListing = {
	/**
	 * strips the SRD json of things not needed during SSR to reduce payload size
	 */
	project: (json: PokemonJson): PokemonListingJson =>
		Object.fromEntries(
			LISTING_FIELDS
				.filter((field) => json[field] !== undefined)
				.map((field) => [field, json[field]]),
		) as PokemonListingJson,

	fromJson: (json: PokemonListingJson): PokemonListing => ({
		id: SpeciesIdentifier.fromSpeciesName(json.id),
		name: json.name,
		// The SRD carries no aliases; only fakemon and the legacy api ever had them.
		aliases: [],
		number: json.number,
		type: new PokemonType(json.type),
		size: json.size,
		sr: new SpeciesRating(json.sr),
		minLevel: json.minLevel,
		eggGroups: new EggGroup(json.eggGroup),
		habitat: json.habitat,
	}),

	/**
	 * Mirrors PokemonSpecies.wasNonCanonNonFakemon for raw SRD json, which is
	 * never fakemon: the original "official" set included campaign customs at #0.
	 */
	wasNonCanonNonFakemon: (json: Pick<PokemonJson, "number">): boolean => json.number === 0,
}
