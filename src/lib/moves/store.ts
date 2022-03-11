import type { Move } from './types'
import { readable, writable } from 'svelte/store'
import { assets } from '$app/paths'

export const moves = readable<Move[]>(undefined, (set) => {
    if (typeof window !== 'undefined') {
        fetch(`${assets}/data/moves.json`)
            .then(res => res.json())
            .then(data => set(data.moves))
    }
})

export const filterValue = writable('')
export const currentSorter = writable(() => 0)
