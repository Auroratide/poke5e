import { describe, test, expect } from "vitest"
import { Encounter } from "../Encounter"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import rawPokemonData from "./sample-pool.json"
import { PokemonSpecies } from "$lib/poke5e/species"
import type { SinglePokemonJsonResponse } from "$lib/poke5e/species/PokemonJsonResponse"

describe("totalExp", () => {
	test("empty encounter", () => {
		const encounter = new Encounter([])

		const result = encounter.totalExp()

		expect(result).toEqual(0)
	})

	test("many of one pokemon", () => {
		const encounter = new Encounter([ {
			data: stubPokemonSpecies({
				sr: 1,
			}),
			level: 1,
			count: 5,
		} ])

		const result = encounter.totalExp()

		expect(result).toEqual(1000)
	})

	test("multiple pokemon", () => {
		const encounter = new Encounter([ {
			data: stubPokemonSpecies({
				sr: 1,
			}),
			level: 1,
			count: 1,
		}, {
			data: stubPokemonSpecies({
				sr: 2,
			}),
			level: 2,
			count: 1,
		} ])

		const result = encounter.totalExp()

		expect(result).toEqual(1000)
	})

	test("count is 0 somehow", () => {
		const encounter = new Encounter([ {
			data: stubPokemonSpecies({
				sr: 1,
			}),
			level: 1,
			count: 0,
		} ])

		const result = encounter.totalExp()

		expect(result).toEqual(0)
	})
})

describe("generate", () => {
	const ALL_POKEMON = rawPokemonData.items.map((it) => PokemonSpecies.fromJson(it as SinglePokemonJsonResponse))

	// NOTE: I'm not sure if this test is flakey yet.
	test("always within variance of the target exp", () => {
		const TOLERANCE = 0.5

		for (let i = 0; i < 100; ++i) {
			const targetExp = 200 * (i + 1)

			const result = Encounter.generate({
				pool: ALL_POKEMON,
				targetExp,
			})

			// TODO: refine algorithm to include a lower bound
			// expect(result.totalExp()).toBeGreaterThanOrEqual(targetExp * (1 - TOLERANCE))
			expect(result.totalExp()).toBeLessThanOrEqual(targetExp * (1 + TOLERANCE))
		}
	})
})
