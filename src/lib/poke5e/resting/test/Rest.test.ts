import { describe, test, expect, beforeEach } from "vitest"
import { PokemonResting, TrainerResting } from "../Rest"
import type { Trainer, TrainerPokemon } from "$lib/trainers/types"
import { stubLearnedMove, stubTrainer, stubTrainerPokemon } from "$lib/trainers/test/stubs"
import { HitDice } from "$lib/dnd/hit-dice"
import { PredictableDiceRoller } from "$lib/dnd/dice/test/PredictableDiceRoller"
import { TrainerPaths } from "$lib/trainers/paths"
import { stubChosenTrainerPath } from "$lib/trainers/paths/test/stubs"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"

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

	test("short resting won't spend more than the max available", () => {
		const heavilyDamagedPokemon = stubTrainerPokemon({
			hp: {
				current: 1,
				max: 32,
			},
			hitDice: {
				current: 3, // we can't spend more than 3
				max: 5,
			},
		})

		const rest = PokemonResting.Short({
			hitDiceToSpend: 5,
			hitDiceSize: new HitDice("d6"),
			diceRoller: new PredictableDiceRoller([2, 3, 4, 5, 6]),
		})

		const healed = rest.apply(heavilyDamagedPokemon)

		expect(healed.hp.current).toEqual(10)
		expect(healed.hitDice.current).toEqual(0)
	})

	test("pokecenter", () => {
		const rest = PokemonResting.Pokecenter({ rulesVersion: "2024" })

		const healed = rest.apply(damagedPokemon)

		expect(healed.hp.current).toEqual(30)
		expect(healed.hitDice.current).toEqual(2)
		expect(healed.status).toBeNull()
		expect(healed.moves[0].pp.current).toEqual(4)
		expect(healed.moves[1].pp.current).toEqual(0)
		expect(healed.bond.points.current).toEqual(0)
	})

	test("pokecenter: original ruleset", () => {
		const rest = PokemonResting.Pokecenter({ rulesVersion: "2018" })

		const healed = rest.apply(damagedPokemon)

		expect(healed.hp.current).toEqual(30)
		expect(healed.hitDice.current).toEqual(4)
		expect(healed.status).toBeNull()
		expect(healed.moves[0].pp.current).toEqual(10)
		expect(healed.moves[1].pp.current).toEqual(5)
		expect(healed.bond.points.current).toEqual(2)
	})
})

describe("trainer rest", () => {
	let damagedTrainer: Trainer

	beforeEach(() => {
		damagedTrainer = stubTrainer({
			hp: {
				current: 15,
				max: 30,
			},
			hitDice: {
				current: 2,
				max: 4,
			},
		})
	})

	test("long rest", () => {
		const rest = TrainerResting.Long({ trainerPaths: [] })

		const healed = rest.apply(damagedTrainer)

		expect(healed.hp.current).toEqual(30)
		expect(healed.hitDice.current).toEqual(4)
	})

	test("short rest", () => {
		const rest = TrainerResting.Short({
			hitDiceToSpend: 2,
			hitDiceSize: new HitDice("d6"),
			diceRoller: new PredictableDiceRoller([2, 3]),
		})

		const healed = rest.apply(damagedTrainer)

		expect(healed.hp.current).toEqual(20)
		expect(healed.hitDice.current).toEqual(0)
	})

	test("short resting won't spend extra hit dice", () => {
		const slightlyDamangedTrainer = stubTrainer({
			hp: {
				current: 31,
				max: 32,
			},
			hitDice: {
				current: 5,
				max: 5,
			},
		})

		const rest = TrainerResting.Short({
			hitDiceToSpend: 5,
			hitDiceSize: new HitDice("d6"),
			diceRoller: new PredictableDiceRoller([2, 3, 4, 5, 6]),
		})

		const healed = rest.apply(slightlyDamangedTrainer)

		expect(healed.hp.current).toEqual(32)
		expect(healed.hitDice.current).toEqual(4)
	})

	test("pokecenter", () => {
		const rest = TrainerResting.Pokecenter()

		const healed = rest.apply(damagedTrainer)

		expect(healed.hp.current).toEqual(15)
		expect(healed.hitDice.current).toEqual(2)
	})

	describe("trainer paths", () => {
		test("path has a resource", () => {
			const aceTrainer = stubTrainer({
				attributes: stubAttributes({
					dex: 16,
				}),
				path: stubChosenTrainerPath({
					name: "Ace Trainer",
					resource: 1,
				}),
			})

			const rest = TrainerResting.Long({ trainerPaths: TrainerPaths["2024"] })
	
			const healed = rest.apply(aceTrainer)
	
			// 1 + dex (3)
			expect(healed.path.resource).toEqual(4)
		})

		test("path has no resources", () => {
			const typeMaster = stubTrainer({
				path: stubChosenTrainerPath({
					name: "Type Master",
					resource: 0,
				}),
			})

			const rest = TrainerResting.Long({ trainerPaths: TrainerPaths["2024"] })
	
			const healed = rest.apply(typeMaster)
	
			expect(healed.path.resource).toEqual(0)
		})

		test("custom trainer path", () => {
			const notInList = stubTrainer({
				path: stubChosenTrainerPath({
					name: "Not In List",
					resource: 0,
				}),
			})

			const rest = TrainerResting.Long({ trainerPaths: TrainerPaths["2024"] })
	
			const healed = rest.apply(notInList)
	
			expect(healed.path.resource).toEqual(0)
		})

		test("trainer resource already exceeds theoretical max", () => {
			const aceTrainer = stubTrainer({
				attributes: stubAttributes({
					dex: 16,
				}),
				path: stubChosenTrainerPath({
					name: "Ace Trainer",
					resource: 10,
				}),
			})

			const rest = TrainerResting.Long({ trainerPaths: TrainerPaths["2024"] })
	
			const healed = rest.apply(aceTrainer)
	
			expect(healed.path.resource).toEqual(10)
		})
	})
})
