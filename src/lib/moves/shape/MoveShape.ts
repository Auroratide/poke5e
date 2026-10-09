import type { MoveJson } from "$lib/srd/moves/schema"
import { m } from "$lib/site/i18n"

export type MoveShapeType = "cone" | "emanation" | "line" | "cube" | "cylinder" | "sphere"

export type MoveShape = {
	type: MoveShapeType,
	value: number,
	/**
	 * For shapes with multiple dimensions.
	 * - Cylinder: [height]
	 */
	otherValues?: number[],
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
		case "cylinder": return m.cylinder({ value: shape.value, height: shape.otherValues[0] ?? 0 })
		case "sphere": return m.sphere({ value: shape.value })
		default: return `${shape.value} ${shape.unit} ${shape.type}`
		}
	},
} as const
