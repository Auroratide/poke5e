import type { Attributes } from "$lib/dnd/attributes"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { Level } from "$lib/dnd/level"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { Stab } from "$lib/pokemon/stab"
import { describe, expect, test } from "vitest"
import { stubMove, stubMoveAttack, stubMoveDice, stubMoveSave, stubTmDetails } from "./stubs-2"

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

		expect(result.level.map((it) => it.id.data)).toEqual([])
		expect(result.egg.map((it) => it.id.data)).toEqual([])
		expect(result.tm.map((it) => it.id.data)).toEqual([])
	})

	test("some pokemon learn this", () => {
		const move = stubMove({
			id: "tackle",
			tm: stubTmDetails({
				id: 1,
			}).data,
		})

		const result = move.pokemonWhoLearnThis(allPokemon)

		expect(result.level.map((it) => it.id.data)).toEqual(["p1", "p2"])
		expect(result.egg.map((it) => it.id.data)).toEqual(["p3"])
		expect(result.tm.map((it) => it.id.data)).toEqual(["p4"])
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

	const DEFAULT_STAB = new Stab({ base: "default", bonus: 0 })
	
	test("single attribute", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +2 from level
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
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
				stabApplied: false,
			},
		})
	})
	
	test("multiple attribute", () => {
		const move = stubMove({
			power: ["str", "dex"],
			type: "normal",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +0 from dex, +2 from level
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
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
				stabApplied: false,
			},
		})
	})
	
	test("any attribute", () => {
		const move = stubMove({
			power: "any",
			type: "normal",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +4 from cha, +2 from level
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
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
				stabApplied: false,
			},
		})
	})
	
	test("no attribute", () => {
		const move = stubMove({
			power: "none",
			type: "normal",
			dice: stubMoveDice(),
			attack: undefined,
			save: undefined,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			damage: {
				dice: "1d4",
				mod: 0,
				isHealing: false,
				stabApplied: false,
			},
		})
	})
	
	test("varies attribute", () => {
		const move = stubMove({
			power: "varies",
			type: "normal",
			dice: stubMoveDice(),
			attack: undefined,
			save: undefined,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			damage: {
				dice: "1d4",
				mod: 0,
				isHealing: false,
				stabApplied: false,
			},
		})
	})
	
	test("has STAB", () => {
		const move = stubMove({
			power: ["int"],
			type: "psychic",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +2 from level, +2 from STAB
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
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
				stabApplied: true,
			},
		})
	})

	test("has STAB (2018)", () => {
		const move = stubMove({
			power: ["int"],
			type: "psychic",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +2 from level, +1 from STAB
		const result = move.calculateMoveStats("2018", {
			attributes: ATTRIBUTES,
			level: new Level(4),
			type: ["psychic"],
			stab: DEFAULT_STAB,
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
				stabApplied: true,
			},
		})
	})
	
	test("higher level", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +6 from level
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(20),
			type: ["psychic"],
			stab: DEFAULT_STAB,
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
				stabApplied: false,
			},
		})
	})

	test("middling level", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice(),
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(9),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			damage: {
				dice: "2d4",
				mod: 2,
				isHealing: false,
				stabApplied: false,
			},
		})
	})

	test("non-move damage modifier", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice({
				modifier: "0",
			}),
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			damage: {
				dice: "1d4",
				mod: 0,
				isHealing: false,
				stabApplied: false,
			},
		})
	})

	test("move + X damage modifier", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice({
				modifier: "MOVE + 4",
			}),
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			damage: {
				dice: "1d4",
				mod: 6, // 2 from attribute, 4 from modifier
				isHealing: false,
				stabApplied: false,
			},
		})
	})

	test("move + stab damage modifier", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice({
				modifier: "MOVE + STAB",
			}),
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			damage: {
				dice: "1d4",
				mod: 4, // 2 from attribute, 2 from stab
				isHealing: false,
				stabApplied: true,
			},
		})
	})

	test("level damage modifier", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice({
				modifier: "LEVEL",
			}),
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(12),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			damage: {
				dice: "3d4",
				mod: 12,
				isHealing: false,
				stabApplied: false,
			},
		})
	})
	
	test("multiple types with STAB", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// +2 from int, +2 from level, +2 from STAB
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic", "normal"],
			stab: DEFAULT_STAB,
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
				stabApplied: true,
			},
		})
	})

	test("no attack", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice(),
			attack: undefined,
			save: stubMoveSave().data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
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
				stabApplied: false,
			},
		})
	})

	test("no save", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: undefined,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			toHit: 4,
			damage: {
				dice: "1d4",
				mod: 2,
				isHealing: false,
				stabApplied: false,
			},
		})
	})

	test("no damage", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})
	
		expect(result).toEqual({
			toHit: 4,
			save: {
				attribute: ["dex"],
				dc: 12,
			},
		})
	})

	test("healing", () => {
		const move = stubMove({
			power: ["int"],
			type: "psychic",
			dice: stubMoveDice({
				type: "healing",
			}),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})

		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(1),
			type: ["psychic"],
			stab: DEFAULT_STAB,
		})

		expect(result).toEqual({
			toHit: 4,
			save: {
				attribute: ["dex"],
				dc: 12,
			},
			damage: {
				dice: "1d4",
				mod: 2, // no STAB
				isHealing: true,
				stabApplied: false,
			},
		})
	})

	test("customized stab", () => {
		const move = stubMove({
			power: ["int"],
			type: "normal",
			dice: stubMoveDice(),
			attack: stubMoveAttack().data,
			save: stubMoveSave().data,
		})
	
		// dmg: +4 from pb, +3 from bonus, +2 from non-stab mod
		const result = move.calculateMoveStats("2024", {
			attributes: ATTRIBUTES,
			level: new Level(10),
			type: ["normal"],
			stab: new Stab({ base: "proficiency", bonus: 3 }),
		})
	
		expect(result).toEqual({
			toHit: 6,
			save: {
				attribute: ["dex"],
				dc: 14,
			},
			damage: {
				dice: "3d4",
				mod: 9,
				isHealing: false,
				stabApplied: true,
			},
		})
	})
})

