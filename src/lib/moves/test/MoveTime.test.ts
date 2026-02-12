import { test, expect, describe } from "vitest"
import { MoveTime } from "../MoveTime"

describe("equals", () => {
	test("action", () => {
		expect(MoveTime.equals("action", "1 action")).toBe(true)
		expect(MoveTime.equals("action", "action")).toBe(true)
		expect(MoveTime.equals("action", "bonus action")).toBe(false)
		expect(MoveTime.equals("action", "reaction")).toBe(false)
		expect(MoveTime.equals("action", "1 minute")).toBe(false)
	})

	test("bonus action", () => {
		expect(MoveTime.equals("bonus action", "1 bonus action")).toBe(true)
		expect(MoveTime.equals("bonus action", "action")).toBe(false)
		expect(MoveTime.equals("bonus action", "bonus action")).toBe(true)
		expect(MoveTime.equals("bonus action", "reaction")).toBe(false)
		expect(MoveTime.equals("bonus action", "1 minute")).toBe(false)
	})

	test("reaction", () => {
		expect(MoveTime.equals("reaction", "1 reaction")).toBe(true)
		expect(MoveTime.equals("reaction", "action")).toBe(false)
		expect(MoveTime.equals("reaction", "bonus action")).toBe(false)
		expect(MoveTime.equals("reaction", "reaction")).toBe(true)
		expect(MoveTime.equals("reaction", "1 minute")).toBe(false)
	})

	test("other", () => {
		expect(MoveTime.equals("1 minute", "action")).toBe(false)
		expect(MoveTime.equals("1 minute", "bonus action")).toBe(false)
		expect(MoveTime.equals("1 minute", "reaction")).toBe(false)
		expect(MoveTime.equals("1 minute", "1 minute")).toBe(true)
	})
})
