import type { Attribute, Attributes, Skill } from './types'
import { modifierForScore } from './attributes'

export const skillList: {
    name: Skill,
    attribute: Attribute,
}[] = [ {
    name: 'athletics',
    attribute: 'str',
}, {
    name: 'acrobatics',
    attribute: 'dex',
}, {
    name: 'sleight of hand',
    attribute: 'dex',
}, {
    name: 'stealth',
    attribute: 'dex',
}, {
    name: 'arcana',
    attribute: 'int',
}, {
    name: 'history',
    attribute: 'int',
}, {
    name: 'investigation',
    attribute: 'int',
}, {
    name: 'nature',
    attribute: 'int',
}, {
    name: 'religion',
    attribute: 'int',
}, {
    name: 'animal handling',
    attribute: 'wis',
}, {
    name: 'insight',
    attribute: 'wis',
}, {
    name: 'medicine',
    attribute: 'wis',
}, {
    name: 'perception',
    attribute: 'wis',
}, {
    name: 'survival',
    attribute: 'wis',
}, {
    name: 'deception',
    attribute: 'cha',
}, {
    name: 'intimidation',
    attribute: 'cha',
}, {
    name: 'performance',
    attribute: 'cha',
}, {
    name: 'persuasion',
    attribute: 'cha',
} ]

export const proficiencyBonus = (level: number) => 2 + Math.floor((level - 1) / 4)

export const proficiencyModifier = (skill: Skill, attributes: Attributes, proficiencyBonus: number) => {
    const relevantAttribute = skillList.find(it => it.name === skill).attribute

    return modifierForScore(attributes[relevantAttribute]) + proficiencyBonus
}