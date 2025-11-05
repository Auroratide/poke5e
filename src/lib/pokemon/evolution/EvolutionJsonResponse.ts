import type { EvolutionConditionType } from "./EvolutionCondition"
import type { EvolutionEffectType } from "./EvolutionEffect"

export type SingleEvolutionJsonResponse = {
	from: string,
	to: string,
	conditions: EvolutionConditionType[],
	effects: EvolutionEffectType[],
}

export type EvolutionJsonResponse = {
	items: SingleEvolutionJsonResponse[],
}