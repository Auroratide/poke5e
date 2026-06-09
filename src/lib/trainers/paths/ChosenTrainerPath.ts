import type { TrainerInfo } from "../types"
import type { TrainerPath } from "./TrainerPath"

export type ChosenTrainerPath = {
	name: string,
	resource: number,
	customFeatures: {
		level2: Omit<CustomTrainerPathFeature, "name">,
		level5: CustomTrainerPathFeature,
		level9: CustomTrainerPathFeature,
		level15: CustomTrainerPathFeature,
	}
}

export type CustomTrainerPathFeature = {
	name: string,
	description: string,
}

export function convertToChosenTrainerPath(path: TrainerPath, trainer: TrainerInfo): ChosenTrainerPath {
	return {
		name: path.name,
		resource: path.resource?.max(trainer) ?? 0,
		customFeatures: {
			level2: {
				description: "",
			},
			level5: {
				name: "",
				description: "",
			},
			level9: {
				name: "",
				description: "",
			},
			level15: {
				name: "",
				description: "",
			},
		},
	}
}

export function createEmptyChosenTrainerPath(): ChosenTrainerPath {
	return {
		name: "",
		resource: 0,
		customFeatures: {
			level2: {
				description: "",
			},
			level5: {
				name: "",
				description: "",
			},
			level9: {
				name: "",
				description: "",
			},
			level15: {
				name: "",
				description: "",
			},
		},
	}
}
