import type { ChosenTrainerPath } from "../ChosenTrainerPath"

export function stubChosenTrainerPath(template: Partial<ChosenTrainerPath> = {}): ChosenTrainerPath {
	return {
		name: "Ace Trainer",
		resource: 2,
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
		...template,
	}
}
