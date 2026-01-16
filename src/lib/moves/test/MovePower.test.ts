import { describe, test, expect } from "vitest"
import { MovePower } from "../MovePower"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"

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

describe("bestAttribute", () => {
	test("only one attribute", () => {
		const power = new MovePower(["dex"])
		const attributes = stubAttributes({
			str: 11,
			dex: 11,
			con: 11,
			int: 11,
			wis: 11,
			cha: 11,
		})

		const result = power.bestAttribute(attributes)

		expect(result).toEqual(["dex"])
	})

	test("attributes are tied", () => {
		const power = new MovePower(["str", "dex"])
		const attributes = stubAttributes({
			str: 11,
			dex: 11,
			con: 11,
			int: 11,
			wis: 11,
			cha: 11,
		})

		const result = power.bestAttribute(attributes)

		expect(result).toEqual(["str", "dex"])
	})

	test("one attribute is clearly better", () => {
		const power = new MovePower(["str", "dex"])
		const attributes = stubAttributes({
			str: 12,
			dex: 11,
			con: 11,
			int: 11,
			wis: 11,
			cha: 11,
		})

		const result = power.bestAttribute(attributes)

		expect(result).toEqual(["str"])
	})

	test("power is any", () => {
		const power = new MovePower("any")
		const attributes = stubAttributes({
			str: 10,
			dex: 11,
			con: 12,
			int: 13,
			wis: 14,
			cha: 15,
		})

		const result = power.bestAttribute(attributes)

		expect(result).toEqual(["cha"])
	})

	test("power is varies", () => {
		const power = new MovePower("varies")
		const attributes = stubAttributes({
			str: 10,
			dex: 11,
			con: 12,
			int: 13,
			wis: 14,
			cha: 15,
		})

		const result = power.bestAttribute(attributes)

		expect(result).toEqual([])
	})

	test("power is none", () => {
		const power = new MovePower("none")
		const attributes = stubAttributes({
			str: 10,
			dex: 11,
			con: 12,
			int: 13,
			wis: 14,
			cha: 15,
		})

		const result = power.bestAttribute(attributes)

		expect(result).toEqual([])
	})
})