import { describe, test, expect } from "vitest"
import { TrainerLevelTable } from "../TrainerLevelTable"
import { Level } from "$lib/dnd/level"
import { stubTrainer, stubTrainerPokemon } from "$lib/trainers/test/stubs"
import type { IncreaseHpEffect } from "../effects/IncreaseHp"
import type { NewTrainerPathEffect } from "../effects/NewTrainerPath"
import { TrainerPaths } from "$lib/trainers/paths/2024"
import { LevelUp } from "../LevelUp"
import { PokemonLevelTable } from "../PokemonLevelTable"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"

describe("trainers", () => {
	test("level 1 to level 2", () => {
		// given
		const trainer = stubTrainer({
			level: new Level(1),
			hp: {
				current: 7,
				max: 12,
			},
		})

		const effects = TrainerLevelTable.toLevel(new Level(2))(trainer)
		const hpEffect = effects[1] as IncreaseHpEffect
		const pathEffect = effects[2] as NewTrainerPathEffect

		hpEffect.params.increaseAmount = 3
		pathEffect.params.path = TrainerPaths[0]

		// when
		const result = LevelUp.apply(trainer, effects)

		// then
		expect(result.level).toEqualData(new Level(2))
		expect(result.hp).toEqual({
			current: 10,
			max: 15,
		})
		expect(result.path.name).toEqual(TrainerPaths[0].name)
	})
})

describe("pokemon", () => {
	test("level 1 to level 2", () => {
		// given
		const pokemon = stubTrainerPokemon({
			level: new Level(1),
			hp: {
				current: 7,
				max: 12,
			},
		})

		const species = stubPokemonSpecies()

		const effects = PokemonLevelTable.toLevel(new Level(2))(pokemon, species)
		const hpEffect = effects[1] as IncreaseHpEffect

		hpEffect.params.increaseAmount = 3

		// when
		const result = LevelUp.apply(pokemon, effects)

		// then
		expect(result.level).toEqualData(new Level(2))
		expect(result.hp).toEqual({
			current: 10,
			max: 15,
		})
	})
})