describe("higherLevels", () => {
	test("no dice or higherLevels", () => {
		const move = stubMove({
			higherLevels: null,
			dice: null,
		})

		const result = move.higherLevels

		expect(result).toBeUndefined()
	})

	test("has damage dice", () => {
		const move = stubMove({
			higherLevels: null,
			dice: {
				class: "custom",
				tiers: ["1d4", "2d4", "3d4", "4d4"],
				type: "damage",
				modifier: "MOVE",
			},
		})

		const result = move.higherLevels

		expect(result).toEqual("The damage dice roll for this move changes to 2d4 at level 5, 3d4 at level 10, and 4d4 at level 17.")
	})

	test("has healing dice", () => {
		const move = stubMove({
			higherLevels: null,
			dice: {
				class: "custom",
				tiers: ["1d4", "2d4", "3d4", "4d4"],
				type: "healing",
				modifier: "MOVE",
			},
		})

		const result = move.higherLevels

		expect(result).toEqual("The healing dice roll for this move changes to 2d4 at level 5, 3d4 at level 10, and 4d4 at level 17.")
	})

	test("has damage dice and higherLevels", () => {
		const move = stubMove({
			higherLevels: "custom higher levels text",
			dice: {
				class: "custom",
				tiers: ["1d4", "2d4", "3d4", "4d4"],
				type: "damage",
				modifier: "MOVE",
			},
		})

		const result = move.higherLevels

		expect(result).toEqual("custom higher levels text")
	})
})

describe("description", () => {
	test("subbing dice", () => {
		const move = stubMove({
			description: "takes {dice} damage",
			dice: {
				class: "custom",
				tiers: ["1d4", "2d4", "3d4", "4d4"],
				type: "damage",
				modifier: "MOVE",
			},
		})

		const result = move.description

		expect(result).toEqual("takes 1d4 + MOVE damage")
	})

	test("subbing dice, 0 modifier", () => {
		const move = stubMove({
			description: "takes {dice} damage",
			dice: {
				class: "custom",
				tiers: ["1d4", "2d4", "3d4", "4d4"],
				type: "damage",
				modifier: "0",
			},
		})

		const result = move.description

		expect(result).toEqual("takes 1d4 damage")
	})

	test("subbing dice (but not provided)", () => {
		const move = stubMove({
			description: "takes {dice} damage",
			dice: null,
		})

		const result = move.description

		expect(result).toEqual("takes <?> damage")
	})

	test("subbing type", () => {
		const move = stubMove({
			description: "takes {type} damage",
			type: "fire",
		})

		const result = move.description

		expect(result).toEqual("takes fire damage")
	})

	test("subbing save", () => {
		const move = stubMove({
			description: "make a {save}",
			save: {
				attribute: ["str"],
				dc: "MOVE",
			},
		})

		const result = move.description

		expect(result).toEqual("make a STR save against your Move DC")
	})

	test("subbing save (save not provided)", () => {
		const move = stubMove({
			description: "make a {save}",
			save: null,
		})

		const result = move.description

		expect(result).toEqual("make a <?> save against your Move DC")
	})

	test("subbing shape", () => {
		const move = stubMove({
			description: "in a {shape}",
			shape: {
				type: "emanation",
				value: 20,
				unit: "feet",
			},
		})

		const result = move.description

		expect(result).toEqual("in a 20-foot emanation")
	})

	test("subbing shape (not provided)", () => {
		const move = stubMove({
			description: "in a {shape}",
			shape: null,
		})

		const result = move.description

		expect(result).toEqual("in a <?> shape")
	})
})