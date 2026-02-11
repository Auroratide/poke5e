import { test, expect } from "vitest"
import { stubPokemonSpecies } from "./stubs"
import { SpeciesFilter } from "../SpeciesFilter"

const species = [
	stubPokemonSpecies({
		name: "Raspberry",
		size: "small",
		sr: 1,
	}),
	stubPokemonSpecies({
		name: "Blueberry",
		size: "medium",
		sr: 3,
	}),
	stubPokemonSpecies({
		name: "Watermelon",
		size: "large",
		sr: 5,
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

test("sr: >", () => {
	const filter = new SpeciesFilter()
		.sr(">", 1)
	
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

test("sr: <", () => {
	const filter = new SpeciesFilter()
		.sr("<", 1)
	
	const result = species.filter(filter.apply)

	expect(result.length).toEqual(0)
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
