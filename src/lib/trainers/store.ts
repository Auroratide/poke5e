import { writable } from 'svelte/store'

export const filterValue = writable('')
export const currentSorter = writable(() => 0)

export const trainerListFilterValue = writable('')
export const trainerListSorter = writable(() => 0)
