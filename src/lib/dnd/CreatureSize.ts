export const CreatureSizes = {
	Tiny: "tiny",
	Small: "small",
	Medium: "medium",
	Large: "large",
	Huge: "huge",
	Gargantuan: "gargantuan",
} as const
export type CreatureSize = typeof CreatureSizes[keyof typeof CreatureSizes]

export function isCreatureSize(size: string): size is CreatureSize {
	return (Object.values(CreatureSizes) as string[]).includes(size)
}
