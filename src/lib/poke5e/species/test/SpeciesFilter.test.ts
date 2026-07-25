import { test, expect } from "vitest"
import { stubPokemonSpecies } from "./stubs"
import { SpeciesFilter } from "../SpeciesFilter"

const species = [
	stubPokemonSpecies({
		name: "Raspberry",
		type: ["normal"],
		size: "small",
		sr: 1,
		minLevel: 1,
		eggGroups: ["field"],
		habitat: {
			biomes: ["cave"],
			nativeRegion: "Red",
			regions: ["Red", "Black"],
		},
	}),
	stubPokemonSpecies({
		name: "Blueberry",
		type: ["fairy", "normal"],
		size: "medium",
		sr: 3,
		minLevel: 3,
		eggGroups: ["water 1"],
		habitat: {
			biomes: ["cave"],
			nativeRegion: "Blue",
			regions: ["Blue"],
		},
	}),
	stubPokemonSpecies({
		name: "Watermelon",
		type: ["water"],
		size: "large",
		sr: 5,
		minLevel: 5,
		eggGroups: ["water 1"],
		habitat: {
			biomes: ["volcano"],
			nativeRegion: "Green",
			regions: ["Red", "Green"],
		},
	}),
]

test("name only", () => {
	const filter = new SpeciesFilter()
		.name("raspberry")

	const result = species.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(species[0])
})

test("name multiple match", () => {
	const filter = new SpeciesFilter()
		.name("berry")

	const result = species.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result[0]).toEqual(species[0])
	expect(result[1]).toEqual(species[1])
})

test("size only", () => {
	const filter = new SpeciesFilter()
		.size("medium")

	const result = species.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(species[1])
})

test("sr: ≥", () => {
	const filter = new SpeciesFilter()
		.sr("≥", 3)
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result).toEqual([species[1], species[2]])
})

test("sr: =", () => {
	const filter = new SpeciesFilter()
		.sr("=", 1)
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result).toEqual([species[0]])
})

test("sr: ≤", () => {
	const filter = new SpeciesFilter()
		.sr("≤", 0.5)
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(0)
})

test("minLevel: ≥", () => {
	const filter = new SpeciesFilter()
		.minLevel("≥", 2)
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result).toEqual([species[1], species[2]])
})

test("minLevel: =", () => {
	const filter = new SpeciesFilter()
		.minLevel("=", 1)
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result).toEqual([species[0]])
})

test("minLevel: ≤", () => {
	const filter = new SpeciesFilter()
		.minLevel("≤", 0)
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(0)
})

test("type", () => {
	const filter = new SpeciesFilter()
		.type("normal")
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result).toEqual([species[0], species[1]])
})

test("egg group", () => {
	const filter = new SpeciesFilter()
		.eggGroup("field")
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result).toEqual([species[0]])
})

test("biome", () => {
	const filter = new SpeciesFilter()
		.biome("volcano")
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result).toEqual([species[2]])
})

test("region", () => {
	const filter = new SpeciesFilter()
		.nativeRegion("red")
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result).toEqual([species[0]])
})

test("name and size", () => {
	const filter = new SpeciesFilter()
		.name("berry")
		.size("medium")

	const result = species.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(species[1])
})


test("no results", () => {
	const filter = new SpeciesFilter()
		.name("?????")

	const result = species.filter(filter.apply)

	expect(result.length).toEqual(0)
})

test("filters count", () => {
	const none = new SpeciesFilter()
	expect(none.count()).toEqual(0)

	const one = new SpeciesFilter()
		.name("?")
	expect(one.count()).toEqual(1)

	const two = new SpeciesFilter()
		.name("?")
		.size("small")
	expect(two.count()).toEqual(2)
})
