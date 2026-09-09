import { writable } from "svelte/store"
import { TagFilter } from "$lib/poke5e/tags"

export const fakemonListFilter = writable("")
export const fakemonListSorter = writable(() => 0)
export const fakemonListTagFilter = TagFilter.store()
