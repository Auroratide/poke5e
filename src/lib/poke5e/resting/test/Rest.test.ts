import { describe, test, expect, beforeEach } from "vitest"
import { PokemonResting } from "../Rest"
import type { TrainerPokemon } from "$lib/trainers/types"
import { stubLearnedMove, stubTrainerPokemon } from "$lib/trainers/test/stubs"
import { HitDice } from "$lib/dnd/hit-dice"
import { PredictableDiceRoller } from "$lib/dnd/dice/test/PredictableDiceRoller"

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
		const rest = PokemonResting.Short({
			hitDiceToSpend: 2,
			hitDiceSize: new HitDice("d6"),
			diceRoller: new PredictableDiceRoller([2, 3]),
		})

		const healed = rest.apply(damagedPokemon)

		expect(healed.hp.current).toEqual(20)
		expect(healed.hitDice.current).toEqual(0)
		expect(healed.status).toBeNull()
		expect(healed.moves[0].pp.current).toEqual(4)
		expect(healed.moves[1].pp.current).toEqual(0)
		expect(healed.bond.points.current).toEqual(0)
	})

	test("short resting won't spend extra hit dice", () => {
		const slightlyDamangedPokemon = stubTrainerPokemon({
			hp: {
				current: 31,
				max: 32,
			},
			hitDice: {
				current: 5,
				max: 5,
			},
		})

		const rest = PokemonResting.Short({
			hitDiceToSpend: 5,
			hitDiceSize: new HitDice("d6"),
			diceRoller: new PredictableDiceRoller([2, 3, 4, 5, 6]),
		})

		const healed = rest.apply(slightlyDamangedPokemon)

		expect(healed.hp.current).toEqual(32)
		expect(healed.hitDice.current).toEqual(4)
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