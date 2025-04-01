export const ItemTypes = ["pokeball", "medicine", "berry", "held item", "evolution"] as const
export type ItemType = typeof ItemTypes[number]

export type Item = {
	id: string,
	name: string,
	type: ItemType,
	cost: number | null,
	// when null, the item isn't ready for 5e yet
	description?: string[],
	media: {
		sprite?: string,
	},
}
