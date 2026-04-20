import { expect, test } from "vitest"
import { Stab } from "../Stab"
import { Level } from "$lib/dnd/level"

test("default 2018", () => {
	const noBonus = new Stab({ base: "default", bonus: 0 })
	const withBonus = new Stab({ base: "default", bonus: 2 })

	expect(noBonus.calculate(3, new Level(1), "2018")).toEqual(0)
	expect(noBonus.calculate(3, new Level(4), "2018")).toEqual(1)
	expect(noBonus.calculate(3, new Level(8), "2018")).toEqual(2)
	expect(noBonus.calculate(3, new Level(12), "2018")).toEqual(3)
	expect(noBonus.calculate(3, new Level(16), "2018")).toEqual(4)
	expect(noBonus.calculate(3, new Level(20), "2018")).toEqual(5)

	expect(withBonus.calculate(3, new Level(10), "2018")).toEqual(4)
})

test("default 2024", () => {
	const noBonus = new Stab({ base: "default", bonus: 0 })
	const withBonus = new Stab({ base: "default", bonus: 2 })

	expect(noBonus.calculate(0, new Level(1), "2024")).toEqual(2)
	expect(noBonus.calculate(1, new Level(4), "2018")).toEqual(2)
	expect(noBonus.calculate(2, new Level(8), "2024")).toEqual(3)
	expect(noBonus.calculate(3, new Level(12), "2018")).toEqual(4)
	expect(noBonus.calculate(4, new Level(16), "2024")).toEqual(5)
	expect(noBonus.calculate(5, new Level(20), "2018")).toEqual(6)

	expect(withBonus.calculate(3, new Level(10), "2024")).toEqual(6)
})

test("move power", () => {
	const noBonus = new Stab({ base: "movepower", bonus: 0 })
	const withBonus = new Stab({ base: "movepower", bonus: 2 })

	expect(noBonus.calculate(0, new Level(1), "2024")).toEqual(0)
	expect(noBonus.calculate(1, new Level(4), "2018")).toEqual(1)
	expect(noBonus.calculate(2, new Level(8), "2024")).toEqual(2)
	expect(noBonus.calculate(3, new Level(12), "2018")).toEqual(3)
	expect(noBonus.calculate(4, new Level(16), "2024")).toEqual(4)
	expect(noBonus.calculate(5, new Level(20), "2018")).toEqual(5)

	expect(withBonus.calculate(3, new Level(10), "2024")).toEqual(5)
})

test("proficiency", () => {
	const noBonus = new Stab({ base: "proficiency", bonus: 0 })
	const withBonus = new Stab({ base: "proficiency", bonus: 2 })

	expect(noBonus.calculate(0, new Level(1), "2024")).toEqual(2)
	expect(noBonus.calculate(1, new Level(4), "2018")).toEqual(2)
	expect(noBonus.calculate(2, new Level(8), "2024")).toEqual(3)
	expect(noBonus.calculate(3, new Level(12), "2018")).toEqual(4)
	expect(noBonus.calculate(4, new Level(16), "2024")).toEqual(5)
	expect(noBonus.calculate(5, new Level(20), "2018")).toEqual(6)

	expect(withBonus.calculate(3, new Level(10), "2024")).toEqual(6)
})

test("force 2018", () => {
	const noBonus = new Stab({ base: "ruleset18", bonus: 0 })
	const withBonus = new Stab({ base: "ruleset18", bonus: 2 })

	expect(noBonus.calculate(3, new Level(1), "2024")).toEqual(0)
	expect(noBonus.calculate(3, new Level(4), "2024")).toEqual(1)
	expect(noBonus.calculate(3, new Level(8), "2024")).toEqual(2)
	expect(noBonus.calculate(3, new Level(12), "2024")).toEqual(3)
	expect(noBonus.calculate(3, new Level(16), "2024")).toEqual(4)
	expect(noBonus.calculate(3, new Level(20), "2024")).toEqual(5)

	expect(withBonus.calculate(3, new Level(10), "2024")).toEqual(4)
})

test("none", () => {
	const noBonus = new Stab({ base: "none", bonus: 0 })
	const withBonus = new Stab({ base: "none", bonus: 2 })

	expect(noBonus.calculate(3, new Level(1), "2024")).toEqual(0)
	expect(noBonus.calculate(3, new Level(4), "2018")).toEqual(0)
	expect(noBonus.calculate(3, new Level(8), "2024")).toEqual(0)
	expect(noBonus.calculate(3, new Level(12), "2018")).toEqual(0)
	expect(noBonus.calculate(3, new Level(16), "2024")).toEqual(0)
	expect(noBonus.calculate(3, new Level(20), "2018")).toEqual(0)

	expect(withBonus.calculate(3, new Level(10), "2024")).toEqual(2)
})

test("below 0", () => {
	const negativeMovepower = new Stab({ base: "movepower", bonus: 0 })
	const negativeBonus = new Stab({ base: "none", bonus: -10 })

	expect(negativeMovepower.calculate(-5, new Level(1), "2024")).toEqual(0)
	expect(negativeBonus.calculate(3, new Level(10), "2024")).toEqual(0)
})
