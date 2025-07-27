import { test, expect } from "vitest"
import { GenderRatio } from "../GenderRatio"

test("isGenderless", () => {
	const genderless = new GenderRatio("0:0")
	const gendered = new GenderRatio("1:1")

	expect(genderless.isGenderless()).toBe(true)
	expect(gendered.isGenderless()).toBe(false)
})

test("percentages", () => {
	const oneToOne = new GenderRatio("1:1")
	expect(oneToOne.percentFemale()).toEqual(50)
	expect(oneToOne.percentMale()).toEqual(50)
	
	const skewed = new GenderRatio("7:1")
	expect(skewed.percentFemale()).toEqual(87.5)
	expect(skewed.percentMale()).toEqual(12.5)

	const genderless = new GenderRatio("0:0")
	expect(genderless.percentFemale()).toEqual(0)
	expect(genderless.percentMale()).toEqual(0)
})
