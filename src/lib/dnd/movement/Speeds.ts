import { DistanceSet } from "../distance"

export type SpeedType = "walking" | "climbing" | "swimming" | "flying" | "hover" | "burrowing"

export class Speeds extends DistanceSet<SpeedType> {
	static readonly types = {
		Walking: "walking",
		Climbing: "climbing",
		Swimming: "swimming",
		Flying: "flying",
		Hover: "hover",
		Burrowing: "burrowing",
	} as const

	formatString = (type: SpeedType): string => `${this.data[type]}ft. ${type}`
}
