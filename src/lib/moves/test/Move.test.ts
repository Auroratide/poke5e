import { describe, test, expect } from "vitest"
import { stubMove, stubTmDetails } from "./stubs-2"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"

describe("pokemonWhoLearnThis", () => {
	const allPokemon = [
		stubPokemonSpecies({
			id: "p1",
			moves: {
				start: ["tackle"],
			},
		}),
		stubPokemonSpecies({
			id: "p2",
			moves: {
				start: [],
				level6: ["tackle"],
			},
		}),
		stubPokemonSpecies({
			id: "p3",
			moves: {
				start: [],
				egg: ["tackle"],
			},
		}),
		stubPokemonSpecies({
			id: "p4",
			moves: {
				start: [],
				tm: [1],
			},
		}),
		stubPokemonSpecies({
			id: "p5",
			moves: {
				start: ["tail whip"],
			},
		}),
		stubPokemonSpecies({
			id: "p6",
			moves: {
				start: [],
				level6: ["tail whip"],
			},
		}),
		stubPokemonSpecies({
			id: "p7",
			moves: {
				start: [],
				egg: ["tail whip"],
			},
		}),
		stubPokemonSpecies({
			id: "p8",
			moves: {
				start: [],
				tm: [2],
			},
		}),
	]

	test("no pokemon learns this", () => {
		const move = stubMove({
			id: "not-knowable",
		})

		const result = move.pokemonWhoLearnThis(allPokemon)

		expect(result).toEqual([])
	})

	test("some pokemon learn this", () => {
		const move = stubMove({
			id: "tackle",
			tm: stubTmDetails({
				id: 1,
			}).data,
		})

		const result = move.pokemonWhoLearnThis(allPokemon)
		const ids = result.map((it) => it.id.data)

		expect(ids).toEqual(["p1", "p2", "p3", "p4"])
	})
})

describe("pokemonWhoLearnThisViaTm", () => {
	const allPokemon = [
		stubPokemonSpecies({
			id: "p1",
			moves: {
				start: ["tackle"],
			},
		}),
		stubPokemonSpecies({
			id: "p2",
			moves: {
				start: [],
				level6: ["tackle"],
			},
		}),
		stubPokemonSpecies({
			id: "p3",
			moves: {
				start: [],
				egg: ["tackle"],
			},
		}),
		stubPokemonSpecies({
			id: "p4",
			moves: {
				start: [],
				tm: [1],
			},
		}),
		stubPokemonSpecies({
			id: "p5",
			moves: {
				start: ["tail whip"],
			},
		}),
		stubPokemonSpecies({
			id: "p6",
			moves: {
				start: [],
				level6: ["tail whip"],
			},
		}),
		stubPokemonSpecies({
			id: "p7",
			moves: {
				start: [],
				egg: ["tail whip"],
			},
		}),
		stubPokemonSpecies({
			id: "p8",
			moves: {
				start: [],
				tm: [2],
			},
		}),
	]

	test("no pokemon learns this", () => {
		const move = stubMove({
			id: "not-knowable",
		})

		const result = move.pokemonWhoLearnThisViaTm(allPokemon)

		expect(result).toEqual([])
	})

	test("some pokemon learn this", () => {
		const move = stubMove({
			id: "tackle",
			tm: stubTmDetails({
				id: 1,
			}).data,
		})

		const result = move.pokemonWhoLearnThisViaTm(allPokemon)
		const ids = result.map((it) => it.id.data)

		expect(ids).toEqual(["p4"])
	})
})