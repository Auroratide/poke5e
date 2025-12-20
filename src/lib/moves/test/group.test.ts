import { test, expect } from "vitest"
import { groupByLearnability } from "../group"
import { stubMove, stubTm } from "./stubs"
import type { Move, Tm } from "../types"
import { measureTime } from "$lib/test/time"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"

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

const thunderbolt = stubMove({
	id: "thunderbolt",
	name: "Thunderbolt",
})

const waterGun = stubMove({
	id: "water-gun",
	name: "Water Gun",
})

const thunderboltTm = stubTm({
	id: 7,
	move: thunderbolt.id,
	moveInfo: thunderbolt,
})

const ALL_MOVES: Move[] = [
	flamethrower,
	razorLeaf,
	tackle,
	thunderbolt,
	waterGun,
]

const ALL_TMS: Tm[] = [thunderboltTm]

test("pokemon cannot learn any moves", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [],
		},
	})

	// when
	const result = groupByLearnability(ALL_MOVES, ALL_TMS, pokemon, 20)

	// then: only non-empty groups show
	expect(result).toEqual([ {
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
	const result = groupByLearnability(ALL_MOVES, ALL_TMS, pokemon, 20)

	// then
	expect(result).toEqual([ {
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
	const result = groupByLearnability(ALL_MOVES, ALL_TMS, pokemon, 3)

	// then: order is alphabetical
	expect(result).toEqual([ {
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
	const result = groupByLearnability(ALL_MOVES, ALL_TMS, pokemon, 10)

	// then: order is alphabetical
	expect(result).toEqual([ {
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
	const result = groupByLearnability(ALL_MOVES, ALL_TMS, pokemon, 20)

	// then
	expect(result).toEqual([ {
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
	const result = groupByLearnability(ALL_MOVES, ALL_TMS, pokemon, 20)

	// then
	expect(result).toEqual([ {
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
			tm: [thunderboltTm.id],
		},
	})

	// when
	const result = groupByLearnability(ALL_MOVES, ALL_TMS, pokemon, 20)

	// then
	expect(result).toEqual([ {
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
	const result = groupByLearnability([], ALL_TMS, pokemon, 20)

	// then
	expect(result).toEqual([])
})

test("tms list is empty", () => {
	// given
	const pokemon = stubPokemonSpecies({
		moves: {
			start: [tackle.id, flamethrower.id],
			tm: [thunderboltTm.id],
		},
	})

	// when
	const result = groupByLearnability(ALL_MOVES, [], pokemon, 20)

	// then
	expect(result).toEqual([ {
		name: "Learnable at Current Level",
		moves: [flamethrower, tackle],
	}, {
		name: "All Other Moves",
		moves: [razorLeaf, thunderbolt, waterGun],
	} ])
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
	const hundredsOfTms = Array(500).map((_, i) => stubTm({ id: i, move: `${i}` }))

	// when
	const { elapsedMs } = measureTime(() => {
		groupByLearnability(thousandsOfMoves, hundredsOfTms, pokemon, 20)
	})

	// then
	expect(elapsedMs).toBeLessThan(50)
})
