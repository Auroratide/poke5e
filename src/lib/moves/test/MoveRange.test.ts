import { test, describe, expect } from "vitest"
import { MoveRange } from "../MoveRange"

describe("asNumberOfFeet", () => {
	test("melee", () => {
		expect(MoveRange.asNumberOfFeet("melee")).toEqual(0)
		expect(MoveRange.asNumberOfFeet("Melee")).toEqual(0)
	})

	test("self", () => {
		expect(MoveRange.asNumberOfFeet("self")).toEqual(0)
		expect(MoveRange.asNumberOfFeet("Self")).toEqual(0)
	})

	test("Xft or X ft", () => {
		expect(MoveRange.asNumberOfFeet("30ft")).toEqual(30)
		expect(MoveRange.asNumberOfFeet("40 ft")).toEqual(40)
	})

	test("shaped area", () => {
		expect(MoveRange.asNumberOfFeet("self (30ft cone)")).toEqual(30)
		expect(MoveRange.asNumberOfFeet("self (100ft line)")).toEqual(100)
	})

	test("anything else", () => {
		expect(MoveRange.asNumberOfFeet("anything else")).toEqual(0)
		expect(MoveRange.asNumberOfFeet("")).toEqual(0)
	})
})
