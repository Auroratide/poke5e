import type { Move, Tm } from './types'
import { readable, writable } from 'svelte/store'
import { base } from '$app/paths'

export const moves = readable<Move[]>(undefined, (set) => {
    if (typeof window !== 'undefined') {
        fetch(`${base}/moves.json`)
            .then(res => res.json())
            .then(data => set(data.moves))
    }
})

export const tms = readable<Tm[]>(undefined, (set) => {
    if (typeof window !== 'undefined') {
        fetch(`${base}/tms.json`)
            .then(res => res.json())
            .then(data => set(data.items))
    }
})

export const filterValue = writable('')
export const currentSorter = writable(() => 0)
