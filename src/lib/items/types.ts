export type ItemType = "berry" | "medicine" | "pokeball"

export type Item = {
	id: string,
	name: string,
	type: ItemType,
	cost: number,
	description: string[],
}
