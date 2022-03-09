import type { Pokemon } from './types'
import { readable } from 'svelte/store'
import { assets } from '$app/paths'

export const pokemon = readable<Pokemon[]>(undefined, (set) => {
    if (typeof window !== 'undefined') {
        fetch(`${assets}/data/pokemon.json`)
            .then(res => res.json())
            .then(data => set(data.items))
    }
})
