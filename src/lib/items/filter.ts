import type { Item } from "./types"

export const matchNameOrType = (value: string) => (item: Pick<Item, "name" | "type">) =>
	item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
		item.type.includes(value.toLocaleLowerCase())