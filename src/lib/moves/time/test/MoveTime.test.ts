import { test, expect, describe } from "vitest"
import { MoveTime } from "../MoveTime"

describe("is", () => {
	test("action", () => {
		const time: MoveTime = { unit: "action" }

		expect(MoveTime.is(time, "action")).toBe(true)
		expect(MoveTime.is(time, "bonus action")).toBe(false)
		expect(MoveTime.is(time, "reaction")).toBe(false)
	})

	test("bonus action", () => {
		const time: MoveTime = { unit: "bonus action" }

		expect(MoveTime.is(time, "action")).toBe(false)
		expect(MoveTime.is(time, "bonus action")).toBe(true)
		expect(MoveTime.is(time, "reaction")).toBe(false)
	})

	test("reaction", () => {
		const time: MoveTime = { unit: "reaction" }

		expect(MoveTime.is(time, "action")).toBe(false)
		expect(MoveTime.is(time, "bonus action")).toBe(false)
		expect(MoveTime.is(time, "reaction")).toBe(true)
	})
})

describe("options", () => {
	test("every unit is offered", () => {
		const result = MoveTime.options().map((it) => it.value)

		expect(result).toEqual(["action", "bonus action", "reaction"])
	})
})
