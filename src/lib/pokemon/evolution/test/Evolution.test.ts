import { describe, test, expect } from "vitest"
import { stubEvolution } from "./stubs"
import { PokemonGender } from "$lib/pokemon/gender"
import { Evolution } from "../Evolution"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"

describe("toString", () => {
	test("simple level condition", () => {
		const condition = stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ {
				type: "level",
				value: 6,
			} ],
			effects: [ {
				type: "asi",
				value: 8,
			} ],
		})

		const result = condition.toString()

		expect(result).toEqual("{{pokemon:eevee}} can evolve into {{pokemon::flareon}} at level 6 or above. When it evolves, its health increases by double its level, and it gains 8 points to add to its ability scores.")
	})

	test("gender condition", () => {
		const condition = stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ {
				type: "level",
				value: 6,
			}, {
				type: "gender",
				value: PokemonGender.Female,
			} ],
			effects: [ {
				type: "asi",
				value: 8,
			} ],
		})

		const result = condition.toString()

		expect(result).toEqual("A female {{pokemon:eevee}} can evolve into {{pokemon::flareon}} at level 6 or above. When it evolves, its health increases by double its level, and it gains 8 points to add to its ability scores.")
	})

	test("move condition", () => {
		const condition = stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ {
				type: "level",
				value: 6,
			}, {
				type: "move",
				value: "tackle",
			} ],
			effects: [ {
				type: "asi",
				value: 8,
			} ],
		})

		const result = condition.toString()

		expect(result).toEqual("{{pokemon:eevee}} can evolve into {{pokemon::flareon}} at level 6 or above while knowing {{move::tackle}}. When it evolves, its health increases by double its level, and it gains 8 points to add to its ability scores.")
	})

	test("multiple conditions", () => {
		const condition = stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ {
				type: "level",
				value: 6,
			}, {
				type: "move",
				value: "tackle",
			}, {
				type: "loyalty",
				value: 3,
			} ],
			effects: [ {
				type: "asi",
				value: 8,
			} ],
		})

		const result = condition.toString()

		expect(result).toEqual("{{pokemon:eevee}} can evolve into {{pokemon::flareon}} at level 6 or above while knowing {{move::tackle}}, with a bond of +3 or higher. When it evolves, its health increases by double its level, and it gains 8 points to add to its ability scores.")
	})

	test("special condition", () => {
		const condition = stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ {
				type: "special",
				value: "whenever you want",
			} ],
			effects: [ {
				type: "asi",
				value: 8,
			} ],
		})

		const result = condition.toString()

		expect(result).toEqual("{{pokemon:eevee}} can evolve into {{pokemon::flareon}} whenever you want. When it evolves, its health increases by double its level, and it gains 8 points to add to its ability scores.")
	})

	test("special effect", () => {
		const condition = stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ {
				type: "level",
				value: 6,
			} ],
			effects: [ {
				type: "special",
				value: "a continental cataclysm ignites",
			} ],
		})

		const result = condition.toString()

		expect(result).toEqual("{{pokemon:eevee}} can evolve into {{pokemon::flareon}} at level 6 or above. When it evolves, a continental cataclysm ignites.")
	})

	test("linking from", () => {
		const condition = stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ {
				type: "level",
				value: 6,
			} ],
			effects: [ {
				type: "asi",
				value: 8,
			} ],
		})

		const result = condition.toString({ link: "from" })

		expect(result).toEqual("{{pokemon::eevee}} can evolve into {{pokemon:flareon}} at level 6 or above. When it evolves, its health increases by double its level, and it gains 8 points to add to its ability scores.")
	})

	test("no benefits", () => {
		const condition = stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ {
				type: "level",
				value: 6,
			} ],
			effects: [],
		})

		const result = condition.toString()

		expect(result).toEqual("{{pokemon:eevee}} can evolve into {{pokemon::flareon}} at level 6 or above.")
	})
})

describe("normalizeList", () => {
	test("all cases", () => {
		const evolutions = [
			stubEvolution({
				from: "eevee",
				to: "flareon",
				conditions: [ {
					type: "level",
					value: 6,
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			}),
			stubEvolution({
				from: "eevee",
				to: "jolteon",
				conditions: [ {
					type: "level",
					value: 6,
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			}),
			stubEvolution({
				from: "charmander",
				to: "charmeleon",
				conditions: [ {
					type: "level",
					value: 6,
				} ],
				effects: [ {
					type: "asi",
					value: 10,
				} ],
			}),
			stubEvolution({
				from: "charmeleon",
				to: "charizard",
				conditions: [ {
					type: "level",
					value: 12,
				} ],
				effects: [ {
					type: "asi",
					value: 6,
				} ],
			}),
		].map((it) => it.data)

		const pokemon = [
			stubPokemonSpecies({
				id: "eevee"
			}),
			stubPokemonSpecies({
				id: "flareon"
			}),
			stubPokemonSpecies({
				id: "jolteon"
			}),
			stubPokemonSpecies({
				id: "charmander"
			}),
			stubPokemonSpecies({
				id: "charmeleon"
			}),
			stubPokemonSpecies({
				id: "charizard"
			}),
			stubPokemonSpecies({
				id: "mimikyu"
			}),
		].map((it) => it.data)

		const mapper = Evolution.normalizeList(evolutions)

		const result = pokemon.map(mapper)

		expect(result[0].evolution).toEqual({
			stage: 1,
			maxStage: 2,
			from: [],
			to: [ {
				id: "flareon",
				conditions: [ {
					type: "level",
					value: 6,
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			}, {
				id: "jolteon",
				conditions: [ {
					type: "level",
					value: 6,
				} ],
				effects: [ {
					type: "asi",
					value: 8,
				} ],
			} ]
		})

		expect(result[1].evolution).toEqual({
			stage: 2,
			maxStage: 2,
			from: ["eevee"],
			to: [],
		})

		expect(result[2].evolution).toEqual({
			stage: 2,
			maxStage: 2,
			from: ["eevee"],
			to: [],
		})

		expect(result[3].evolution).toEqual({
			stage: 1,
			maxStage: 3,
			from: [],
			to: [ {
				id: "charmeleon",
				conditions: [ {
					type: "level",
					value: 6,
				} ],
				effects: [ {
					type: "asi",
					value: 10,
				} ],
			} ]
		})

		expect(result[4].evolution).toEqual({
			stage: 2,
			maxStage: 3,
			from: ["charmander"],
			to: [ {
				id: "charizard",
				conditions: [ {
					type: "level",
					value: 12,
				} ],
				effects: [ {
					type: "asi",
					value: 6,
				} ],
			} ]
		})

		expect(result[5].evolution).toEqual({
			stage: 3,
			maxStage: 3,
			from: ["charmeleon"],
			to: [],
		})

		expect(result[6].evolution).toBeUndefined()
	})
})
