import type { Pokemon } from "$lib/creatures/types"
import type { EvolutionCondition } from "./types"

export const hasEvolutionRequirement = (targetCondition: EvolutionCondition) => (pokemon: Pokemon) => pokemon.evolution?.to?.some((to) => to.conditions.some((con) => con.type === targetCondition.type && con.value === targetCondition.value)) ?? false