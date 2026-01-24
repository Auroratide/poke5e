import { SpeciesIdentifier } from "$lib/poke5e/species"
import { DataClass, type Data } from "$lib/DataClass"
import { EvolutionCondition, GenderCondition, LevelCondition, type EvolutionConditionType } from "./EvolutionCondition"
import { EvolutionBenefit, type EvolutionBenefitType } from "./EvolutionBenefit"
import type { SingleEvolutionJsonResponse } from "./EvolutionJsonResponse"
import { EvolutionForest } from "./EvolutionForest"

export type EvolutionId = string
let currentId = 0
export function tmpEvolutionId(): EvolutionId {
	return `TMP.${++currentId}`
}

export type ToStringOptions = {
	link?: "from" | "to",
}

export class Evolution extends DataClass<{
	id: EvolutionId,
	from: Data<SpeciesIdentifier>,
	to: Data<SpeciesIdentifier>,
	nonCanon?: boolean,
	conditions: EvolutionConditionType[],
	effects: EvolutionBenefitType[],
}> {
	get id() { return this.data.id }
	get from() { return new SpeciesIdentifier(this.data.from) }
	get to() { return new SpeciesIdentifier(this.data.to) }
	get nonCanon() { return this.data.nonCanon ?? false }
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

	toString({ link = "to" }: ToStringOptions = {}): string {
		const conditions = this.conditions
		const benefits = this.benefits
		const genderCondition = conditions.find((it) => it instanceof GenderCondition)
		const levelCondition = conditions.find((it) => it instanceof LevelCondition)
		const otherconditions = conditions.filter((it) => it !== genderCondition && it !== levelCondition)

		return `${genderCondition ? genderCondition.toString() + " " : ""}{{pokemon:${link === "from" ? ":" : ""}${this.data.from}}} can evolve into {{pokemon:${link === "to" ? ":" : ""}${this.data.to}}} ${levelCondition ? levelCondition.toString() : ""}${otherconditions.length > 0 && levelCondition ? " " : ""}${otherconditions.map((it) => it.toString()).join(", ")}.${benefits.length > 0 ? " When it evolves, " : ""}${benefits.map((it) => it.toString()).join(", ")}${benefits.length > 0 ? "." : ""}`
	}

	static fromJson(json: SingleEvolutionJsonResponse): Evolution {
		return new Evolution(json)
	}

	static readonly normalizeList = (allEvolutions: Data<Evolution>[]) => {
		const forest = new EvolutionForest(allEvolutions.map((it) => new Evolution(it)))

		return <T extends { id: string }>(pokemon: T): T & { evolution?: NormalizedEvolution } => {
			const id = SpeciesIdentifier.fromSpeciesName(pokemon.id)
			if (!forest.hasEvolutionTree(id)) return pokemon

			return {
				...pokemon,
				evolution: {
					stage: forest.currentStage(id),
					maxStage: forest.maxStage(id),
					to: forest.evolvesTo(id).map((it) => ({
						id: it.to.data,
						conditions: it.data.conditions,
						effects: it.data.effects,
					})),
					from: forest.evolvesFrom(id).map((it) => it.from.data),
				},
			}
		}
	}
}

type NormalizedEvolution = {
	stage: number,
	maxStage: number,
	to: {
		id: string,
		conditions: {
			type: string,
			value: unknown,
		}[],
		effects: {
			type: string,
			value: unknown,
		}[],
	}[],
	from: string[],
}
