import type { ReferenceInfo } from "$lib/poke5e/reference"
import type { TrainerInfo } from "../types"
import { TrainerPaths } from "./2024"

export const TrainerFeatureLevelLandmarks = [2, 5, 9, 15] as const
export type TrainerFeatureLevelLandmark = 2 | 5 | 9 | 15

export type TrainerPath = {
	name: string,
	supplement?: ReferenceInfo,
	resource?: {
		name: string,
		acquiredAtLevel: TrainerFeatureLevelLandmark,
		max: (trainer: TrainerInfo) => number,
	},
	features: {
		level2: Omit<TrainerPathFeature, "name">,
		level5: TrainerPathFeature,
		level9: TrainerPathFeature,
		level15: TrainerPathFeature,
	},
}

export type TrainerPathFeature = {
	name: string,
	description: string[],
}

export function isStandardTrainerPath(pathName: string): boolean {
	return TrainerPaths.map((it) => it.name).includes(pathName)
}

export function isFeatureLandmarkLevel(level: number): level is TrainerFeatureLevelLandmark {
	return (TrainerFeatureLevelLandmarks as readonly number[]).includes(level)
}
