import type { Move } from './types'
import { readable } from 'svelte/store'

export const moves = readable<Move[]>(undefined, (set) => {
    if (typeof window !== 'undefined') {
        fetch('/data/moves.json')
            .then(res => res.json())
            .then(data => set(data.moves))
    }
})
