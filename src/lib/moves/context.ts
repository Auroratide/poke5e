import type { Move } from './types'
import { getContext, setContext } from 'svelte'

const key = Symbol()

export const getMoves = () => getContext(key) as Move[]
export const setMoves = (value: Move[]) => setContext(key, value)
