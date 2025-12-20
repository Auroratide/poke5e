import { test, expect, vi, beforeEach, afterEach } from "vitest"
import { get } from "svelte/store"
import { waitForStore } from "$lib/test/store"
import { stubEvolution, stubEvolutionJsonResponse, stubSingleEvolutionJsonResponse } from "./stubs"
import { canonEvolutions, EvolutionStore } from "../EvolutionStore"
import { SpeciesIdentifier } from "$lib/poke5e/species"
import { provider as fakemonProvider } from "$lib/fakemon/data"
import { provider as evolutionProvider } from "../data"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { EvolutionForest } from "../EvolutionForest"
import { tmpEvolutionId } from "../Evolution"
import { FakemonLocalStorage } from "$lib/fakemon/data/FakemonLocalStorage"

beforeEach(async () => {
	const eeveeToFlareon = stubSingleEvolutionJsonResponse({
		from: "eevee",
		to: "flareon",
		conditions: [ {
			type: "level",
			value: 6,
		} ],
	})

	const evolutions = stubEvolutionJsonResponse(eeveeToFlareon)

	vi.stubGlobal("fetch", vi.fn(async (url: string) => {
		if (url.includes("evolutions/v1.json")) {
			return new Response(JSON.stringify(evolutions))
		} else {
			return new Response("", {
				status: 404,
			})
		}
	}))

	await waitForStore(canonEvolutions)
})

afterEach(() => {
	vi.resetAllMocks()
})

test("getting the evolutions from canon list, ignore fakemon", async () => {
	// given
	const eevee = SpeciesIdentifier.fromSpeciesName("eevee")

	const fakemonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Terreon",
		}).data,
	})

	const terreon = await fakemonProvider.add(fakemonDraft.data.species)

	const evolution = stubEvolution({
		from: eevee.data,
		to: terreon.species.id.data,
	})

	await evolutionProvider.add(evolution.data, {
		to: terreon.data.writeKey,
	})

	// when
	await waitForSpecies(terreon.species.id) // load terreon's data
	const storedValue = get(EvolutionStore.canonList())
	const eeveeEvo = storedValue.evolvesTo(eevee)

	// then
	expect(eeveeEvo.length).toEqual(1) // as defined by the stub
	expect(eeveeEvo[0].to.data).toEqual("flareon")
})

test("getting the evolutions for a regular pokemon", async () => {
	const id = SpeciesIdentifier.fromSpeciesName("eevee")

	const storedValue = await waitForSpecies(id)
	const eeveeEvo = storedValue.evolvesTo(id)

	expect(eeveeEvo[0].to.data).toEqual("flareon")
})

test("getting the evolutions for a fakemon", async () => {
	// given
	const fakemonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Terreon",
		}).data,
	})

	const terreon = await fakemonProvider.add(fakemonDraft.data.species)

	const evolution = stubEvolution({
		from: SpeciesIdentifier.fromSpeciesName("eevee").data,
		to: terreon.species.id.data,
	})

	await evolutionProvider.add(evolution.data, {
		to: terreon.data.writeKey,
	})

	// when
	const storedValue = await waitForSpecies(terreon.species.id)
	const terreonEvo = storedValue.evolvesFrom(terreon.species.id)

	// then
	expect(terreonEvo[0].to).toEqualData(terreon.species.id)
})

test("getting the entire fakemon's chain", async () => {
	// given
	const stageOneDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "StageOne",
		}).data,
	})

	const stageTwoDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "StageOne",
		}).data,
	})

	const stageThreeDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "StageOne",
		}).data,
	})

	const stageOne = await fakemonProvider.add(stageOneDraft.data.species)
	const stageTwo = await fakemonProvider.add(stageTwoDraft.data.species)
	const stageThree = await fakemonProvider.add(stageThreeDraft.data.species)

	const oneToTwo = stubEvolution({
		from: stageOne.species.id.data,
		to: stageTwo.species.id.data,
	})

	const twoToThree = stubEvolution({
		from: stageTwo.species.id.data,
		to: stageThree.species.id.data,
	})

	await evolutionProvider.add(oneToTwo.data, {
		from: stageOne.data.writeKey,
		to: stageTwo.data.writeKey,
	})

	await evolutionProvider.add(twoToThree.data, {
		from: stageTwo.data.writeKey,
		to: stageThree.data.writeKey,
	})

	// when
	const storedValue = await waitForSpecies(stageThree.species.id)
	const stageThreeMaxStage = storedValue.maxStage(stageThree.species.id)

	// then
	expect(stageThreeMaxStage).toEqual(3)
})

