import type { Pokemon } from './types'
import { readable, writable } from 'svelte/store'
import { assets } from '$app/paths'

export const pokemon = readable<Pokemon[]>(undefined, (set) => {
    if (typeof window !== 'undefined') {
        fetch(`${assets}/data/pokemon.json`)
            .then(res => res.json())
            .then(data => set(data.items))
    }
})

export const filterValue = writable('')
export const currentSorter = writable(() => 0)
