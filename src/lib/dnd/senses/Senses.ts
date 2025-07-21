import { DistanceSet } from "../distance"

export type SenseType = "darkvision" | "blindsight" | "tremorsense" | "truesight"

export class Senses extends DistanceSet<SenseType> {
	static readonly types = {
		Darkvision: "darkvision",
		Blindsight: "blindsight",
		Tremorsense: "tremorsense",
		Truesight: "truesight",
	} as const
}
