import type { Level } from "$lib/dnd/level"

export const Pokeslots = {
	maxAllowed(level: Level): number {
		return Math.min(6, 3 + Math.floor(level.data / 5))
	},
} as const
