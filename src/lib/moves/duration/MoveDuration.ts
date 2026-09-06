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
	display: (duration: MoveDuration): string => {
		const unit = displayUnit(duration)
		return duration.concentration ? m.concentrationUpTo({ value: unit }) : unit
	},
}
