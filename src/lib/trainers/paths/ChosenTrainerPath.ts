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
