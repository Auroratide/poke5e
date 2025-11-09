export interface EvolutionBenefit {
	toString: () => string
}

export const EvolutionBenefit = {
	fromType(type: EvolutionBenefitType): EvolutionBenefit {
		switch (type.type) {
		case "asi": return new AsiBenefit(type.value)
		case "special": return new SpecialBenefit(type.value)
		default: return new SpecialBenefit("")
		}
	},
}

export type EvolutionBenefitType = {
	type: "asi",
	value: number,
} | {
	type: "special",
	value: string,
}

export class AsiBenefit implements EvolutionBenefit {
	constructor(readonly amount: number) {}

	toString(): string {
		return `its health increases by double its level, and it gains ${this.amount} points to add to its ability scores`
	}
}

export class SpecialBenefit implements EvolutionBenefit {
	constructor(readonly effect: string) {}

	toString(): string {
		return this.effect
	}
}
