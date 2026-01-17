import { readable, writable } from "svelte/store"
import { resolve } from "$app/paths"
import { Item } from "./Item"
import type { Data } from "$lib/DataClass"
import { Url } from "$lib/site/url"

export const ItemStore = readable<Item[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(Url.api.items())
			.then(res => res.json())
			.then((data) => data.items)
			.then((items: Data<Item>[]) => items.map((it) => new Item(it)))
			.then((items) => set(items))
	}
})

export const ItemFilterStore = writable("")
export const ItemSorterStore = writable(() => 0)
