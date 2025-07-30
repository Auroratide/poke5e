import { describe, test, expect, beforeEach } from "vitest"
import { PokemonResting } from "../Rest"
import type { TrainerPokemon } from "$lib/trainers/types"
import { stubLearnedMove, stubTrainerPokemon } from "$lib/trainers/test/stubs"

describe("Pokemon rest", () => {
	let damagedPokemon: TrainerPokemon

	beforeEach(() => {
		damagedPokemon = stubTrainerPokemon({
			hp: {
				current: 15,
				max: 30,
			},
			hitDice: {
				current: 2,
				max: 4,
			},
			status: "Burned",
			moves: [
				stubLearnedMove({
					pp: {
						current: 4,
						max: 10,
					},
				}),
				stubLearnedMove({
					pp: {
						current: 0,
						max: 5,
					},
				}),
			],
			bond: {
				level: 2,
				points: {
					current: 0,
					max: 2,
				},
			},
		})
	})

	test("long rest", () => {
		const rest = PokemonResting.Long()

		const healed = rest.apply(damagedPokemon)

		expect(healed.hp.current).toEqual(30)
		expect(healed.hitDice.current).toEqual(4)
		expect(healed.status).toBeNull()
		expect(healed.moves[0].pp.current).toEqual(10)
		expect(healed.moves[1].pp.current).toEqual(5)
		expect(healed.bond.points.current).toEqual(2)
	})

	test("short rest", () => {
		const rest = PokemonResting.Short({ hitDiceToSpend: 1})

		const healed = rest.apply(damagedPokemon)

		expect(healed.hp.current).toEqual(15)
		expect(healed.hitDice.current).toEqual(1)
		expect(healed.status).toBeNull()
		expect(healed.moves[0].pp.current).toEqual(4)
		expect(healed.moves[1].pp.current).toEqual(0)
		expect(healed.bond.points.current).toEqual(0)
	})

	test("pokecenter", () => {
		const rest = PokemonResting.Pokecenter()

		const healed = rest.apply(damagedPokemon)

		expect(healed.hp.current).toEqual(30)
		expect(healed.hitDice.current).toEqual(2)
		expect(healed.status).toBeNull()
		expect(healed.moves[0].pp.current).toEqual(4)
		expect(healed.moves[1].pp.current).toEqual(0)
		expect(healed.bond.points.current).toEqual(0)
	})
})