import { describe, test, expect } from "vitest"
import { MovePower } from "../MovePower"

describe("appliesToAttribute", () => {
	test("attribute included", () => {
		const power = new MovePower(["str", "dex"])

		expect(power.appliesToAttribute("str")).toBe(true)
		expect(power.appliesToAttribute("dex")).toBe(true)
	})

	test("attribute not included", () => {
		const power = new MovePower(["str", "dex"])

		expect(power.appliesToAttribute("con")).toBe(false)
		expect(power.appliesToAttribute("int")).toBe(false)
		expect(power.appliesToAttribute("wis")).toBe(false)
		expect(power.appliesToAttribute("cha")).toBe(false)		
	})

	test("none", () => {
		const power = new MovePower("none")

		expect(power.appliesToAttribute("str")).toBe(false)
		expect(power.appliesToAttribute("dex")).toBe(false)
		expect(power.appliesToAttribute("con")).toBe(false)
		expect(power.appliesToAttribute("int")).toBe(false)
		expect(power.appliesToAttribute("wis")).toBe(false)
		expect(power.appliesToAttribute("cha")).toBe(false)
	})

	test("any", () => {
		const power = new MovePower("any")

		expect(power.appliesToAttribute("str")).toBe(true)
		expect(power.appliesToAttribute("dex")).toBe(true)
		expect(power.appliesToAttribute("con")).toBe(true)
		expect(power.appliesToAttribute("int")).toBe(true)
		expect(power.appliesToAttribute("wis")).toBe(true)
		expect(power.appliesToAttribute("cha")).toBe(true)
	})

	test("varies", () => {
		const power = new MovePower("varies")

		expect(power.appliesToAttribute("str")).toBe(true)
		expect(power.appliesToAttribute("dex")).toBe(true)
		expect(power.appliesToAttribute("con")).toBe(true)
		expect(power.appliesToAttribute("int")).toBe(true)
		expect(power.appliesToAttribute("wis")).toBe(true)
		expect(power.appliesToAttribute("cha")).toBe(true)
	})
})