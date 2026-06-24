import { AbilityScoreImprovement } from "$lib/dnd/attributes"
import { DndFeats } from "$lib/dnd/feats"
import type { Level } from "$lib/dnd/level"
import type { Trainer } from "$lib/trainers/types"
import { get } from "svelte/store"
import { AcquiredPathFeatureEffect } from "./effects/AcquiredPathFeature"
import { AdditionalSpecializationEffect } from "./effects/AdditionalSpecialization"
import { AsiOrFeatEffect } from "./effects/AsiOrFeat"
import { IncreaseHpEffect } from "./effects/IncreaseHp"
import { IncreaseLevelEffect } from "./effects/IncreaseLevel"
import { MaxSrIncreaseEffect } from "./effects/MaxSrIncrease"
import { NewTrainerPathEffect } from "./effects/NewTrainerPath"
import { PokeslotIncreaseEffect } from "./effects/PokeslotIncrease"
import { trainerHitDiceSize } from "$lib/trainers/hit-dice"

const standardLevelUpEffects = (trainer: Trainer) => [
	new IncreaseLevelEffect({
		currentLevel: trainer.level,
	}, {}),
	new IncreaseHpEffect({
		hitDice: get(trainerHitDiceSize),
		attributes: trainer.attributes,
		currentHp: trainer.hp.max,
	}, {
		increaseAmount: 0,
	}),
]

const Level01 = () => []
const Level02 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new NewTrainerPathEffect({}, {
		path: undefined,
	}),
]
const Level03 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new MaxSrIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level04 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AsiOrFeatEffect({
		options: DndFeats,
		pointsToSpend: 2,
		attributes: trainer.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
]
const Level05 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AcquiredPathFeatureEffect({
		currentLevel: trainer.level,
		path: trainer.path,
	}, {}),
	new PokeslotIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level06 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new MaxSrIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level07 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AdditionalSpecializationEffect({}, {
		specialization: undefined,
		asi: undefined,
		skill: undefined,
	}),
]
const Level08 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AsiOrFeatEffect({
		options: DndFeats,
		pointsToSpend: 2,
		attributes: trainer.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
	new MaxSrIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level09 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AcquiredPathFeatureEffect({
		currentLevel: trainer.level,
		path: trainer.path,
	}, {}),
]
const Level10 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	// RESOLVE???
	new PokeslotIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level11 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new MaxSrIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level12 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AsiOrFeatEffect({
		options: DndFeats,
		pointsToSpend: 2,
		attributes: trainer.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
]
const Level13 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	// POKEMON TRACKER???
]
const Level14 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new MaxSrIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level15 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AcquiredPathFeatureEffect({
		currentLevel: trainer.level,
		path: trainer.path,
	}, {}),
	new PokeslotIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level16 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AsiOrFeatEffect({
		options: DndFeats,
		pointsToSpend: 2,
		attributes: trainer.attributes,
	}, {
		feat: undefined,
		pointsSpent: AbilityScoreImprovement.zero(),
	}),
]
const Level17 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new MaxSrIncreaseEffect({
		currentLevel: trainer.level,
	}, {}),
]
const Level18 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	new AdditionalSpecializationEffect({}, {
		specialization: undefined,
		asi: undefined,
		skill: undefined,
	}),
]
const Level19 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	// EPIC BOON???
]
const Level20 = (trainer: Trainer) => [
	...standardLevelUpEffects(trainer),
	// MASTER TRAINER???
]

const LEVELS = [
	Level01,
	Level02,
	Level03,
	Level04,
	Level05,
	Level06,
	Level07,
	Level08,
	Level09,
	Level10,
	Level11,
	Level12,
	Level13,
	Level14,
	Level15,
	Level16,
	Level17,
	Level18,
	Level19,
	Level20,
]

export const TrainerLevelTable = {
	toLevel(level: Level) {
		return LEVELS[level.data - 1]
	},
} as const
