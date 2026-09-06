import type { MoveJson } from "$lib/srd/moves/schema"
import { m } from "$lib/site/i18n"

export type MoveShapeType = "cone" | "emanation" | "line" | "cube"

export type MoveShape = {
	type: MoveShapeType,
	value: number,
	unit: "feet",
}

export const MoveShape = {
	fromJson: (json: MoveJson["shape"] | undefined): MoveShape | undefined => json as MoveShape,
	display: (shape: MoveShape): string => {
		switch (shape.type) {
		case "cone": return m.cone({ value: shape.value })
		case "cube": return m.cube({ value: shape.value })
		case "emanation": return m.emanation({ value: shape.value })
		case "line": return m.line({ value: shape.value })
		default: return `${shape.value} ${shape.unit} ${shape.type}`
		}
	},
} as const
