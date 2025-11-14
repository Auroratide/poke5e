import { test, expect, vi, beforeEach, afterEach } from "vitest"
import { get } from "svelte/store"
import { waitForStore } from "$lib/test/store"
import { stubEvolutionJsonResponse, stubSingleEvolutionJsonResponse } from "./stubs"
import { canonEvolutions, EvolutionStore } from "../EvolutionStore"
import { SpeciesIdentifier } from "$lib/creatures/species"

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

test("getting the evolutions for a regular pokemon", async () => {
	const id = SpeciesIdentifier.fromSpeciesName("eevee")

	const storedValue = get(EvolutionStore.canonList())
	const eeveeEvo = storedValue.evolvesTo(id)

	expect(eeveeEvo[0].to.data).toEqual("flareon")
})
