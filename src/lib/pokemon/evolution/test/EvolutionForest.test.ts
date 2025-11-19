import { test, expect, beforeEach } from "vitest"
import { EvolutionForest } from "../EvolutionForest"
import { stubEvolution } from "./stubs"
import { SpeciesIdentifier } from "$lib/creatures/species"

const eeveeToFlareon = stubEvolution({
	id: "eevee-to-flareon",
	from: "eevee",
	to: "flareon",
})
let forest: EvolutionForest

beforeEach(() => {
	forest = new EvolutionForest([
		eeveeToFlareon,
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

test("duplicates do not get added", () => {
	let eeveeEvos = forest.evolvesTo(SpeciesIdentifier.fromSpeciesName("eevee"))
	expect(eeveeEvos.length).toEqual(3)

	forest.addAll([
		stubEvolution({
			from: "eevee",
			to: "umbreon",
		}),
	])

	forest.addAll([
		stubEvolution({
			from: "eevee",
			to: "umbreon",
		}),
	])

	eeveeEvos = forest.evolvesTo(SpeciesIdentifier.fromSpeciesName("eevee"))
	expect(eeveeEvos.length).toEqual(4)
})

test("update condition", () => {
	const eevee = SpeciesIdentifier.fromSpeciesName("eevee")

	const newEeveeToFlareonEvo = stubEvolution({
		...eeveeToFlareon.data,
		conditions: [ {
			type: "gender",
			value: "female",
		} ],
	})

	forest.update(newEeveeToFlareonEvo)

	const eeveeEvos = forest.evolvesTo(eevee)
	expect(eeveeEvos.length).toEqual(3)

	const flareonEvo = eeveeEvos.find((it) => it.to.data === "flareon")
	expect(flareonEvo.data.conditions[0].value).toEqual("female")
})

test("update from/to", () => {
	const eevee = SpeciesIdentifier.fromSpeciesName("eevee")
	const twovee = SpeciesIdentifier.fromSpeciesName("twovee")
	const flaretwo = SpeciesIdentifier.fromSpeciesName("flaretwo")

	const twoveeToFlaretwo = stubEvolution({
		...eeveeToFlareon.data,
		from: twovee.data,
		to: flaretwo.data,
	})

	forest.update(twoveeToFlaretwo)

	const eeveeEvos = forest.evolvesTo(eevee)
	expect(eeveeEvos.length).toEqual(2) // eevee to flareon got replaced

	const flaretwoEvo = forest.evolvesTo(twovee)
	expect(flaretwoEvo.length).toEqual(1)
})

test("remove", () => {
	let eeveeEvos = forest.evolvesTo(SpeciesIdentifier.fromSpeciesName("eevee"))
	expect(eeveeEvos.length).toEqual(3)

	let charmanderStages  = forest.maxStage(SpeciesIdentifier.fromSpeciesName("charmander"))
	expect(charmanderStages).toEqual(3)

	forest.remove(stubEvolution({
		from: "eevee",
		to: "flareon",
	}))
	forest.remove(stubEvolution({
		from: "charmeleon",
		to: "charizard",
	}))

	eeveeEvos = forest.evolvesTo(SpeciesIdentifier.fromSpeciesName("eevee"))
	expect(eeveeEvos.length).toEqual(2)

	charmanderStages  = forest.maxStage(SpeciesIdentifier.fromSpeciesName("charmander"))
	expect(charmanderStages).toEqual(2)
})

test("cyclic evolution", () => {
	const charmander = SpeciesIdentifier.fromSpeciesName("charmander")
	let charmanderStages  = forest.maxStage(charmander)
	expect(charmanderStages).toEqual(3)

	forest.addAll([
		stubEvolution({
			from: "charizard",
			to: "charmander",
		}),
	])

	charmanderStages  = forest.maxStage(charmander)
	expect(charmanderStages).toEqual(Infinity)

	const charmanderCurrentState  = forest.currentStage(charmander)
	expect(charmanderCurrentState).toEqual(0)
})

test("self-evolution", () => {
	const heracross = SpeciesIdentifier.fromSpeciesName("heracross")
	forest.addAll([
		stubEvolution({
			from: "heracross",
			to: "heracross",
		}),
	])
	
	const maxStages = forest.maxStage(heracross)
	expect(maxStages).toEqual(Infinity)

	const currentStage  = forest.currentStage(heracross)
	expect(currentStage).toEqual(0)
})
