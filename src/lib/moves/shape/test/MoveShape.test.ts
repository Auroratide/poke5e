import { test, expect, describe } from "vitest"
import { MoveShape } from "../MoveShape"

describe("display", () => {
	test("cone", () => {
		const duration: MoveShape = {
			type: "cone",
			value: 15,
			unit: "feet",
		}

		const result = MoveShape.display(duration)

		expect(result).toEqual("15-foot cone")
	})

	test("emanation", () => {
		const duration: MoveShape = {
			type: "emanation",
			value: 30,
			unit: "feet",
		}

		const result = MoveShape.display(duration)

		expect(result).toEqual("30-foot emanation")
	})

	test("line", () => {
		const duration: MoveShape = {
			type: "line",
			value: 80,
			unit: "feet",
		}

		const result = MoveShape.display(duration)

		expect(result).toEqual("80-foot line")
	})

	test("cube", () => {
		const duration: MoveShape = {
			type: "cube",
			value: 10,
			unit: "feet",
		}

		const result = MoveShape.display(duration)

		expect(result).toEqual("10-foot cube")
	})
})
