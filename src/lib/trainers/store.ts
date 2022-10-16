import { writable } from 'svelte/store'

export const filterValue = writable('')
export const currentSorter = writable(() => 0)
