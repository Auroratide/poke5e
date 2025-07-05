import { describe, test, expect } from "vitest"
import { experienceNeededUntilLevelUp } from "../experience"

describe("experienceNeededUntilLevelUp", () => {
	test("at level 1", () => {
		const result = experienceNeededUntilLevelUp(0, 1)

		expect(result).toEqual(200)
	})

	test("some exp has been accumulated", () => {
		const result = experienceNeededUntilLevelUp(50, 1)

		expect(result).toEqual(150)
	})

	test("at level 2", () => {
		const result = experienceNeededUntilLevelUp(300, 2)

		expect(result).toEqual(500)
	})

	test("exp exceeds level requirement", () => {
		const result = experienceNeededUntilLevelUp(500, 1)

		expect(result).toEqual(0)
	})

	test("exp below even current level requirement", () => {
		const result = experienceNeededUntilLevelUp(0, 2)

		expect(result).toEqual(800)
	})

	test("at level 20", () => {
		const result = experienceNeededUntilLevelUp(450000, 20)

		expect(result).toEqual(0)
	})
})
