import { TrainerPaths } from "./2024"

export const TrainerFeatureLevelLandmarks = [2, 5, 9, 15] as const
export type TrainerFeatureLevelLandmark = 2 | 5 | 9 | 15

export type TrainerPath = {
	name: string,
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
