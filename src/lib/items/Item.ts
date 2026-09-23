import { DataClass } from "$lib/DataClass"
import type { ItemJson } from "$lib/srd/items/schema"
import type { BetaDetails } from "$lib/site/beta"
import type { MarkdownString } from "$lib/ui/rendering"
import { capitalizeAll } from "$lib/utils/string"
import { includesSearch } from "$lib/utils/string"

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
	aliases?: string[],
	type: ItemType,
	cost: number | null,
	description: MarkdownString,
	media: {
		sprite?: string,
	},
	updated?: BetaDetails,
}> {
	get id() { return this.data.id }
	get name() { return this.data.name }
	get aliases() { return this.data.aliases ?? [] }
	get type() { return this.data.type }
	get cost() { return this.data.cost }
	get description() { return this.data.description }
	get media() { return this.data.media }
	get updated() { return this.data.updated }

	static fromJson(it: ItemJson): Item {
		return new Item({
			id: it.id,
			name: it.name,
			aliases: it.aliases,
			type: it.type,
			cost: it.cost,
			description: it.description,
			media: {
				sprite: it.media.sprite ?? undefined,
			},
			updated: it.updated,
		})
	}

	static matchNameOrType = (value: string) => (item: Item) =>
		includesSearch([item.name, ...item.aliases], value) ||
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
