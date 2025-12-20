import type { PokemonSpecies, SpeciesIdentifier } from "$lib/poke5e/species"
import type { Level } from "$lib/dnd/level"
import type { TrainerPokemon } from "$lib/trainers/types"
import type { PokemonType } from "$lib/pokemon/types-2"
import * as list from "$lib/list"
import type { Skill } from "$lib/dnd/skills"
import { capitalize, uppercase } from "$lib/string"
import type { Attribute } from "$lib/dnd/attributes"
import type { AbilityId } from "$lib/pokemon/ability"

export interface EvolutionEffect {
	apply: (pokemon: TrainerPokemon) => TrainerPokemon
	toString: () => string
}

export const EvolutionEffect = {
	compute(pokemon: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies): EvolutionEffect[] {
		const effects = POSSIBLE_EFFECTS
			.map((effect) => effect.createIfApplicable(pokemon, evolveFrom, evolveTo))
			.filter((it) => it != null)

		return effects
	},
}

export class AbilityChangeEffect implements EvolutionEffect {
	constructor(
		private readonly oldAbility: AbilityId,
		private readonly newAbility: AbilityId,
	) {}

	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return {
			...pokemon,
			ability: this.newAbility,
		}
	}

	toString(): string {
		return `Ability will change from {{ability:${this.oldAbility}}} to {{ability:${this.newAbility}}}`
	}

	static createIfApplicable(pokemon: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies): AbilityChangeEffect | undefined {
		const original = evolveFrom.abilities.findIndex(pokemon.ability)
		if (!original.exists) return undefined
		
		const newAbility = evolveTo.abilities.findApplicableAbility(original)
		if (newAbility == null) return undefined
		if (pokemon.ability === newAbility.id) return undefined

		return new AbilityChangeEffect(pokemon.ability, newAbility.id)
	}
}

export class AddedAcEffect implements EvolutionEffect {
	constructor(private readonly gainedAc: number) {}

	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return {
			...pokemon,
			ac: pokemon.ac + this.gainedAc,
		}
	}

	toString(): string {
		return `AC will increase by ${this.gainedAc}`
	}

	static createIfApplicable(_: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies): AddedAcEffect | undefined {
		if (evolveFrom.data.ac === evolveTo.data.ac) return undefined

		return new AddedAcEffect(evolveTo.data.ac - evolveFrom.data.ac)
	}
}

export class AdditionalHpEffect implements EvolutionEffect {
	private readonly gainedHp: number
	constructor(level: Level) {
		this.gainedHp = level.data * 2
	}

	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return {
			...pokemon,
			hp: {
				current: pokemon.hp.max + this.gainedHp,
				max: pokemon.hp.max + this.gainedHp,
			},
		}
	}

	toString(): string {
		return `Max HP will increase by ${this.gainedHp}`
	}

	static createIfApplicable(pokemon: TrainerPokemon): AdditionalHpEffect | undefined {
		return new AdditionalHpEffect(pokemon.level)
	}
}

export class GainedProficienciesEffect implements EvolutionEffect {
	constructor(private readonly newProficiencies: Skill[]) {}

	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return {
			...pokemon,
			proficiencies: pokemon.proficiencies.addProficiencies(this.newProficiencies),
		}
	}

	toString(): string {
		return `Proficiency in ${this.newProficiencies.map(capitalize).join(", ")}`
	}

	static createIfApplicable(pokemon: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies): GainedProficienciesEffect | undefined {
		const difference = list.difference(evolveTo.skills.toList())(pokemon.proficiencies.toList())

		if (difference.length > 0) {
			return new GainedProficienciesEffect(difference)
		} else {
			return undefined
		}
	}
}

export class GainedSavingThrowsEffect implements EvolutionEffect {
	constructor(private readonly newSaves: Attribute[]) {}

	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return {
			...pokemon,
			savingThrows: pokemon.savingThrows.concat(this.newSaves),
		}
	}

	toString(): string {
		return `Proficiency in ${this.newSaves.map(uppercase).join(", ")}`
	}

	static createIfApplicable(pokemon: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies): GainedSavingThrowsEffect | undefined {
		const difference = list.difference(evolveTo.data.saves)(pokemon.savingThrows)

		if (difference.length > 0) {
			return new GainedSavingThrowsEffect(difference)
		} else {
			return undefined
		}
	}
}

export class NameChangeEffect implements EvolutionEffect {
	constructor(private readonly newName: string) {}

	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return {
			...pokemon,
			nickname: this.newName,
		}
	}

	toString(): string {
		return ""
	}

	static createIfApplicable(pokemon: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies): NameChangeEffect | undefined {
		if (pokemon.nickname !== evolveFrom.data.name) return undefined

		return new NameChangeEffect(evolveTo.data.name)
	}
}

export class SpeciesChangeEffect implements EvolutionEffect {
	constructor(private readonly newId: SpeciesIdentifier) {}

	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return {
			...pokemon,
			pokemonId: this.newId,
		}
	}

	toString(): string {
		return ""
	}

	static createIfApplicable(pokemon: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies): SpeciesChangeEffect | undefined {
		return new SpeciesChangeEffect(evolveTo.id)
	}
}

export class TypeChangeEffect implements EvolutionEffect {
	constructor(private readonly newType: PokemonType) {}

	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return {
			...pokemon,
			type: this.newType,
		}
	}

	toString(): string {
		return `Type will change to ${this.newType.toString()}`
	}

	static createIfApplicable(pokemon: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies): TypeChangeEffect | undefined {
		const typeWasCustomized = !pokemon.type.equivalent(evolveFrom.type)
		const typeWillChange = !evolveFrom.type.equivalent(evolveTo.type)

		if (typeWasCustomized || !typeWillChange) return undefined

		return new TypeChangeEffect(evolveTo.type)
	}
}

export class TypeCustomizedEffect implements EvolutionEffect {
	apply(pokemon: TrainerPokemon): TrainerPokemon {
		return pokemon
	}

	toString(): string {
		return "<strong>Note:</strong> This Pokémon's type will not change since its type was customized."
	}

	static createIfApplicable(pokemon: TrainerPokemon, evolveFrom: PokemonSpecies): TypeCustomizedEffect | undefined {
		const typeWasCustomized = !pokemon.type.equivalent(evolveFrom.type)

		return typeWasCustomized
			? new TypeCustomizedEffect()
			: undefined
	}
}

type EffectFactory = {
	createIfApplicable: (pokemon: TrainerPokemon, evolveFrom: PokemonSpecies, evolveTo: PokemonSpecies) => EvolutionEffect | undefined
}

const POSSIBLE_EFFECTS: readonly EffectFactory[] = [
	SpeciesChangeEffect,
	NameChangeEffect,
	TypeChangeEffect,
	AdditionalHpEffect,
	AddedAcEffect,
	GainedProficienciesEffect,
	GainedSavingThrowsEffect,
	AbilityChangeEffect,
	TypeCustomizedEffect,
]
