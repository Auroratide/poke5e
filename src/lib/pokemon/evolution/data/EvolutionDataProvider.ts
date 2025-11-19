import type { SpeciesIdentifier } from "$lib/creatures/species"
import type { Data } from "$lib/DataClass"
import type { WriteKey } from "$lib/fakemon"
import type { Evolution, EvolutionId } from "../Evolution"

/**
 * You must have write-access to the fakemon being granted a
 * new evolution. The fields are optional in case we're stemming
 * off canon pokemon.
 */
export type EvolutionWriteKeys = {
	from?: WriteKey,
	to?: WriteKey,
}

export type EvolutionDraft = Omit<Data<Evolution>, "id">

export interface EvolutionDataProvider {
	get(species: SpeciesIdentifier): Promise<Evolution[]>
	add(evolution: EvolutionDraft, writeKeys: EvolutionWriteKeys): Promise<Evolution>
	remove(evolution: EvolutionId, writeKeys: EvolutionWriteKeys): Promise<void>
}

export class EvolutionDataProviderError extends Error {
	constructor(message: string) {
		super(message)
	}
}
