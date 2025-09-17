import { test, expect, vi, beforeEach, afterEach } from "vitest"
import { allCanonSpecies, SpeciesStore } from "../SpeciesStore"
import { SpeciesIdentifier } from "../SpeciesIdentifier"
import { get } from "svelte/store"
import { stubPokemonJsonResponse, stubPokemonSpecies, stubSinglePokemonJsonResponse } from "./stubs"
import { stubFakemon } from "$lib/fakemon/test/stubs"
import { provider } from "$lib/fakemon/data"
import { waitForStore } from "$lib/test/store"

beforeEach(async () => {
	const eevee = stubSinglePokemonJsonResponse({
		id: "eevee",
		name: "Eevee",
	})

	const pokemon = stubPokemonJsonResponse(eevee)

	vi.stubGlobal("fetch", vi.fn(async (url: string) => {
		if (url.includes("pokemon.json")) {
			return new Response(JSON.stringify(pokemon))
		} else {
			return new Response("", {
				status: 404,
			})
		}
	}))

	await waitForStore(allCanonSpecies)
})

afterEach(() => {
	vi.resetAllMocks()
})

test("getting a regular pokemon", async () => {
	const id = SpeciesIdentifier.fromSpeciesName("eevee")

	const singleStore = await SpeciesStore.get(id)
	const storedValue = get(singleStore)

	expect(storedValue.value.data.name).toEqual("Eevee")
})

test("regular pokemon does not exist", async () => {
	const id = SpeciesIdentifier.fromSpeciesName("uhoh")

	const singleStore = await SpeciesStore.get(id)
	const storedValue = get(singleStore)

	expect(storedValue).toBe(undefined)
})

test("getting a fakemon", async () => {
	const draft = stubFakemon({
		species: stubPokemonSpecies({
			name: "Eeveon",
		}).data,
	})

	const eeveon = await provider.add(draft.data.species)

	const id = SpeciesIdentifier.fromFakemonReadKey(eeveon.data.readKey)

	const singleStore = await SpeciesStore.get(id)
	const storedValue = get(singleStore)

	expect(storedValue.value.data.name).toEqual("Eeveon")
})

test("fakemon does not exist", async () => {
	const id = SpeciesIdentifier.fromFakemonReadKey("DOES_NOT_EXIST")

	const singleStore = await SpeciesStore.get(id)
	const storedValue = get(singleStore)

	expect(storedValue).toBe(undefined)
})
