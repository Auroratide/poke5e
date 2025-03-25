export type ItemType = "berry" | "medicine" | "pokeball" | "evolution" | "held item"

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
