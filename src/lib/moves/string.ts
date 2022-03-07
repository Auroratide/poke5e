import type { Power } from './types'

export const powerAsString = (value: Power) => typeof value === 'string'
    ? value
    : value.join(', ')
