import { describe, test, expect, beforeEach } from "vitest"
import { EvolutionForest } from "../EvolutionForest"
import { stubEvolution } from "./stubs"
import { SpeciesIdentifier } from "$lib/poke5e/species"
import { Level } from "$lib/dnd/level"

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

test("asi", () => {
	const oneStage = forest.asi(SpeciesIdentifier.fromSpeciesName("palkia"))
	const twoStages = forest.asi(SpeciesIdentifier.fromSpeciesName("eevee"))
	const threeStages = forest.asi(SpeciesIdentifier.fromSpeciesName("charmander"))

	expect(oneStage).toEqual(4)
	expect(twoStages).toEqual(3)
	expect(threeStages).toEqual(2)
})

describe("weird evolutions", () => {
	test("cyclic evolution", () => {
		// A > B > C > A
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
		// A > A
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

		const asi  = forest.asi(heracross)
		expect(asi).toEqual(2)
	})

	test("skipping a step", () => {
		// A > B > C, and A > C
		const weirdForest = new EvolutionForest([
			stubEvolution({
				from: "one",
				to: "two",
			}),
			stubEvolution({
				from: "two",
				to: "three",
			}),
			stubEvolution({
				from: "one",
				to: "three",
			}),
		])
		const one = SpeciesIdentifier.fromSpeciesName("one")
		const two = SpeciesIdentifier.fromSpeciesName("two")
		const three = SpeciesIdentifier.fromSpeciesName("three")

		const maxStages = weirdForest.maxStage(one)
		expect(maxStages).toEqual(3)

		expect(weirdForest.currentStage(one)).toEqual(1)
		expect(weirdForest.currentStage(two)).toEqual(2)
		expect(weirdForest.currentStage(three)).toEqual(3)
	})
})

describe("evolvesAtLevel", () => {
	const levelForest = () => new EvolutionForest([
		stubEvolution({
			from: "pikachu",
			to: "raichu",
			conditions: [ { type: "item", value: "Thunder Stone" } ],
		}),
		stubEvolution({
			from: "charmander",
			to: "charmeleon",
			conditions: [ { type: "level", value: 5 } ],
		}),
		stubEvolution({
			from: "charmeleon",
			to: "charizard",
			conditions: [ { type: "level", value: 10 } ],
		}),
		stubEvolution({
			from: "eevee",
			to: "espeon",
			conditions: [ { type: "level", value: 8 }, { type: "time", value: "day" } ],
		}),
		stubEvolution({
			from: "eevee",
			to: "umbreon",
			conditions: [ { type: "level", value: 8 }, { type: "time", value: "night" } ],
		}),
		stubEvolution({
			from: "eevee",
			to: "flareon",
			conditions: [ { type: "item", value: "Fire Stone" } ],
		}),
	])

	const ids = (evolutions: { to: SpeciesIdentifier }[]) => evolutions.map((it) => it.to.data)

	test("below the required level", () => {
		const result = levelForest().evolvesAtLevel(SpeciesIdentifier.fromSpeciesName("charmander"), new Level(4))

		expect(result).toEqual([])
	})

	test("exactly at the required level", () => {
		const result = levelForest().evolvesAtLevel(SpeciesIdentifier.fromSpeciesName("charmander"), new Level(5))

		expect(ids(result)).toEqual(["charmeleon"])
	})

	test("above the required level, because evolution was delayed", () => {
		const result = levelForest().evolvesAtLevel(SpeciesIdentifier.fromSpeciesName("charmander"), new Level(7))

		expect(ids(result)).toEqual(["charmeleon"])
	})

	test("only considers the next stage", () => {
		const result = levelForest().evolvesAtLevel(SpeciesIdentifier.fromSpeciesName("charmander"), new Level(12))

		expect(ids(result)).toEqual(["charmeleon"])
	})

	test("non-level evolutions are excluded", () => {
		const result = levelForest().evolvesAtLevel(SpeciesIdentifier.fromSpeciesName("pikachu"), new Level(20))

		expect(result).toEqual([])
	})

	test("branching level evolutions with additional conditions", () => {
		const result = levelForest().evolvesAtLevel(SpeciesIdentifier.fromSpeciesName("eevee"), new Level(8))

		expect(ids(result)).toEqual(["espeon", "umbreon"])
	})

	test("species with no evolutions", () => {
		const result = levelForest().evolvesAtLevel(SpeciesIdentifier.fromSpeciesName("palkia"), new Level(20))

		expect(result).toEqual([])
	})
})
