import { test, expect, beforeEach } from "vitest"
import { EvolutionForest } from "../EvolutionForest"
import { stubEvolution } from "./stubs"
import { SpeciesIdentifier } from "$lib/creatures/species"

let forest: EvolutionForest

beforeEach(() => {
	forest = new EvolutionForest([
		stubEvolution({
			from: "eevee",
			to: "flareon",
		}),
		stubEvolution({
			from: "eevee",
			to: "vaporeon",
		}),
		stubEvolution({
			from: "eevee",
			to: "jolteon",
		}),
		stubEvolution({
			from: "charmander",
			to: "charmeleon",
		}),
		stubEvolution({
			from: "charmeleon",
			to: "charizard",
		}),
		stubEvolution({
			from: "applin",
			to: "flapple",
		}),
		stubEvolution({
			from: "applin",
			to: "appletun",
		}),
		stubEvolution({
			from: "applin",
			to: "dipplin",
		}),
		stubEvolution({
			from: "dipplin",
			to: "hydrapple",
		}),
	])
})

test("max stage 1", () => {
	const result = forest.maxStage(SpeciesIdentifier.fromSpeciesName("palkia"))

	expect(result).toEqual(1)
})

test("max stage 2", () => {
	const result = forest.maxStage(SpeciesIdentifier.fromSpeciesName("eevee"))

	expect(result).toEqual(2)
})

test("max stage 3", () => {
	const result = forest.maxStage(SpeciesIdentifier.fromSpeciesName("charmander"))

	expect(result).toEqual(3)
})

test("max stage at end of sub-branch", () => {
	let result = forest.maxStage(SpeciesIdentifier.fromSpeciesName("applin"))
	expect(result).toEqual(3)

	result = forest.maxStage(SpeciesIdentifier.fromSpeciesName("flapple"))
	expect(result).toEqual(2)

	result = forest.maxStage(SpeciesIdentifier.fromSpeciesName("dipplin"))
	expect(result).toEqual(3)

	result = forest.maxStage(SpeciesIdentifier.fromSpeciesName("hydrapple"))
	expect(result).toEqual(3)
})

test("current stage no evos", () => {
	const result = forest.currentStage(SpeciesIdentifier.fromSpeciesName("palkia"))

	expect(result).toEqual(1)
})

test("current stage branching evos", () => {
	let result = forest.currentStage(SpeciesIdentifier.fromSpeciesName("eevee"))
	expect(result).toEqual(1)

	result = forest.currentStage(SpeciesIdentifier.fromSpeciesName("vaporeon"))
	expect(result).toEqual(2)
})

test("current stage linear evos", () => {
	let result = forest.currentStage(SpeciesIdentifier.fromSpeciesName("charmander"))
	expect(result).toEqual(1)

	result = forest.currentStage(SpeciesIdentifier.fromSpeciesName("charmeleon"))
	expect(result).toEqual(2)

	result = forest.currentStage(SpeciesIdentifier.fromSpeciesName("charizard"))
	expect(result).toEqual(3)
})

test("has evolution tree", () => {
	const eevee = forest.hasEvolutionTree(SpeciesIdentifier.fromSpeciesName("eevee"))
	const flareon = forest.hasEvolutionTree(SpeciesIdentifier.fromSpeciesName("flareon"))

	expect(eevee).toBe(true)
	expect(flareon).toBe(true)
})

test("does not have evolution tree", () => {
	const mewtwo = forest.hasEvolutionTree(SpeciesIdentifier.fromSpeciesName("mewtwo"))

	expect(mewtwo).toBe(false)
})

test("addAll", () => {
	let eeveeEvos = forest.evolvesTo(SpeciesIdentifier.fromSpeciesName("eevee"))
	expect(eeveeEvos.length).toEqual(3)

	let charmanderStages  = forest.maxStage(SpeciesIdentifier.fromSpeciesName("charmander"))
	expect(charmanderStages).toEqual(3)

	forest.addAll([
		stubEvolution({
			from: "eevee",
			to: "umbreon",
		}),
		stubEvolution({
			from: "eevee",
			to: "espeon",
		}),
		stubEvolution({
			from: "charizard",
			to: "charzilla",
		}),
	])

	eeveeEvos = forest.evolvesTo(SpeciesIdentifier.fromSpeciesName("eevee"))
	expect(eeveeEvos.length).toEqual(5)

	charmanderStages  = forest.maxStage(SpeciesIdentifier.fromSpeciesName("charmander"))
	expect(charmanderStages).toEqual(4)
})
