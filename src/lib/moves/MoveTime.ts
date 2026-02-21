import { m } from "$lib/site/i18n"

export type MoveTime = string

export const MoveTime = {
	options() {
		return [ {
			value: "action",
			name: () => m.action(),
		}, {
			value: "bonus action",
			name: () => m.bonusAction(),
		}, {
			value: "reaction",
			name: () => m.reaction(),
		} ]
	},

	equals(lhs: MoveTime, rhs: MoveTime): boolean {
		const pattern = /\d*\s*(action|bonus action|reaction)/
		const l = lhs.match(pattern)?.[1] ?? lhs
		const r = rhs.match(pattern)?.[1] ?? rhs
		return l === r
	},
} as const
