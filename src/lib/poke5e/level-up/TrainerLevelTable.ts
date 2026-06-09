import { HitDice } from "$lib/dnd/hit-dice"
import type { Level } from "$lib/dnd/level"
import type { Trainer } from "$lib/trainers/types"
import { IncreaseHpEffect } from "./effects/IncreaseHp"
import { IncreaseLevelEffect } from "./effects/IncreaseLevel"
import { NewTrainerPathEffect } from "./effects/NewTrainerPath"

const Level01 = () => []
const Level02 = (trainer: Trainer) => [
	new IncreaseLevelEffect({
		currentLevel: trainer.level,
	}, {}),
	new IncreaseHpEffect({
		hitDice: new HitDice("d6"),
		attributes: trainer.attributes,
		currentHp: trainer.hp.max,
	}, {
		increaseAmount: 0,
	}),
	new NewTrainerPathEffect({}, {
		path: undefined,
	})
]

export const TrainerLevelTable = {
	toLevel(level: Level) {
		return Level02
	},
} as const
