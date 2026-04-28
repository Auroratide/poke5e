import { describe, test, expect } from "vitest"
import { CatchDc } from "../CatchDc"
import { Level } from "$lib/dnd/level"
import { SpeciesRating } from "$lib/poke5e/sr"

const HEALTHY = { current: 100, max: 100 }
const BLOODIED = { current: 49, max: 100 }
const NEAR_FAINTING = { current: 5, max: 100 }

describe("2024", () => {
	const version = "2024"

	test("fractional SR", () => {
		const level = new Level(1)
		const sr = new SpeciesRating(0.5)
		const hp = HEALTHY
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(11)
	})

	test("larger SR", () => {
		const level = new Level(1)
		const sr = new SpeciesRating(5)
		const hp = HEALTHY
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(16)
	})

	test("larger level", () => {
		const level = new Level(10)
		const sr = new SpeciesRating(1)
		const hp = HEALTHY
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(21)
	})

	test("bloodied", () => {
		const level = new Level(1)
		const sr = new SpeciesRating(1)
		const hp = BLOODIED
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(7)
	})

	test("near fainting", () => {
		const level = new Level(1)
		const sr = new SpeciesRating(1)
		const hp = NEAR_FAINTING
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(2)
	})
})

describe("2018", () => {
	const version = "2018"

	test("fractional SR", () => {
		const level = new Level(1)
		const sr = new SpeciesRating(0.5)
		const hp = HEALTHY
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(21)
	})

	test("larger SR", () => {
		const level = new Level(1)
		const sr = new SpeciesRating(5)
		const hp = HEALTHY
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(26)
	})

	test("larger level", () => {
		const level = new Level(10)
		const sr = new SpeciesRating(1)
		const hp = HEALTHY
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(31)
	})

	test("bloodied", () => {
		const level = new Level(1)
		const sr = new SpeciesRating(1)
		const hp = BLOODIED
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(16)
	})

	test("near fainting", () => {
		const level = new Level(1)
		const sr = new SpeciesRating(1)
		const hp = NEAR_FAINTING
		const result = CatchDc.calculate({
			level, sr, hp, version,
		})
	
		expect(result).toEqual(12)
	})
})
