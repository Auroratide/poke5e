import { PokemonSpecies } from "$lib/creatures/species"
import { DataClass, type Data } from "$lib/DataClass"

export type FakemonId = string
export type ReadKey = string
export type WriteKey = string

export class Fakemon extends DataClass<{
	id: FakemonId,
	readKey: ReadKey,
	writeKey?: WriteKey,
	species: Data<PokemonSpecies>,
}> {
	get species(): PokemonSpecies { return new PokemonSpecies(this.data.species) }

	static alphabetical = (a: Fakemon, b: Fakemon) => a.data.species.name.localeCompare(b.data.species.name)
}

export type DraftFakemon = Omit<Data<Fakemon>["species"], "id">
