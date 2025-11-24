import { describe, test, expect } from "vitest"
import {
	LevelCondition,
	ItemCondition,
	BondCondition,
	MoveCondition,
	MoveTypeCondition,
	GenderCondition,
	TimeCondition,
	SpecialCondition,
} from "../EvolutionCondition"
import { Level } from "$lib/dnd/level"
import { stubLearnedMove } from "$lib/trainers/test/stubs"
import { PokemonGender } from "$lib/creatures/gender"

describe("LevelCondition", () => {
	test("meets level", () => {
		const condition = new LevelCondition(5)
		const creature = { level: new Level(5) }

		const result = condition.meetsCondition(creature)

		expect(result).toBe(true)
	})

	test("does not meet level", () => {
		const condition = new LevelCondition(6)
		const creature = { level: new Level(5) }

		const result = condition.meetsCondition(creature)

		expect(result).toBe(false)
	})
})

describe("ItemCondition", () => {
	test("does not matter", () => {
		const condition = new ItemCondition("Leaf Stone")

		const result = condition.meetsCondition()

		expect(result).toBe(true)
	})
})

describe("BondCondition", () => {
	test("meets level", () => {
		const condition = new BondCondition(2)
		const creature = {
			bond: {
				level: 2,
				points: {
					current: 2,
					max: 2,
				},
			},
		}

		const result = condition.meetsCondition(creature)

		expect(result).toBe(true)
	})

	test("does not meet level", () => {
		const condition = new BondCondition(2)
		const creature = {
			bond: {
				level: 0,
				points: {
					current: 0,
					max: 0,
				},
			},
		}

		const result = condition.meetsCondition(creature)

		expect(result).toBe(false)
	})
})

describe("MoveCondition", () => {
	test("has move", () => {
		const condition = new MoveCondition("tackle")
		const creature = {
			moves: [
				stubLearnedMove({
					moveId: "tackle",
				}),
			],
		}

		const result = condition.meetsCondition(creature)

		expect(result).toBe(true)
	})

	test("does not have move", () => {
		const condition = new MoveCondition("tackle")
		const creature = {
			moves: [
				stubLearnedMove({
					moveId: "take-down",
				}),
			],
		}

		const result = condition.meetsCondition(creature)

		expect(result).toBe(false)
	})
})

describe("MoveTypeCondition", () => {
	test("does not matter", () => {
		const condition = new MoveTypeCondition("dark")

		const result = condition.meetsCondition()

		expect(result).toBe(true)
	})
})

describe("GenderCondition", () => {
	test("has gender", () => {
		const condition = new GenderCondition(PokemonGender.Female)
		const creature = {
			gender: PokemonGender.Female,
		}

		const result = condition.meetsCondition(creature)

		expect(result).toBe(true)
	})

	test("does not have gender", () => {
		const condition = new GenderCondition(PokemonGender.Female)
		const creature = {
			gender: PokemonGender.Male,
		}

		const result = condition.meetsCondition(creature)

		expect(result).toBe(false)
	})
})

describe("TimeCondition", () => {
	test("does not matter", () => {
		const condition = new TimeCondition("night")

		const result = condition.meetsCondition()

		expect(result).toBe(true)
	})
})

describe("SpecialCondition", () => {
	test("does not matter", () => {
		const condition = new SpecialCondition("something interesting")

		const result = condition.meetsCondition()

		expect(result).toBe(true)
	})
})
