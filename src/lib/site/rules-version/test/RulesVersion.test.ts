import { test, expect } from "vitest"
import { RulesVersion } from "../RulesVersion"

test("abbr", () => {
	expect(RulesVersion.abbr("2018")).toEqual("'18")
	expect(RulesVersion.abbr("2024")).toEqual("'24")
})

test("isLatest", () => {
	expect(RulesVersion.isLatest("2018")).toBe(false)
	expect(RulesVersion.isLatest("2024")).toBe(true)
})
