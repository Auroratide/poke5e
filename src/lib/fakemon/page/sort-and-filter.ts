import { writable } from "svelte/store"

export const fakemonListFilter = writable("")
export const fakemonListSorter = writable(() => 0)
