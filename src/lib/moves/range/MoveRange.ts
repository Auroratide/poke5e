import type { MoveJson } from "$lib/srd/moves/schema"
import { m } from "$lib/site/i18n"
import { MoveShape } from "../shape"

const MELEE_RANGE = 5

export type MoveRange = {
	type: "melee"
	reach?: {
		value: number,
		unit: "feet",
	}
} | {
	type: "distance",
	value: number,
	unit: "feet",
} | {
	type: "self",
} | {
	type: "varies",
}

type Distance = {
	value: number,
	unit: "feet",
}

const displayDistance = (distance: Distance): string => {
	switch (distance.unit) {
	case "feet": return m.feet({ value: distance.value })
	default: return `${distance.value} ${distance.unit}`
	}
}

export const MoveRange = {
	fromJson: (json: MoveJson["range"]): MoveRange => json,
	fromTypeAndValue: (type: string, value?: number): MoveRange | undefined => {
		if (type === "distance" && value != null) {
			return {
				type: "distance",
				value: value,
				unit: "feet",
			}
		}

		if (type === "melee" && value != null && value > MELEE_RANGE) {
			return {
				type: "melee",
				reach: {
					value: value,
					unit: "feet",
				},
			}
		}

		if (type === "melee" || type === "self" || type === "varies") {
			return { type }
		}

		return undefined
	},
	/**
	 * How far the move reaches, for the sake of filtering. A self move covers
	 * whatever its area of effect covers.
	 */
	asNumberOfFeet: (range: MoveRange, shape?: MoveShape): number => {
		switch (range.type) {
		case "melee": return range.reach?.value ?? 0
		case "distance": return range.value
		case "self": return shape?.value ?? 0
		default: return 0
		}
	},
	display: (range: MoveRange, shape?: MoveShape): string => {
		switch (range.type) {
		case "melee": return range.reach != null
			? [m.melee(), m.reach({ value: displayDistance(range.reach) })].join(", ")
			: m.melee()
		case "distance": return displayDistance(range)
		case "self": return shape != null
			? m.rangeWithShape({ range: m.self(), shape: MoveShape.display(shape) })
			: m.self()
		case "varies": return m.varies()
		default: return ""
		}
	},
	unitOptions: () => [ {
		value: "melee",
		name: m.melee(),
	}, {
		value: "distance",
		name: m.distance(),
	}, {
		value: "self",
		name: m.self(),
	} ],
}
