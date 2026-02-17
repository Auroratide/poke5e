import { describe, test, expect } from "vitest"
import { Encounter, ENCOUNTER_SIZE_LIMIT } from "../Encounter"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import rawPokemonData from "./sample-pool.json"
import { PokemonSpecies } from "$lib/poke5e/species"
import type { SinglePokemonJsonResponse } from "$lib/poke5e/species/PokemonJsonResponse"
import { provider } from "$lib/trainers/data"

describe("totalExp", () => {
	test("empty encounter", () => {
		const encounter = Encounter.createEmpty()

		const result = Encounter.totalExp(encounter)

		expect(result).toEqual(0)
	})

	test("many of one pokemon", () => {
		const encounter: Encounter = {
			pokemon: [ {
				data: stubPokemonSpecies({
					sr: 1,
				}),
				level: 1,
				count: 5,
			} ],
		}

		const result = Encounter.totalExp(encounter)

		expect(result).toEqual(1000)
	})

	test("multiple pokemon", () => {
		const encounter: Encounter = {
			pokemon: [ {
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
			} ],
		}

		const result = Encounter.totalExp(encounter)

		expect(result).toEqual(1000)
	})

	test("count is 0 somehow", () => {
		const encounter: Encounter = {
			pokemon: [ {
				data: stubPokemonSpecies({
					sr: 1,
				}),
				level: 1,
				count: 0,
			} ],
		}

		const result = Encounter.totalExp(encounter)

		expect(result).toEqual(0)
	})
})

describe("count", () => {
	test("empty encounter", () => {
		const encounter = Encounter.createEmpty()

		const result = Encounter.count(encounter)

		expect(result).toEqual(0)
	})

	test("many of one pokemon", () => {
		const encounter: Encounter = {
			pokemon: [ {
				data: stubPokemonSpecies(),
				level: 1,
				count: 5,
			} ],
		}

		const result = Encounter.count(encounter)

		expect(result).toEqual(5)
	})

	test("multiple pokemon", () => {
		const encounter: Encounter = {
			pokemon: [ {
				data: stubPokemonSpecies(),
				level: 1,
				count: 1,
			}, {
				data: stubPokemonSpecies(),
				level: 2,
				count: 1,
			} ],
		}

		const result = Encounter.count(encounter)

		expect(result).toEqual(2)
	})

	test("count is 0 somehow", () => {
		const encounter: Encounter = {
			pokemon: [ {
				data: stubPokemonSpecies(),
				level: 1,
				count: 0,
			} ],
		}

		const result = Encounter.totalExp(encounter)

		expect(result).toEqual(0)
	})
})

describe("generate", () => {
	const ALL_POKEMON = rawPokemonData.items.map((it) => PokemonSpecies.fromJson(it as SinglePokemonJsonResponse))

	// NOTE: I'm not sure if this test is flakey yet.
	test("always within variance of the target exp", () => {
		const TOLERANCE = 1

		for (let i = 0; i < 100; ++i) {
			const targetExp = 200 * (i + 1)

			const result = Encounter.generate({
				pool: ALL_POKEMON,
				targetExp,
			})

			// TODO: refine algorithm to include a lower bound
			// expect(result.totalExp()).toBeGreaterThanOrEqual(targetExp * (1 - TOLERANCE))
			expect(Encounter.totalExp(result)).toBeLessThanOrEqual(targetExp * (1 + TOLERANCE))
		}
	})
})

describe("saveToTrainers", () => {
	test("no pokemon in encounter", async () => {
		const encounter = Encounter.createEmpty()

		await expect(Encounter.saveToTrainers(encounter)).rejects.toThrow()
	})

	test("encounter has pokemon", async () => {
		const encounter: Encounter = {
			pokemon: [ {
				data: stubPokemonSpecies({
					name: "Eevee",
					sr: 1,
				}),
				level: 3,
				count: 2,
			}, {
				data: stubPokemonSpecies({
					name: "Umbreon",
					sr: 2,
				}),
				level: 8,
				count: 1,
			} ],
		}

		const result = await Encounter.saveToTrainers(encounter)

		expect(result.pokemon.length).toEqual(3)

		const fromStorage = await provider.getTrainer(result.info.readKey)
		expect(fromStorage).toBeDefined()
	})

	test("too many pokemon in encounter", async () => {
		const encounter: Encounter = {
			pokemon: [ {
				data: stubPokemonSpecies({
					name: "Eevee",
					sr: 1,
				}),
				level: 3,
				count: ENCOUNTER_SIZE_LIMIT + 1,
			} ],
		}

		await expect(Encounter.saveToTrainers(encounter)).rejects.toThrow()
	})
})
