import type { Attributes, Skill } from './types'
import { modifierForScore } from './attributes'

export const proficiencyBonus = (level: number) => 2 + Math.floor((level - 1) / 4)

export const proficiencyModifier = (skill: Skill, attributes: Attributes, proficiencyBonus: number) => {
    switch (skill) {
        case 'athletics':
            return modifierForScore(attributes.str) + proficiencyBonus
        case 'acrobatics':
        case 'sleight of hand':
        case 'stealth':
            return modifierForScore(attributes.dex) + proficiencyBonus
        case 'arcana':
        case 'history':
        case 'investigation':
        case 'nature':
        case 'religion':
            return modifierForScore(attributes.int) + proficiencyBonus
        case 'animal handling':
        case 'insight':
        case 'medicine':
        case 'perception':
        case 'survival':
            return modifierForScore(attributes.wis) + proficiencyBonus
        case 'deception':
        case 'intimidation':
        case 'performance':
        case 'persuasion':
            return modifierForScore(attributes.cha) + proficiencyBonus
    }
}