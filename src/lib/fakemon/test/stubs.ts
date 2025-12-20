import { SpeciesIdentifier } from "$lib/poke5e/species"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import type { Data } from "$lib/DataClass"
import { Fakemon } from "$lib/fakemon/Fakemon"

export function stubFakemon(template: Partial<Data<Fakemon>> = {}): Fakemon {
	return new Fakemon({
		id: "",
		readKey: "",
		writeKey: undefined,
		species: stubPokemonSpecies({
			id: SpeciesIdentifier.fromFakemonReadKey(template.readKey ?? "").data,
		}).data,
		...template,
	})
}
