import { test, expect } from "vitest"
import { SpeciesRating } from "../SpeciesRating"
import { Level } from "$lib/dnd/level"

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

test("maxAllowed", () => {
	expect(SpeciesRating.maxAllowed(new Level(1))).toEqualData(new SpeciesRating(2))
	expect(SpeciesRating.maxAllowed(new Level(5))).toEqualData(new SpeciesRating(5))
	expect(SpeciesRating.maxAllowed(new Level(10))).toEqualData(new SpeciesRating(10))
	expect(SpeciesRating.maxAllowed(new Level(15))).toEqualData(new SpeciesRating(14))
	expect(SpeciesRating.maxAllowed(new Level(20))).toEqualData(new SpeciesRating(15))
})
