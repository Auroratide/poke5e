import { test, expect, describe } from "vitest"
import { MoveRange } from "../MoveRange"
import type { MoveShape } from "$lib/moves/shape"

describe("display", () => {
	test("melee", () => {
		const range: MoveRange = {
			type: "melee",
		}

		const result = MoveRange.display(range)

		expect(result).toEqual("Melee")
	})

	test("melee with shape", () => {
		const range: MoveRange = {
			type: "melee",
		}

		const shape: MoveShape = {
			type: "cone",
			value: 15,
			unit: "feet",
		}

		const result = MoveRange.display(range, shape)

		expect(result).toEqual("Melee")
	})

	test("melee with reach", () => {
		const range: MoveRange = {
			type: "melee",
			reach: {
				value: 10,
				unit: "feet",
			},
		}

		const result = MoveRange.display(range)

		expect(result).toEqual("Melee, reach 10 feet")
	})

	test("distance", () => {
		const range: MoveRange = {
			type: "distance",
			value: 30,
			unit: "feet",
		}

		const result = MoveRange.display(range)

		expect(result).toEqual("30 feet")
	})

	test("distance with shape", () => {
		const range: MoveRange = {
			type: "distance",
			value: 30,
			unit: "feet",
		}

		const shape: MoveShape = {
			type: "cone",
			value: 15,
			unit: "feet",
		}

		const result = MoveRange.display(range, shape)

		expect(result).toEqual("30 feet")
	})

	test("self", () => {
		const range: MoveRange = {
			type: "self",
		}

		const result = MoveRange.display(range)

		expect(result).toEqual("Self")
	})

	test("self with shape", () => {
		const range: MoveRange = {
			type: "self",
		}

		const shape: MoveShape = {
			type: "cone",
			value: 15,
			unit: "feet",
		}

		const result = MoveRange.display(range, shape)

		expect(result).toEqual("Self (15-foot cone)")
	})

	test("varies", () => {
		const range: MoveRange = {
			type: "varies",
		}

		const result = MoveRange.display(range)

		expect(result).toEqual("Varies")
	})

	test("varies with shape", () => {
		const range: MoveRange = {
			type: "varies",
		}

		const shape: MoveShape = {
			type: "cone",
			value: 15,
			unit: "feet",
		}

		const result = MoveRange.display(range, shape)

		expect(result).toEqual("Varies")
	})
})

describe("asNumberOfFeet", () => {
	test("melee", () => {
		const range: MoveRange = {
			type: "melee",
		}

		const result = MoveRange.asNumberOfFeet(range)

		expect(result).toEqual(0)
	})

	test("melee with reach", () => {
		const range: MoveRange = {
			type: "melee",
			reach: {
				value: 10,
				unit: "feet",
			},
		}

		const result = MoveRange.asNumberOfFeet(range)

		expect(result).toEqual(10)
	})

	test("distance", () => {
		const range: MoveRange = {
			type: "distance",
			value: 30,
			unit: "feet",
		}

		const result = MoveRange.asNumberOfFeet(range)

		expect(result).toEqual(30)
	})

	test("self", () => {
		const range: MoveRange = {
			type: "self",
		}

		const result = MoveRange.asNumberOfFeet(range)

		expect(result).toEqual(0)
	})

	test("self with shape", () => {
		const range: MoveRange = {
			type: "self",
		}

		const shape: MoveShape = {
			type: "line",
			value: 100,
			unit: "feet",
		}

		const result = MoveRange.asNumberOfFeet(range, shape)

		expect(result).toEqual(100)
	})

	test("varies", () => {
		const range: MoveRange = {
			type: "varies",
		}

		const result = MoveRange.asNumberOfFeet(range)

		expect(result).toEqual(0)
	})
})
