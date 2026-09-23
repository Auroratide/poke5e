import { derived, writable, type Readable } from "svelte/store"
import { Item } from "./Item"
import { srdStore } from "$lib/site/stores"

const allItems = srdStore<Item[]>((client) =>
	client.items.all()
		.then((json) => json.values.map(Item.fromJson)),
)

/**
 * Unwraps the fetch state: every consumer only cares whether the list has
 * arrived, and renders a loader until it has.
 */
export const ItemStore: Readable<Item[] | undefined> = derived(allItems, (it) => it.result)

export const ItemFilterStore = writable("")
export const ItemSorterStore = writable(() => 0)
