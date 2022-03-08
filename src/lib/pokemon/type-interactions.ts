import type { PokeType } from './types'

const singleVulnerabilities: { [Property in PokeType]: PokeType[] } = {
    normal: ['fighting'],
    fighting: ['fairy', 'flying', 'psychic'],
    flying: ['electric', 'ice', 'rock'],
    poison: ['ground', 'psychic'],
    ground: ['grass', 'ice', 'water'],
    rock: ['fighting', 'grass', 'ground', 'steel', 'water'],
    bug: ['fire', 'flying', 'rock'],
    ghost: ['dark', 'ghost'],
    steel: ['fire', 'fighting', 'ground'],
    fire: ['ground', 'rock', 'water'],
    water: ['electric', 'grass'],
    grass: ['bug', 'fire', 'flying', 'ice', 'poison'],
    electric: ['ground'],
    psychic: ['bug', 'dark', 'ghost'],
    ice: ['fighting', 'fire', 'rock', 'steel'],
    dragon: ['dragon', 'fairy', 'ice'],
    dark: ['bug', 'fairy', 'fighting'],
    fairy: ['poison', 'steel'],
}

const singleResistances: { [Property in PokeType]: PokeType[] } = {
    normal: [],
    fighting: ['bug', 'rock', 'dark'],
    flying: ['bug', 'fighting', 'grass'],
    poison: ['fighting', 'poison', 'bug', 'grass', 'fairy'],
    ground: ['poison', 'rock'],
    rock: ['fire', 'flying', 'normal', 'poison'],
    bug: ['fighting', 'grass', 'ground'],
    ghost: ['bug', 'poison'],
    steel: ['bug', 'dragon', 'fairy', 'flying', 'grass', 'ice', 'normal', 'psychic', 'rock', 'steel'],
    fire: ['bug', 'fairy', 'fire', 'grass', 'ice', 'steel'],
    water: ['fire', 'ice', 'steel', 'water'],
    grass: ['electric', 'grass', 'ground', 'water'],
    electric: ['electric', 'flying', 'steel'],
    psychic: ['fighting', 'psychic'],
    ice: ['ice'],
    dragon: ['electric', 'fire', 'grass', 'water'],
    dark: ['dark', 'ghost'],
    fairy: ['bug', 'dark', 'fighting'],
}

const singleImmunities: { [Property in PokeType]: PokeType[] } = {
    normal: ['ghost'],
    fighting: [],
    flying: ['ground'],
    poison: [],
    ground: ['electric'],
    rock: [],
    bug: [],
    ghost: ['normal', 'fighting'],
    steel: ['poison'],
    fire: [],
    water: [],
    grass: [],
    electric: [],
    psychic: [],
    ice: [],
    dragon: [],
    dark: ['psychic'],
    fairy: ['dragon'],
}

const concatAll = (list: { [Property in PokeType]: PokeType[] }) => (all: PokeType[], type: PokeType) => all.concat(list[type])
const excluding = (list: PokeType[]) => (type: PokeType) => !list.includes(type)

// the algorithms here slightly rely on the fact that there are only single- or dual-types
export const vulnerabilities = (types: PokeType[]): Set<PokeType> =>
    new Set(types
        .reduce(concatAll(singleVulnerabilities), [])
        .filter(excluding(types.reduce(concatAll(singleResistances), [])))
        .filter(excluding(types.reduce(concatAll(singleImmunities), [])))
    )

export const resistances = (types: PokeType[]): Set<PokeType> => 
    new Set(types
        .reduce(concatAll(singleResistances), [])
        .filter(excluding(types.reduce(concatAll(singleVulnerabilities), [])))
        .filter(excluding(types.reduce(concatAll(singleImmunities), [])))
    )

export const immunities = (types: PokeType[]): Set<PokeType> =>
    new Set(types.reduce(concatAll(singleImmunities), []))