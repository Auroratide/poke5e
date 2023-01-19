import type { EvolutionCondition, EvolutionEffect } from "./types";

export const evolutionCondition = (c: EvolutionCondition): string => {
    switch (c.type) {
        case 'gender': return `A ${c.value}`
        case 'level': return `at level ${c.value} or above`
        case 'item': return `using a ${c.value}`
        case 'loyalty': return `with a loyalty of +${c.value} or higher`
        case 'move': return `while knowing {{move:${c.value}}}`
        case 'move-type': return `while knowing a ${c.value}-type move`
        case 'time': return `during the ${c.value}`
        case 'special': return c.value
    }
}

export const evolutionEffect = (e: EvolutionEffect): string => {
    switch (e.type) {
        case 'asi': return `its health increases by double its level, and it gains ${e.value} points to add to its ability scores`
        case 'special': return e.value
    }
}

export const evolution = (pokemonName: string, e: {
    id: string,
    conditions: EvolutionCondition[],
    effects: EvolutionEffect[],
}): string => {
    const genderCondition = e.conditions.find((it) => it.type === 'gender')
    const levelCondition = e.conditions.find((it) => it.type === 'level')
    const otherConditions = e.conditions.filter((it) => it.type !== 'gender' && it.type !== 'level')

    return `${genderCondition ? `${evolutionCondition(genderCondition)} ` : ''}${pokemonName} can evolve into {{pokemon:${e.id}}} ${levelCondition ? evolutionCondition(levelCondition) : ''}${otherConditions.length > 0 ? ' ' : ''}${otherConditions.map((it) => evolutionCondition(it)).join(', ')}. When it evolves, ${e.effects.map((it) => evolutionEffect(it)).join(', ')}.`
}
