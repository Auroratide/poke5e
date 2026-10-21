import { test, expect, describe } from "vitest"
import { DiceTierLevels } from "../DiceTierLevels"

describe("tierIndex", () => {
	test.each([
		[1, 0],
		[4, 0],
		[5, 1],
		[9, 1],
		[10, 2],
		[16, 2],
		[17, 3],
		[20, 3],
	])("level %i is tier %i", (level, expected) => {
		expect(DiceTierLevels.tierIndex(level)).toBe(expected)
	})
})

describe("isTierUp", () => {
	test.each([5, 10, 17])("level %i", (level) => {
		expect(DiceTierLevels.isTierUp(level)).toBe(true)
	})

	test.each([2, 4, 6, 11, 16, 18, 20])("level %i", (level) => {
		expect(DiceTierLevels.isTierUp(level)).toBe(false)
	})
})
