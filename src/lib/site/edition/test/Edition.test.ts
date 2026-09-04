import { test, expect } from "vitest"
import { Edition } from "../Edition"

test("abbr", () => {
	expect(Edition.abbr("2018")).toEqual("'18")
	expect(Edition.abbr("2024")).toEqual("'24")
})

test("isLatest", () => {
	expect(Edition.isLatest("2018")).toBe(false)
	expect(Edition.isLatest("2024")).toBe(true)
})
