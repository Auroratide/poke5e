import type { MoveJson } from "$lib/srd/moves/schema"
import { m } from "$lib/site/i18n"

export type MoveTimeUnit = "action" | "bonus action" | "reaction"

export type MoveTime = {
	unit: MoveTimeUnit,
}

export const MoveTime = {
	fromJson: (json: MoveJson["time"]): MoveTime => ({
		unit: json.unit,
	}),
	options: (): { value: MoveTimeUnit, name: () => string }[] => [ {
		value: "action",
		name: () => m.action(),
	}, {
		value: "bonus action",
		name: () => m.bonusAction(),
	}, {
		value: "reaction",
		name: () => m.reaction(),
	} ],
	is: (time: MoveTime, unit: string): boolean => time.unit === unit,
	display: (time: MoveTime) => {
		switch (time.unit) {
		case "action": return m.action()
		case "bonus action": return m.bonusAction()
		case "reaction": return m.reaction()
		default: return time.unit
		}
	},
}
