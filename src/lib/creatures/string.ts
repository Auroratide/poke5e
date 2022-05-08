import type { PokeType } from '../pokemon/types'

/**
 * Gender takes a ratio format:
 * * F:M ratio (ex: 7:1 means 7/8 pokemon are female)
 * * 0:0 means unknown or genderless
 * * So far, no pokemon has a third gender
 */
export const gender = (value: string): string => {
    if (value === '0:0') {
        return 'genderless'
    } else {
        const [ f, m ] = value.split(':')
        return `${f} F : ${m} M`
    }
}

/**
 * In the domain, the only fractional values are 1/8, 1/4, and 1/2
 */
export const sr = (value: number): string => {
    if (value <= 0.125) {
        return '1/8'
    } else if (value <= 0.25) {
        return '1/4'
    } else if (value <= 0.5) {
        return '1/2'
    } else {
        return Math.round(value).toString()
    }
}

export const speed = ({ type, value }: { type: string, value: number}): string => {
    return `${value}ft. ${type}`
}

export const sense = ({ type, value }: { type: string, value: number}): string => {
    return `${type} ${value}ft.`
}

/**
 * Pokemon can only have single- or dual-typing
 */
export const type = (value: PokeType[]): string => {
    return value.join('/')
}

export const pokeIndex = (value: number): string =>
    `#${value.toString().padStart(3, '0')}`

export const list = (value: string[]): string =>
    value.length > 0 ? value.join(', ') : 'none'