import type { Item } from "$lib/items/types"
import type { HeldItem } from "$lib/trainers/types"
import HeldItemIcon from "$lib/items/held-item-icon.png"

export type HeldItemDetails = {
	name: string,
	description: string,
	media: {
		sprite?: string,
	},
}

export function getItemDetails<T extends HeldItem>(item: T, standardItems: Item[] | undefined): (T & HeldItemDetails) | undefined {
	if (standardItems == null || standardItems.length === 0) {
		return undefined
	}

	if (item.type === "standard") {
		const standardItem = standardItems.find((it) => it.id === item.itemId)
		return {
			...item,
			name: standardItem?.name ?? item.itemId,
			description: standardItem?.description?.join(" "),
			media: standardItem?.media ?? {
				sprite: HeldItemIcon,
			},
		}
	} else {
		return {
			...item,
			media: {
				sprite: HeldItemIcon,
			},
		} as T & HeldItemDetails
	}
}
