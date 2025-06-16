import { describe, test, expect } from "vitest"
import { pokemonWhoLearnThisMove, pokemonWhoLearnThisTm } from "../pokemon"
import { stubMovePool, stubPokemon } from "$lib/creatures/test/stubs"
import { stubTm } from "./stubs"

describe("pokemonWhoLearnThisMove", () => {
	test("no pokemon learns this", () => {
		const result = pokemonWhoLearnThisMove("not-knowable", [], [stubPokemon()])

		expect(result).toEqual([])
	})

	test("some pokemon learn this", () => {
		const workUp = stubTm({
			id: 1,
			move: "work-up",
		})

		const learnsWorkUpAtStart = stubPokemon({
			moves: stubMovePool({
				start: ["work-up", "tail-whip"],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				tm: [],
				egg: [],
			}),
		})

		const learnsWorkUpAtLevel = stubPokemon({
			moves: stubMovePool({
				start: [],
				level2: [],
				level6: [],
				level10: ["work-up", "tail-whip"],
				level14: [],
				level18: [],
				tm: [],
				egg: [],
			}),
		})

		const learnsWorkUpAsTm = stubPokemon({
			moves: stubMovePool({
				start: [],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				tm: [workUp.id],
				egg: [],
			}),
		})

		const learnsWorkUpAsEgg = stubPokemon({
			moves: stubMovePool({
				start: [],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				tm: [],
				egg: ["work-up", "tail-whip"],
			}),
		})

		const doesNotLearnWorkUp = stubPokemon({
			moves: stubMovePool({
				start: ["tail-whip"],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				tm: [],
				egg: [],
			}),
		})

		const result = pokemonWhoLearnThisMove("work-up", [workUp], [
			learnsWorkUpAtStart,
			learnsWorkUpAtLevel,
			learnsWorkUpAsTm,
			learnsWorkUpAsEgg,
			doesNotLearnWorkUp,
		])

		expect(result).toEqual([
			learnsWorkUpAtStart,
			learnsWorkUpAtLevel,
			learnsWorkUpAsTm,
			learnsWorkUpAsEgg,
		])
	})
})

describe("pokemonWhoLearnThisTm", () => {
	test("no pokemon learns this", () => {
		const result = pokemonWhoLearnThisTm(1, [stubPokemon({
			moves: stubMovePool({
				tm: [2],
			}),
		})])

		expect(result).toEqual([])
	})

	test("some pokemon learn this", () => {
		const workUp = stubTm({
			id: 1,
			move: "work-up",
		})

		const learnsWorkUpAtStart = stubPokemon({
			moves: stubMovePool({
				start: ["work-up", "tail-whip"],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				tm: [],
				egg: [],
			}),
		})

		const learnsWorkUpAtLevel = stubPokemon({
			moves: stubMovePool({
				start: [],
				level2: [],
				level6: [],
				level10: ["work-up", "tail-whip"],
				level14: [],
				level18: [],
				tm: [],
				egg: [],
			}),
		})

		const learnsWorkUpAsTm = stubPokemon({
			moves: stubMovePool({
				start: [],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				tm: [workUp.id, 2],
				egg: [],
			}),
		})

		const learnsWorkUpAsEgg = stubPokemon({
			moves: stubMovePool({
				start: [],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				tm: [],
				egg: ["work-up", "tail-whip"],
			}),
		})

		const doesNotLearnWorkUp = stubPokemon({
			moves: stubMovePool({
				start: ["tail-whip"],
				level2: [],
				level6: [],
				level10: [],
				level14: [],
				level18: [],
				tm: [2],
				egg: [],
			}),
		})

		const result = pokemonWhoLearnThisTm(workUp.id, [
			learnsWorkUpAtStart,
			learnsWorkUpAtLevel,
			learnsWorkUpAsTm,
			learnsWorkUpAsEgg,
			doesNotLearnWorkUp,
		])

		expect(result).toEqual([
			learnsWorkUpAsTm,
		])
	})
})
