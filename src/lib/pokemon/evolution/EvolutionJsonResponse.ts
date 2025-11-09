import type { EvolutionConditionType } from "./EvolutionCondition"
import type { EvolutionBenefitType } from "./EvolutionBenefit"

export type SingleEvolutionJsonResponse = {
	from: string,
	to: string,
	conditions: EvolutionConditionType[],
	effects: EvolutionBenefitType[],
}

export type EvolutionJsonResponse = {
	items: SingleEvolutionJsonResponse[],
}