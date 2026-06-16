import { describe, test, expect } from "vitest"
import { TrainerLevelTable } from "../TrainerLevelTable"
import { Level } from "$lib/dnd/level"
import { stubTrainer } from "$lib/trainers/test/stubs"
import type { IncreaseHpEffect } from "../effects/IncreaseHp"
import type { NewTrainerPathEffect } from "../effects/NewTrainerPath"
import { TrainerPaths } from "$lib/trainers/paths/2024"
import { LevelUp } from "../LevelUp"

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
