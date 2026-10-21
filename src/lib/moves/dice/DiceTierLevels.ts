const LEVELS = [1, 5, 10, 17] as const

export const DiceTierLevels = {
	// TODO: eventually, will need edition as a parameter
	list: (): readonly number[] => LEVELS,
	tierIndex: (level: number): number => LEVELS.findLastIndex((it) => level >= it),
	isTierUp: (level: number): boolean => (LEVELS as readonly number[]).includes(level),
}
