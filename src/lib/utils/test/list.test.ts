import { describe, test, expect } from "vitest"
import * as list from "../list"

describe("reorderOne", () => {
	test("reorders the element", () => {
		const array = [0, 1, 2, 3, 4, 5]

		const result = list.reorderOne(array, 2, 0)

		expect(result).toEqual([2, 0, 1, 3, 4, 5])
	})

	test("from out of bounds", () => {
		const array = [0, 1, 2, 3, 4, 5]

		expect(() => list.reorderOne(array, 20, 2)).toThrow()
	})

	test("to out of bounds", () => {
		const array = [0, 1, 2, 3, 4, 5]

		expect(() => list.reorderOne(array, 2, 20)).toThrow()
	})
})
