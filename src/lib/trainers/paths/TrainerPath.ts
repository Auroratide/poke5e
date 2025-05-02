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
