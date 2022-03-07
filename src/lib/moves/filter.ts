import type { Move } from './types'

export const matchNameOrType = (value: string) => (move: Move) =>
    move.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
    move.type.includes(value.toLocaleLowerCase())