import { test, expect, vi, beforeEach, afterEach } from "vitest"
import { get } from "svelte/store"
import { waitForStore } from "$lib/test/store"
import { stubEvolution, stubEvolutionJsonResponse, stubSingleEvolutionJsonResponse } from "./stubs"
import { canonEvolutions, EvolutionStore } from "../EvolutionStore"
import { SpeciesIdentifier } from "$lib/creatures/species"
import { provider as fakemonProvider } from "$lib/fakemon/data"
import { provider as evolutionProvider } from "../data"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import { stubPokemonSpecies } from "$lib/creatures/species/test/stubs"
import type { Unsubscriber } from "svelte/store"
import type { EvolutionForest } from "../EvolutionForest"

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

test("getting the evolutions from canon list", async () => {
	const id = SpeciesIdentifier.fromSpeciesName("eevee")

	const storedValue = get(EvolutionStore.canonList())
	const eeveeEvo = storedValue.evolvesTo(id)

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

function waitForSpecies(species: SpeciesIdentifier): Promise<EvolutionForest> {
	let unsubscribe: Unsubscriber
	return new Promise<EvolutionForest>((resolve) => {
		unsubscribe = EvolutionStore.get(species).subscribe((forest) => {
			if (forest == null) return
			
			resolve(forest)
		})
	}).finally(() => {
		unsubscribe()
	})
}
