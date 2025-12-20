import { test, expect } from "vitest"
import { SpeciesRating } from "../SpeciesRating"

test("toString", () => {
	const oneEighth = new SpeciesRating(0.125)
	const oneFourth = new SpeciesRating(0.25)
	const oneHalf = new SpeciesRating(0.5)
	const one = new SpeciesRating(1)
	const ten = new SpeciesRating(10)

	expect(oneEighth.toString()).toEqual("⅛")
	expect(oneFourth.toString()).toEqual("¼")
	expect(oneHalf.toString()).toEqual("½")
	expect(one.toString()).toEqual("1")
	expect(ten.toString()).toEqual("10")
})
