import type { Pokemon } from './types'
import { readable } from 'svelte/store'

export const pokemon = readable<Pokemon[]>(undefined, (set) => {
    if (typeof window !== 'undefined') {
        fetch('/data/pokemon.json')
            .then(res => res.json())
            .then(data => set(data.items))
    }
})
