import { writable } from "svelte/store"
import { TagFilter } from "$lib/poke5e/tags"

export const filterValue = writable("")
export const currentSorter = writable(() => 0)
export const pokemonTagFilter = TagFilter.store()

export const trainerListFilterValue = writable("")
export const trainerListSorter = writable(() => 0)
export const trainerListTagFilter = TagFilter.store()
