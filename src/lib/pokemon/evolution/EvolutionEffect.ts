export interface EvolutionEffect {
	toString: () => string
}

export const EvolutionEffect = {
	fromType(type: EvolutionEffectType): EvolutionEffect {
		switch (type.type) {
			case "asi": return new AsiEffect(type.value)
			case "special": return new SpecialEffect(type.value)
			default: return new SpecialEffect("")
		}
	}
}

export type EvolutionEffectType = {
	type: "asi",
	value: number,
} | {
	type: "special",
	value: string,
}

export class AsiEffect implements EvolutionEffect {
	constructor(readonly amount: number) {}

	toString(): string {
		return `its health increases by double its level, and it gains ${this.amount} points to add to its ability scores`
	}
}

export class SpecialEffect implements EvolutionEffect {
	constructor(readonly effect: string) {}

	toString(): string {
		return this.effect
	}
}
