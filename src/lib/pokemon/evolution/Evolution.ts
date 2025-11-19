import { SpeciesIdentifier } from "$lib/creatures/species"
import { DataClass, type Data } from "$lib/DataClass"
import { EvolutionCondition, GenderCondition, LevelCondition, type EvolutionConditionType } from "./EvolutionCondition"
import { EvolutionBenefit, type EvolutionBenefitType } from "./EvolutionBenefit"
import type { SingleEvolutionJsonResponse } from "./EvolutionJsonResponse"

export type EvolutionId = string
let currentId = 0
export function tmpEvolutionId(): EvolutionId {
	return `TMP.${++currentId}`
}

export class Evolution extends DataClass<{
	id: EvolutionId,
	from: Data<SpeciesIdentifier>,
	to: Data<SpeciesIdentifier>,
	conditions: EvolutionConditionType[],
	effects: EvolutionBenefitType[],
}> {
	get from() { return new SpeciesIdentifier(this.data.from) }
	get to() { return new SpeciesIdentifier(this.data.to) }
	get conditions() { return this.data.conditions.map((it) => EvolutionCondition.fromType(it))}
	get benefits() { return this.data.effects.map((it) => EvolutionBenefit.fromType(it))}

	isSame(other: Evolution): boolean {
		return this.data.from === other.data.from && this.data.to === other.data.to
	}

	isDraft(): boolean {
		return this.data.id.startsWith("TMP.")
	}

	hasCondition(condition: EvolutionConditionType): boolean {
		return this.data.conditions.some((it) => it.type === condition.type && it.value === condition.value)
	}

	toString(): string {
		const conditions = this.conditions
		const benefits = this.benefits
		const genderCondition = conditions.find((it) => it instanceof GenderCondition)
		const levelCondition = conditions.find((it) => it instanceof LevelCondition)
		const otherconditions = conditions.filter((it) => it !== genderCondition && it !== levelCondition)

		return `${genderCondition ? genderCondition.toString() + " " : ""}{{pokemon:${this.data.from}}} can evolve into {{pokemon::${this.data.to}}} ${levelCondition ? levelCondition.toString() : ""}${otherconditions.length > 0 && levelCondition ? " " : ""}${otherconditions.map((it) => it.toString()).join(", ")}. When it evolves, ${benefits.map((it) => it.toString()).join(", ")}.`
	}

	static fromJson(json: SingleEvolutionJsonResponse): Evolution {
		return new Evolution(json)
	}
}
