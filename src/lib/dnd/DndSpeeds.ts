// units are in feet
export type DndSpeeds = {
	walking?: number,
	climbing?: number,
	swimming?: number,
	flying?: number,
	hover?: number,
	burrowing?: number,
}

export const DndSpeedTypes = {
	Walking: "walking",
	Climbing: "climbing",
	Swimming: "swimming",
	Flying: "flying",
	Hover: "hover",
	Burrowing: "burrowing",
} as const satisfies Record<string, keyof DndSpeeds>
export type DndSpeedType = typeof DndSpeedTypes[keyof typeof DndSpeedTypes]
