import type { Item } from "./types"
import { readable, writable } from "svelte/store"
import { base } from "$app/paths"

export const items = readable<Item[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/items.json`)
			.then(res => res.json())
			.then(data => set(data.items))
	}
})

export const filterValue = writable("")
export const currentSorter = writable(() => 0)
