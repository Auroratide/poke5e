import { test, expect } from "vitest"
import { LearnableMoves } from "../LearnableMoves"
import { stubMove, stubTm, stubTmDetails } from "./stubs-2"
import type { Move } from "../Move"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { Level } from "$lib/dnd/level"
import { measureTime } from "$lib/test/time"

const flamethrower = stubMove({
	id: "flamethrower",
	name: "Flamethrower",
})

const razorLeaf = stubMove({
	id: "razor-leaf",
	name: "Razor Leaf",
})

const tackle = stubMove({
	id: "tackle",
	name: "Tackle",
})

const thunderbolt = stubTm({
	id: "thunderbolt",
	name: "Thunderbolt",
	tm: stubTmDetails({
		id: 7,
	}),
})

const waterGun = stubMove({
	id: "water-gun",
	name: "Water Gun",
})

const ALL_MOVES: Move[] = [
	flamethrower,
	razorLeaf,
	tackle,
	thunderbolt,
	waterGun,
]

test("pokemon cannot learn any moves", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [],
		},
	})

	// when
	const result = LearnableMoves.groupMoves(ALL_MOVES, pokemon, new Level(20))

	// then: only non-empty groups show
	expect(result.nonemptyGroups()).toEqual([ {
		name: "All Other Moves",
		moves: ALL_MOVES,
	} ])
})

test("pokemon can learn some moves", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [tackle.id, flamethrower.id],
		},
	})

	// when
	const result = LearnableMoves.groupMoves(ALL_MOVES, pokemon, new Level(20))

	// then
	expect(result.nonemptyGroups()).toEqual([ {
		name: "Learnable at Current Level",
		moves: [flamethrower, tackle],
	}, {
		name: "All Other Moves",
		moves: [razorLeaf, thunderbolt, waterGun],
	} ])
})

test("pokemon can learn moves at different levels", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [tackle.id, flamethrower.id],
			level6: [waterGun.id, razorLeaf.id],
		},
	})

	// when
	const result = LearnableMoves.groupMoves(ALL_MOVES, pokemon, new Level(3))

	// then: order is alphabetical
	expect(result.nonemptyGroups()).toEqual([ {
		name: "Learnable at Current Level",
		moves: [flamethrower, tackle],
	}, {
		name: "Learnable at Later Levels",
		moves: [razorLeaf, waterGun],
	}, {
		name: "All Other Moves",
		moves: [thunderbolt],
	} ])
})

test("pokemon can learn moves from every available level", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [tackle.id, flamethrower.id],
			level6: [waterGun.id, razorLeaf.id],
		},
	})

	// when
	const result = LearnableMoves.groupMoves(ALL_MOVES, pokemon, new Level(10))

	// then: order is alphabetical
	expect(result.nonemptyGroups()).toEqual([ {
		name: "Learnable at Current Level",
		moves: [flamethrower, razorLeaf, tackle, waterGun],
	}, {
		name: "All Other Moves",
		moves: [thunderbolt],
	} ])
})

test("pokemon can learn egg moves", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [tackle.id, flamethrower.id],
			egg: [razorLeaf.id],
		},
	})

	// when
	const result = LearnableMoves.groupMoves(ALL_MOVES, pokemon, new Level(20))

	// then
	expect(result.nonemptyGroups()).toEqual([ {
		name: "Learnable at Current Level",
		moves: [flamethrower, tackle],
	}, {
		name: "Egg Moves",
		moves: [razorLeaf],
	}, {
		name: "All Other Moves",
		moves: [thunderbolt, waterGun],
	} ])
})

test("egg move is also a learnable move", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [tackle.id, flamethrower.id],
			egg: [flamethrower.id],
		},
	})

	// when
	const result = LearnableMoves.groupMoves(ALL_MOVES, pokemon, new Level(20))

	// then
	expect(result.nonemptyGroups()).toEqual([ {
		name: "Learnable at Current Level",
		moves: [flamethrower, tackle],
	}, {
		name: "Egg Moves",
		moves: [flamethrower],
	}, {
		name: "All Other Moves",
		moves: [razorLeaf, thunderbolt, waterGun],
	} ])
})

test("pokemon can learn TMs", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [tackle.id, flamethrower.id],
			tm: [thunderbolt.tm.id],
		},
	})

	// when
	const result = LearnableMoves.groupMoves(ALL_MOVES, pokemon, new Level(20))

	// then
	expect(result.nonemptyGroups()).toEqual([ {
		name: "Learnable at Current Level",
		moves: [flamethrower, tackle],
	}, {
		name: "TMs",
		moves: [thunderbolt],
	}, {
		name: "All Other Moves",
		moves: [razorLeaf, waterGun],
	} ])
})

test("moves list is empty", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [tackle.id, flamethrower.id],
		},
	})

	// when
	const result = LearnableMoves.groupMoves([], pokemon, new Level(20))

	// then
	expect(result.nonemptyGroups()).toEqual([])
})

test("performance is not garbage", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: Array(50).map((_, i) => `${i}`),
			tm: Array(50).map((_, i) => i),
		},
	})

	const thousandsOfMoves = Array(5000).map((_, i) => stubMove({ id: `${i}` }))

	// when
	const { elapsedMs } = measureTime(() => {
		LearnableMoves.groupMoves(thousandsOfMoves, pokemon, new Level(20)).nonemptyGroups()
	})

	// then
	expect(elapsedMs).toBeLessThan(50)
})
