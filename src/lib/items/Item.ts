import { DataClass } from "$lib/DataClass"
import { capitalizeAll } from "$lib/utils/string"

export type ItemId = string

export const ItemTypes = ["pokeball", "medicine", "berry", "held item", "evolution", "trainer gear"] as const
export type ItemType = typeof ItemTypes[number]

type ItemGroup = {
	name: string,
	items: Item[],
}

const createGroup = (name: string): ItemGroup => ({ name, items: [] })

export class Item extends DataClass<{
	id: ItemId,
	name: string,
	type: ItemType,
	cost: number | null,
	description?: string[],
	media: {
		sprite?: string,
	},
}> {
	get id() { return this.data.id }
	get name() { return this.data.name }
	get type() { return this.data.type }
	get cost() { return this.data.cost }
	get description() { return this.data.description }
	get media() { return this.data.media }

	static matchNameOrType = (value: string) => (item: Item) =>
		item.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
			item.type.includes(value.toLocaleLowerCase())
	
	static groupByType(items: Item[], typeOrder: ItemType[]): ItemGroup[] {
		const fullOrder = typeOrder.concat(ItemTypes.filter((type) => !typeOrder.includes(type)))
	
		const groups = fullOrder.reduce((groups, type) => ({
			...groups,
			[type]: createGroup(capitalizeAll(type)),
		}), {} as Record<ItemType, ItemGroup>)
	
		items.forEach((item) => groups[item.type].items.push(item))
	
		return fullOrder.map((type) => groups[type])
	}
}
