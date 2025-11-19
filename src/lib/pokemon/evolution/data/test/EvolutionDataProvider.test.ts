import { describe, test, expect } from "vitest"
import { provider as fakemonProvider } from "$lib/fakemon/data"
import { provider as evolutionProvider } from ".."
import { stubEvolution } from "../../test/stubs"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import { stubPokemonSpecies } from "$lib/creatures/species/test/stubs"
import { SpeciesIdentifier } from "$lib/creatures/species"
import { EvolutionDataProviderError } from "../EvolutionDataProvider"

describe("add and get", () => {
	test("pokemon to fakemon", async () => {
		const fakemonDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Terreon",
			}).data,
		})

		const terreon = await fakemonProvider.add(fakemonDraft.data.species)

		const evolutionToAdd = stubEvolution({
			from: SpeciesIdentifier.fromSpeciesName("eevee").data,
			to: terreon.species.id.data,
		})

		await evolutionProvider.add(evolutionToAdd.data, {
			to: terreon.data.writeKey,
		})

		const result = await evolutionProvider.get(terreon.species.id)
		expect(result.length).toEqual(1)
		expect(result[0].data.to).toEqual(evolutionToAdd.data.to)
		expect(result[0].data.from).toEqual(evolutionToAdd.data.from)
		expect(result[0].data.conditions).toEqual(evolutionToAdd.data.conditions)
		expect(result[0].data.effects).toEqual(evolutionToAdd.data.effects)
	})
})

describe("removal", () => {
	test("previously existed", async () => {
		// given
		const fakemonDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Terreon",
			}).data,
		})

		const terreon = await fakemonProvider.add(fakemonDraft.data.species)

		const evolutionToAdd = stubEvolution({
			from: SpeciesIdentifier.fromSpeciesName("eevee").data,
			to: terreon.species.id.data,
		})

		const evolutionToRemove = await evolutionProvider.add(evolutionToAdd.data, {
			to: terreon.data.writeKey,
		})

		// when
		await evolutionProvider.remove(evolutionToRemove.id, {
			to: terreon.data.writeKey,
		})

		// then
		const result = await evolutionProvider.get(terreon.species.id)
		expect(result.length).toEqual(0)
	})

	test("non-existent id", async () => {
		await expect(evolutionProvider.remove("-1", {})).rejects.toThrow(EvolutionDataProviderError)
	})
})
