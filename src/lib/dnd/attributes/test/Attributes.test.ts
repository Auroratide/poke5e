import { test, expect } from "vitest"
import { Attributes } from ".."

test("modifiers", () => {
	const attributes = new Attributes({
		str: 1,
		dex: 6,
		con: 10,
		int: 15,
		wis: 20,
		cha: 30,
	})

	expect(attributes.str.modifier).toEqual(-5)
	expect(attributes.dex.modifier).toEqual(-2)
	expect(attributes.con.modifier).toEqual(0)
	expect(attributes.int.modifier).toEqual(2)
	expect(attributes.wis.modifier).toEqual(5)
	expect(attributes.cha.modifier).toEqual(10)
})
