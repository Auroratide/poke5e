import { AbilityScoreImprovement } from "$lib/dnd/attributes"
import { DndFeats } from "$lib/dnd/feats"
import { HitDice } from "$lib/dnd/hit-dice"
import type { Level } from "$lib/dnd/level"
import type { Trainer } from "$lib/trainers/types"
import { AcquiredPathFeatureEffect } from "./effects/AcquiredPathFeature"
import { AdditionalSpecializationEffect } from "./effects/AdditionalSpecialization"
import { AsiOrFeatEffect } from "./effects/AsiOrFeat"
import { IncreaseHpEffect } from "./effects/IncreaseHp"
import { IncreaseLevelEffect } from "./effects/IncreaseLevel"
import { MaxSrIncreaseEffect } from "./effects/MaxSrIncrease"
import { NewTrainerPathEffect } from "./effects/NewTrainerPath"
import { PokeslotIncreaseEffect } from "./effects/PokeslotIncrease"

// const Level01 = () => []
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
	}),
	new MaxSrIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
	new PokeslotIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
	new AdditionalSpecializationEffect({}, {
		specialization: undefined,
		asi: undefined,
		skill: undefined,
	}),
	new AsiOrFeatEffect({
		options: DndFeats,
		pointsToSpend: 2,
		attributes: trainer.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
	new AcquiredPathFeatureEffect({
		currentLevel: trainer.level,
		path: trainer.path,
	}, {}),
]

export const TrainerLevelTable = {
	toLevel(level: Level) {
		console.log(level)
		return Level02
	},
} as const
