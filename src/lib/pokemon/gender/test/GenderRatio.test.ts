import { test, expect, describe } from "vitest"
import { GenderRatio } from "../GenderRatio"
import { RandomStub } from "$lib/test/RandomStub"
import { PokemonGender } from "../PokemonGender"

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
	expect(skewed.percentFemale()).toEqual(87)
	expect(skewed.percentMale()).toEqual(13)

	const genderless = new GenderRatio("0:0")
	expect(genderless.percentFemale()).toEqual(0)
	expect(genderless.percentMale()).toEqual(0)
})

describe("random", () => {
	const sweep = (ratio: GenderRatio): Map<PokemonGender, number> => {
		const result = new Map<PokemonGender, number>([
			[PokemonGender.Female, 0],
			[PokemonGender.Male, 0],
			[PokemonGender.None, 0],
		])

		const rng = new RandomStub((i) => i / 100)

		for (let i = 0; i < 100; ++i) {
			const gender = ratio.random(rng.next)
			result.set(gender, result.get(gender) + 1)
		}

		return result
	}

	test("1:0", () => {
		const ratio = new GenderRatio("1:0")

		const result = sweep(ratio)

		expect(result.get(PokemonGender.Female)).toEqual(100)
		expect(result.get(PokemonGender.Male)).toEqual(0)
		expect(result.get(PokemonGender.None)).toEqual(0)
	})

	test("7:1", () => {
		const ratio = new GenderRatio("7:1")

		const result = sweep(ratio)

		expect(result.get(PokemonGender.Female)).toEqual(87)
		expect(result.get(PokemonGender.Male)).toEqual(13)
		expect(result.get(PokemonGender.None)).toEqual(0)
	})

	test("3:1", () => {
		const ratio = new GenderRatio("3:1")

		const result = sweep(ratio)

		expect(result.get(PokemonGender.Female)).toEqual(75)
		expect(result.get(PokemonGender.Male)).toEqual(25)
		expect(result.get(PokemonGender.None)).toEqual(0)
	})

	test("1:1", () => {
		const ratio = new GenderRatio("1:1")

		const result = sweep(ratio)

		expect(result.get(PokemonGender.Female)).toEqual(50)
		expect(result.get(PokemonGender.Male)).toEqual(50)
		expect(result.get(PokemonGender.None)).toEqual(0)
	})

	test("1:3", () => {
		const ratio = new GenderRatio("1:3")

		const result = sweep(ratio)

		expect(result.get(PokemonGender.Female)).toEqual(25)
		expect(result.get(PokemonGender.Male)).toEqual(75)
		expect(result.get(PokemonGender.None)).toEqual(0)
	})

	test("1:7", () => {
		const ratio = new GenderRatio("1:7")

		const result = sweep(ratio)

		expect(result.get(PokemonGender.Female)).toEqual(13)
		expect(result.get(PokemonGender.Male)).toEqual(87)
		expect(result.get(PokemonGender.None)).toEqual(0)
	})

	test("0:1", () => {
		const ratio = new GenderRatio("0:1")

		const result = sweep(ratio)

		expect(result.get(PokemonGender.Female)).toEqual(0)
		expect(result.get(PokemonGender.Male)).toEqual(100)
		expect(result.get(PokemonGender.None)).toEqual(0)
	})

	test("0:0", () => {
		const ratio = new GenderRatio("0:0")

		const result = sweep(ratio)

		expect(result.get(PokemonGender.Female)).toEqual(0)
		expect(result.get(PokemonGender.Male)).toEqual(0)
		expect(result.get(PokemonGender.None)).toEqual(100)
	})
})