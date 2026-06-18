import { test, expect } from "vitest"
import { AbilityScoreImprovement, Attributes } from ".."

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

test("ability score improvement", () => {
	const attributes = new Attributes({
		str: 1,
		dex: 6,
		con: 10,
		int: 15,
		wis: 20,
		cha: 30,
	})

	let asi = AbilityScoreImprovement.zero()
	asi = AbilityScoreImprovement.increase(asi, "str")
	asi = AbilityScoreImprovement.increase(asi, "str")
	asi = AbilityScoreImprovement.increase(asi, "con")
	asi = AbilityScoreImprovement.increase(asi, "cha")

	const result = attributes.improve(asi)

	expect(result.str.score).toEqual(3)
	expect(result.dex.score).toEqual(6)
	expect(result.con.score).toEqual(11)
	expect(result.int.score).toEqual(15)
	expect(result.wis.score).toEqual(20)
	expect(result.cha.score).toEqual(30)
})
