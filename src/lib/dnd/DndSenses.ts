// units are in feet
export type DndSenses = {
	darkvision?: number,
	blindsight?: number,
	tremorsense?: number,
	truesight?: number,
}

export const DndSenseTypes = {
	Darkvision: "darkvision",
	Blindsight: "blindsight",
	Tremorsense: "tremorsense",
	Truesight: "truesight",
} as const satisfies Record<string, keyof DndSenses>
export type DndSenseType = typeof DndSenseTypes[keyof typeof DndSenseTypes]
