import type { MoveJson } from "$lib/srd/moves/schema"
import { m } from "$lib/site/i18n"

export type MoveDurationUnit = "instantaneous" | "round" | "minute" | "varies"

export type MoveDuration = {
	unit: MoveDurationUnit,
	value?: number,
	concentration: boolean,
}

const displayUnit = (duration: MoveDuration): string => {
	const value = duration.value ?? 0
	switch (duration.unit) {
	case "instantaneous": return m.instantaneous()
	case "round": return m.rounds({ value })
	case "minute": return m.minutes({ value })
	case "varies": return m.varies()
	default: return duration.unit
	}
}

export const MoveDuration = {
	fromJson: (json: MoveJson["duration"]): MoveDuration => ({
		unit: json.unit,
		value: json.value,
		concentration: json.concentration ?? false,
	}),
	fromTypeAndValue: (unit: string, value?: number, concentration?: boolean): MoveDuration | undefined => {
		if (unit === "round" || unit === "minute" && value != null) {
			return {
				unit: unit,
				value: value,
				concentration: concentration ?? false,
			}
		}

		if (unit === "instantaneous" || unit === "varies") {
			return { unit, concentration: concentration ?? false }
		}

		return undefined
	},
	display: (duration: MoveDuration): string => {
		const unit = displayUnit(duration)
		return duration.concentration ? m.concentrationUpTo({ value: unit }) : unit
	},
}
