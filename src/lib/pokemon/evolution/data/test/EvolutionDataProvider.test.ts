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

		// when
		await evolutionProvider.add(evolutionToAdd.data, {
			to: terreon.data.writeKey,
		})

		// then
		const result = await evolutionProvider.get(terreon.species.id)
		expect(result.length).toEqual(1)
		expect(result[0].data.to).toEqual(evolutionToAdd.data.to)
		expect(result[0].data.from).toEqual(evolutionToAdd.data.from)
		expect(result[0].data.conditions).toEqual(evolutionToAdd.data.conditions)
		expect(result[0].data.effects).toEqual(evolutionToAdd.data.effects)
	})

	test("fakemon to pokemon", async () => {
		// given
		const fakemonDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Babeevee",
			}).data,
		})

		const babeevee = await fakemonProvider.add(fakemonDraft.data.species)

		const evolutionToAdd = stubEvolution({
			from: babeevee.species.id.data,
			to: SpeciesIdentifier.fromSpeciesName("eevee").data,
		})

		// when
		await evolutionProvider.add(evolutionToAdd.data, {
			from: babeevee.data.writeKey,
		})

		// then
		const result = await evolutionProvider.get(babeevee.species.id)
		expect(result.length).toEqual(1)
		expect(result[0].data.to).toEqual(evolutionToAdd.data.to)
		expect(result[0].data.from).toEqual(evolutionToAdd.data.from)
		expect(result[0].data.conditions).toEqual(evolutionToAdd.data.conditions)
		expect(result[0].data.effects).toEqual(evolutionToAdd.data.effects)
	})

	test("fakemon to fakemon", async () => {
		// given
		const ironTailDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Iron Tail",
			}).data,
		})
		const ironFlameDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Iron Flame",
			}).data,
		})

		const ironTail = await fakemonProvider.add(ironTailDraft.data.species)
		const ironFlame = await fakemonProvider.add(ironFlameDraft.data.species)

		const evolutionToAdd = stubEvolution({
			from: ironTail.species.id.data,
			to: ironFlame.species.id.data,
		})

		// when
		await evolutionProvider.add(evolutionToAdd.data, {
			from: ironTail.data.writeKey,
			to: ironFlame.data.writeKey,
		})

		// then
		const ironTailResult = await evolutionProvider.get(ironTail.species.id)
		expect(ironTailResult.length).toEqual(1)
		expect(ironTailResult[0].from.data).toEqual(ironTail.species.data.id)
		expect(ironTailResult[0].to.data).toEqual(ironFlame.species.data.id)

		const ironFlameResult = await evolutionProvider.get(ironFlame.species.id)
		expect(ironFlameResult.length).toEqual(1)
		expect(ironFlameResult[0].from.data).toEqual(ironTail.species.data.id)
		expect(ironFlameResult[0].to.data).toEqual(ironFlame.species.data.id)
	})
})

describe("updating", () => {
	test("conditions and/or effects change only", async () => {
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
			conditions: [ {
				type: "level",
				value: 8,
			} ],
		})

		const evolution = await evolutionProvider.add(evolutionToAdd.data, {
			to: terreon.data.writeKey,
		})

		// when
		evolution.data.conditions[0].value = 5
		await evolutionProvider.update(evolution, {
			to: terreon.data.writeKey,
		}, {
			to: terreon.data.writeKey,
		})

		// then
		const result = await evolutionProvider.get(terreon.species.id)
		expect(result[0].data.conditions).toEqual(evolution.data.conditions)
	})

	test("the actual evolution line changes", async () => {
		// given
		const terreonDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Terreon",
			}).data,
		})

		const minereonDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Minereon",
			}).data,
		})

		const terreon = await fakemonProvider.add(terreonDraft.data.species)
		const minereon = await fakemonProvider.add(minereonDraft.data.species)

		const evolutionToAdd = stubEvolution({
			from: SpeciesIdentifier.fromSpeciesName("eevee").data,
			to: terreon.species.id.data,
		})

		const evolution = await evolutionProvider.add(evolutionToAdd.data, {
			to: terreon.data.writeKey,
		})

		// when
		evolution.data.to = minereon.species.id.data
		await evolutionProvider.update(evolution, {
			to: minereon.data.writeKey,
		}, {
			to: terreon.data.writeKey,
		})

		// then
		const terreonResult = await evolutionProvider.get(terreon.species.id)
		expect(terreonResult.length).toEqual(0)

		const minereonResult = await evolutionProvider.get(minereon.species.id)
		expect(minereonResult.length).toEqual(1)
	})

	test("original write keys were not known", async () => {
		// given
		const terreonDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Terreon",
			}).data,
		})

		const minereonDraft = stubFakemon({
			species: stubPokemonSpecies({
				name: "Minereon",
			}).data,
		})

		const terreon = await fakemonProvider.add(terreonDraft.data.species)
		const minereon = await fakemonProvider.add(minereonDraft.data.species)

		const evolutionToAdd = stubEvolution({
			from: SpeciesIdentifier.fromSpeciesName("eevee").data,
			to: terreon.species.id.data,
		})

		const evolution = await evolutionProvider.add(evolutionToAdd.data, {
			to: terreon.data.writeKey,
		})

		// when
		evolution.data.to = minereon.species.id.data

		// then
		await expect(evolutionProvider.update(evolution, {
			to: minereon.data.writeKey,
		}, {})).rejects.toThrow(EvolutionDataProviderError)
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
