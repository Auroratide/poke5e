import { describe, test, expect } from "vitest"
import { stubMove, stubMoveAttack, stubMoveDamage, stubMoveSave, stubTmDetails } from "./stubs-2"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import type { Attributes } from "$lib/dnd/attributes"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { Level } from "$lib/dnd/level"

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

describe("calculateMoveStats", () => {
	const ATTRIBUTES: Attributes = stubAttributes({
		str: 8,
		dex: 10,
		con: 12,
		int: 14,
		wis: 16,
		cha: 18,
	})
	
	test("single attribute", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +2 from level
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			toHit: 4,
			save: {
				attribute: ["dex"],
				dc: 12,
			},
			damage: {
				dice: "1d4",
				mod: 2,
				isHealing: false,
			},
		})
	})
	
	test("multiple attribute", () => {
		const move = stubMove({
			power: ["str", "dex"],
			type: "normal",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +0 from dex, +2 from level
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			toHit: 2,
			save: {
				attribute: ["dex"],
				dc: 10,
			},
			damage: {
				dice: "1d4",
				mod: 0,
				isHealing: false,
			},
		})
	})
	
	test("any attribute", () => {
		const move = stubMove({
			power: "any",
			type: "normal",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +4 from cha, +2 from level
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			toHit: 6,
			save: {
				attribute: ["dex"],
				dc: 14,
			},
			damage: {
				dice: "1d4",
				mod: 4,
				isHealing: false,
			},
		})
	})
	
	test("no attribute", () => {
		const move = stubMove({
			power: "none",
			type: "normal",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({})
	})
	
	test("varies attribute", () => {
		const move = stubMove({
			power: "varies",
			type: "normal",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({})
	})
	
	test("has STAB", () => {
		const move = stubMove({
			power: ["int"],
			type: "psychic",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +2 from level, +2 from STAB
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			toHit: 4,
			save: {
				attribute: ["dex"],
				dc: 12,
			},
			damage: {
				dice: "1d4",
				mod: 4,
				isHealing: false,
			},
		})
	})

	test("has STAB (2018)", () => {
		const move = stubMove({
			power: ["int"],
			type: "psychic",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +2 from level, +1 from STAB
		const result = move.calculateMoveStats("2018", {
			attributes: ATTRIBUTES,
			level: new Level(4),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			toHit: 4,
			save: {
				attribute: ["dex"],
				dc: 12,
			},
			damage: {
				dice: "1d4",
				mod: 3,
				isHealing: false,
			},
		})
	})
	
	test("higher level", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +6 from level
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(20),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			toHit: 8,
			save: {
				attribute: ["dex"],
				dc: 16,
			},
			damage: {
				dice: "4d4",
				mod: 2,
				isHealing: false,
			},
		})
	})

	test("middling level", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage().data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(9),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			damage: {
				dice: "2d4",
				mod: 2,
				isHealing: false,
			},
		})
	})

	test("non-move damage modifier", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage({
				modifier: 0,
			}).data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			damage: {
				dice: "1d4",
				mod: 0,
				isHealing: false,
			},
		})
	})

	test("move + X damage modifier", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage({
				modifier: "MOVE + 4",
			}).data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			damage: {
				dice: "1d4",
				mod: 6, // 2 from attribute, 4 from modifier
				isHealing: false,
			},
		})
	})

	test("level damage modifier", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage({
				modifier: "LEVEL",
			}).data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(12),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			damage: {
				dice: "3d4",
				mod: 12,
				isHealing: false,
			},
		})
	})
	
	test("multiple types with STAB", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +2 from level, +2 from STAB
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic", "normal"],
		})
	
		expect(result).toEqual({
			toHit: 4,
			save: {
				attribute: ["dex"],
				dc: 12,
			},
			damage: {
				dice: "1d4",
				mod: 4,
				isHealing: false,
			},
		})
	})

	test("no attack", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage().data,
			attack: undefined,
			save: stubMoveSave().data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			save: {
				attribute: ["dex"],
				dc: 12,
			},
			damage: {
				dice: "1d4",
				mod: 2,
				isHealing: false,
			},
		})
	})

	test("no save", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: stubMoveDamage().data,
			attack: stubMoveAttack().data,
			save: undefined,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			toHit: 4,
			damage: {
				dice: "1d4",
				mod: 2,
				isHealing: false,
			},
		})
	})

	test("no damage", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			damage: undefined,
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
		})
	
		expect(result).toEqual({
			toHit: 4,
			save: {
				attribute: ["dex"],
				dc: 12,
			},
		})
	})
})