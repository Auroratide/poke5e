import { SpeciesIdentifier } from "$lib/creatures/species";
import { DataClass, type Data } from "$lib/DataClass";
import { EvolutionCondition, GenderCondition, LevelCondition, type EvolutionConditionType } from "./EvolutionCondition";
import { EvolutionEffect, type EvolutionEffectType } from "./EvolutionEffect";
import type { SingleEvolutionJsonResponse } from "./EvolutionJsonResponse";

export class Evolution extends DataClass<{
	from: Data<SpeciesIdentifier>,
	to: Data<SpeciesIdentifier>,
	conditions: EvolutionConditionType[],
	effects: EvolutionEffectType[],
}> {
	get from() { return new SpeciesIdentifier(this.data.from) }
	get to() { return new SpeciesIdentifier(this.data.to) }
	get conditions() { return this.data.conditions.map((it) => EvolutionCondition.fromType(it))}
	get effects() { return this.data.effects.map((it) => EvolutionEffect.fromType(it))}

	toString(): string {
		const conditions = this.conditions
		const effects = this.effects
		const genderCondition = conditions.find((it) => it instanceof GenderCondition)
		const levelCondition = conditions.find((it) => it instanceof LevelCondition)
		const otherconditions = conditions.filter((it) => it !== genderCondition && it !== levelCondition)

		return `${genderCondition ? genderCondition.toString() + " " : ""}{{pokemon:${this.data.from}}} can evolve into {{pokemon::${this.data.to}}} ${levelCondition ? levelCondition.toString() : ""}${otherconditions.length > 0 && levelCondition ? " " : ""}${otherconditions.map((it) => it.toString()).join(", ")}. When it evolves, ${effects.map((it) => it.toString()).join(", ")}.`
	}

	static fromJson(json: SingleEvolutionJsonResponse): Evolution {
		return new Evolution(json)
	}
}
