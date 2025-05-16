import { capitalizeAll } from "$lib/string"
import { ItemTypes, type Item, type ItemType } from "./types"

export type ItemGroup = {
	name: string,
	items: Item[],
}

const createGroup = (name: string): ItemGroup => ({ name, items: [] })

export function groupByType(items: Item[], typeOrder: ItemType[]): ItemGroup[] {
	const fullOrder = typeOrder.concat(ItemTypes.filter((type) => !typeOrder.includes(type)))

	const groups = fullOrder.reduce((groups, type) => ({
		...groups,
		[type]: createGroup(capitalizeAll(type)),
	}), {} as Record<ItemType, ItemGroup>)

	items.forEach((item) => groups[item.type].items.push(item))

	return fullOrder.map((type) => groups[type])
}