test("getting all locally registered fakemon evolitoons", async () => {
	// given
	const fakemonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Terreon",
		}).data,
	})

	const terreon = await fakemonProvider.add(fakemonDraft.data.species)

	const evolution = stubEvolution({
		from: SpeciesIdentifier.fromSpeciesName("eevee").data,
		to: terreon.species.id.data,
	})

	await evolutionProvider.add(evolution.data, {
		to: terreon.data.writeKey,
	})

	FakemonLocalStorage.add(terreon.data)

	// when
	const storedValue = await waitForAll()
	const terreonEvo = storedValue.evolvesFrom(terreon.species.id)

	// then
	expect(terreonEvo[0].to).toEqualData(terreon.species.id)
})

test("adding a new evolution", async () => {
	// given
	const fakemonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Toxeon",
		}).data,
	})

	const toxeon = await fakemonProvider.add(fakemonDraft.data.species)

	const evolution = stubEvolution({
		id: tmpEvolutionId(),
		from: SpeciesIdentifier.fromSpeciesName("eevee").data,
		to: toxeon.species.id.data,
	})
	
	// when
	await EvolutionStore.update([{
		type: "upsert",
		evolution: evolution,
		writeKeys: {
			from: undefined,
			to: toxeon.data.writeKey,
		},
	}])

	const storedValue = await waitForSpecies(toxeon.species.id)
	const toxeonEvolution = storedValue.evolvesFrom(toxeon.species.id)

	// then
	expect(toxeonEvolution[0].to).toEqualData(toxeon.species.id)
})

test("removing an evolution", async () => {
	// given
	const fakemonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Toxeon",
		}).data,
	})

	const toxeon = await fakemonProvider.add(fakemonDraft.data.species)

	const evolutionDraft = stubEvolution({
		id: tmpEvolutionId(),
		from: SpeciesIdentifier.fromSpeciesName("eevee").data,
		to: toxeon.species.id.data,
	})

	const evolution = await evolutionProvider.add(evolutionDraft.data, {
		to: toxeon.data.writeKey,
	})
	
	// when
	await EvolutionStore.update([{
		type: "remove",
		evolution: evolution,
		writeKeys: {
			from: undefined,
			to: toxeon.data.writeKey,
		},
	}])

	const storedValue = await waitForSpecies(toxeon.species.id)
	const toxeonEvolution = storedValue.evolvesFrom(toxeon.species.id)

	// then
	expect(toxeonEvolution.length).toEqual(0)
})

test("updating an existing evolution condition", async () => {
	// given
	const fakemonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Aereon",
		}).data,
	})

	const aereon = await fakemonProvider.add(fakemonDraft.data.species)

	const evolutionDraft = stubEvolution({
		from: SpeciesIdentifier.fromSpeciesName("eevee").data,
		to: aereon.species.id.data,
		conditions: [ {
			type: "gender",
			value: "male",
		} ],
	})

	const evolution = await evolutionProvider.add(evolutionDraft.data, {
		to: aereon.data.writeKey,
	})

	// when
	evolution.data.conditions[0].value = "female"
	await EvolutionStore.update([{
		type: "upsert",
		evolution: evolution,
		writeKeys: {
			from: undefined,
			to: aereon.data.writeKey,
		},
		originalKeys: {
			from: undefined,
			to: aereon.data.writeKey,
		},
	}])
	const storedValue = await waitForSpecies(aereon.species.id)
	const aereonEvolution = storedValue.evolvesFrom(aereon.species.id)

	// then
	expect(aereonEvolution[0].data.conditions[0]).toEqual({
		type: "gender",
		value: "female",
	})
})

test("updating an existing evolution identity", async () => {
	// given
	const aereonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Aereon",
		}).data,
	})
	const pesteonDraft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Pesteon",
		}).data,
	})

	const aereon = await fakemonProvider.add(aereonDraft.data.species)
	const pesteon = await fakemonProvider.add(pesteonDraft.data.species)

	const evolutionDraft = stubEvolution({
		from: SpeciesIdentifier.fromSpeciesName("eevee").data,
		to: aereon.species.id.data,
	})

	const evolution = await evolutionProvider.add(evolutionDraft.data, {
		to: aereon.data.writeKey,
	})

	// when
	evolution.data.to = pesteon.species.data.id
	await EvolutionStore.update([{
		type: "upsert",
		evolution: evolution,
		writeKeys: {
			from: undefined,
			to: pesteon.data.writeKey,
		},
		originalKeys: {
			from: undefined,
			to: aereon.data.writeKey,
		},
	}])
	
	// then
	const storedValue = await waitForSpecies(aereon.species.id)
	const aereonEvolution = storedValue.evolvesFrom(aereon.species.id)
	expect(aereonEvolution.length).toEqual(0)

	const pesteonEvolution = storedValue.evolvesFrom(pesteon.species.id)
	expect(pesteonEvolution.length).toEqual(1)
})

function waitForSpecies(species: SpeciesIdentifier): Promise<EvolutionForest> {
	return waitForStore<EvolutionForest>(EvolutionStore.get(species))
}

function waitForAll(): Promise<EvolutionForest> {
	return waitForStore<EvolutionForest>(EvolutionStore.all())
}
