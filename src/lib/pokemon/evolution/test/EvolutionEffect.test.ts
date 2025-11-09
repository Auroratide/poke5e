import { describe, test, expect, beforeEach } from "vitest"
import {
	AbilityChangeEffect,
	AddedAcEffect,
	AdditionalHpEffect,
	EvolutionEffect,
	GainedProficienciesEffect,
	GainedSavingThrowsEffect,
	NameChangeEffect,
	SpeciesChangeEffect,
	TypeChangeEffect,
	TypeCustomizedEffect,
} from "../EvolutionEffect"
import { stubTrainerPokemon } from "$lib/trainers/test/stubs"
import { Level } from "$lib/dnd/level"
import { stubPokemonSpecies } from "$lib/creatures/species/test/stubs"
import { PokemonType } from "$lib/pokemon/types-2"
import { stubSkillProficiencies } from "$lib/dnd/skills/test/stubs"
import type { PokemonSpecies } from "$lib/creatures/species"

let eevee: PokemonSpecies
let flareon: PokemonSpecies

beforeEach(() => {
	eevee = stubPokemonSpecies({
		id: "eevee",
		name: "Eevee",
		ac: 11,
		type: ["normal"],
		skills: stubSkillProficiencies({
			acrobatics: 1,
		}).data,
		saves: ["dex"],
		abilities: {
			normal: ["run-away", "adaptability"],
			hidden: ["anticipation"],
		},
	})
	
	flareon = stubPokemonSpecies({
		id: "flareon",
		name: "Flareon",
		ac: 15,
		type: ["fire"],
		skills: stubSkillProficiencies({
			acrobatics: 1,
			persuasion: 1,
			intimidation: 1,
		}).data,
		saves: ["dex", "cha"],
		abilities: {
			normal: ["flash-fire"],
			hidden: ["guts"],
		},
	})
})

describe("AbilityChangeEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			ability: eevee.abilities.data.normal[0],
		})

		const effect = AbilityChangeEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.ability).toEqual(flareon.abilities.data.normal[0])
		expect(effect.toString()).toEqual("Ability will change from {{ability:run-away}} to {{ability:flash-fire}}")
	})

	test("applicable: prevo has second ability, but evo does not", () => {
		const pokemon = stubTrainerPokemon({
			ability: eevee.abilities.data.normal[1],
		})

		const effect = AbilityChangeEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.ability).toEqual(flareon.abilities.data.normal[0])
		expect(effect.toString()).toEqual("Ability will change from {{ability:adaptability}} to {{ability:flash-fire}}")
	})

	test("applicable: hidden ability", () => {
		const pokemon = stubTrainerPokemon({
			ability: eevee.abilities.data.hidden[0],
		})

		const effect = AbilityChangeEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.ability).toEqual(flareon.abilities.data.hidden[0])
		expect(effect.toString()).toEqual("Ability will change from {{ability:anticipation}} to {{ability:guts}}")
	})

	test("applicable: evo does not have hidden ability", () => {
		const specialFlareon = flareon.copy({
			abilities: {
				normal: ["flash-fire"],
				hidden: [],
			},
		})

		const pokemon = stubTrainerPokemon({
			ability: eevee.abilities.data.hidden[0],
		})

		const effect = AbilityChangeEffect.createIfApplicable(pokemon, eevee, specialFlareon)
		const result = effect.apply(pokemon)

		expect(result.ability).toEqual(flareon.abilities.data.normal[0])
		expect(effect.toString()).toEqual("Ability will change from {{ability:anticipation}} to {{ability:flash-fire}}")
	})

	test("not applicable: evo does not have normal ability", () => {
		const specialFlareon = flareon.copy({
			abilities: {
				normal: [],
				hidden: ["guts"],
			},
		})

		const pokemon = stubTrainerPokemon({
			ability: eevee.abilities.data.normal[0],
		})

		const effect = AbilityChangeEffect.createIfApplicable(pokemon, eevee, specialFlareon)

		expect(effect).toBeUndefined()
	})

	test("not applicable: ability is already the same", () => {
		const pokemon = stubTrainerPokemon({
			ability: flareon.abilities.data.normal[0],
		})

		const effect = AbilityChangeEffect.createIfApplicable(pokemon, flareon, flareon)

		expect(effect).toBeUndefined()
	})

	test("not applicable: ability is not in prevo's list, thereby customized", () => {
		const pokemon = stubTrainerPokemon({
			ability: "something-else",
		})

		const effect = AbilityChangeEffect.createIfApplicable(pokemon, eevee, flareon)

		expect(effect).toBeUndefined()
	})
})

describe("AddedAcEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			ac: eevee.data.ac,
		})

		const effect = AddedAcEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.ac).toEqual(flareon.data.ac)
		expect(effect.toString()).toEqual("AC will increase by 4")
	})

	test("the pokemon's AC had been increased previously", () => {
		const pokemon = stubTrainerPokemon({
			ac: eevee.data.ac + 2,
		})

		const effect = AddedAcEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.ac).toEqual(flareon.data.ac + 2)
		expect(effect.toString()).toEqual("AC will increase by 4")
	})

	test("the pokemon's AC had been decreased previously", () => {
		const pokemon = stubTrainerPokemon({
			ac: eevee.data.ac - 2,
		})

		const effect = AddedAcEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.ac).toEqual(flareon.data.ac - 2)
		expect(effect.toString()).toEqual("AC will increase by 4")
	})

	test("not applicable: ac does not change", () => {
		const pokemon = stubTrainerPokemon({
			ac: flareon.data.ac,
		})

		// from flareon to flareon, to simulate AC does not increase on evolution
		const effect = AddedAcEffect.createIfApplicable(pokemon, flareon, flareon)

		expect(effect).toBeUndefined()
	})
})

describe("AdditionalHpEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			level: new Level(7),
			hp: {
				current: 10,
				max: 20,
			},
		})

		const effect = AdditionalHpEffect.createIfApplicable(pokemon)
		const result = effect.apply(pokemon)

		expect(result.hp).toEqual({
			current: 34,
			max: 34,
		})
		expect(effect.toString()).toEqual("Max HP will increase by 14")
	})
})

describe("GainedProficienciesEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			proficiencies: eevee.skills,
		})

		const effect = GainedProficienciesEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.proficiencies).toEqualData(flareon.skills)
		expect(effect.toString()).toEqual("Proficiency in Intimidation, Persuasion")
	})

	test("applicable: had other proficiencies too", () => {
		const pokemon = stubTrainerPokemon({
			proficiencies: stubSkillProficiencies({
				...eevee.skills.data,
				history: 1,
			}),
		})

		const effect = GainedProficienciesEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.proficiencies).toEqualData(stubSkillProficiencies({
			...flareon.skills.data,
			history: 1,
		}))
		expect(effect.toString()).toEqual("Proficiency in Intimidation, Persuasion")
	})

	test("not applicable: pokemon already had same skills", () => {
		const pokemon = stubTrainerPokemon({
			proficiencies: flareon.skills,
		})

		const effect = GainedProficienciesEffect.createIfApplicable(pokemon, eevee, flareon)

		expect(effect).toBeUndefined()
	})
})

describe("GainedSavingThrowsEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			savingThrows: eevee.data.saves,
		})

		const effect = GainedSavingThrowsEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.savingThrows).toEqual(flareon.data.saves)
		expect(effect.toString()).toEqual("Proficiency in CHA")
	})

	test("applicable: had other proficiencies too", () => {
		const pokemon = stubTrainerPokemon({
			savingThrows: ["str", ...eevee.data.saves],
		})

		const effect = GainedSavingThrowsEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.savingThrows).toEqual(["str", ...flareon.data.saves])
		expect(effect.toString()).toEqual("Proficiency in CHA")
	})

	test("not applicable: pokemon already had same saves", () => {
		const pokemon = stubTrainerPokemon({
			savingThrows: flareon.data.saves,
		})

		const effect = GainedSavingThrowsEffect.createIfApplicable(pokemon, eevee, flareon)

		expect(effect).toBeUndefined()
	})
})

describe("NameChangeEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			nickname: eevee.data.name,
		})

		const effect = NameChangeEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.nickname).toEqualData(flareon.data.name)
		expect(effect.toString()).toEqual("") // no display for this
	})

	test("not applicable: pokemon has a nickname", () => {
		const pokemon = stubTrainerPokemon({
			nickname: "Ganymede",
		})

		const effect = NameChangeEffect.createIfApplicable(pokemon, eevee, flareon)

		expect(effect).toBeUndefined()
	})
})

describe("SpeciesChangeEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			pokemonId: eevee.id,
		})

		const effect = SpeciesChangeEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.pokemonId).toEqualData(flareon.id)
		expect(effect.toString()).toEqual("") // no display for this
	})
})

describe("TypeChangeEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			type: eevee.type,
		})

		const effect = TypeChangeEffect.createIfApplicable(pokemon, eevee, flareon)
		const result = effect.apply(pokemon)

		expect(result.type).toEqualData(flareon.type)
		expect(effect.toString()).toEqual("Type will change to Fire")
	})

	test("not applicable: pokemon had a customized type", () => {
		const pokemon = stubTrainerPokemon({
			type: new PokemonType(["normal", "fairy"]),
		})

		const effect = TypeChangeEffect.createIfApplicable(pokemon, eevee, flareon)

		expect(effect).toBeUndefined()
	})

	test("not applicable: type does not change", () => {
		const pokemon = stubTrainerPokemon({
			type: flareon.type,
		})

		// from flareon to flareon, to simulate type does not change on evolution
		const effect = TypeChangeEffect.createIfApplicable(pokemon, flareon, flareon)

		expect(effect).toBeUndefined()
	})
})

describe("TypeCustomizedEffect", () => {
	test("applicable", () => {
		const pokemon = stubTrainerPokemon({
			type: new PokemonType(["water"]),
		})

		const effect = TypeCustomizedEffect.createIfApplicable(pokemon, eevee)
		const result = effect.apply(pokemon)

		expect(result.type).toEqualData(new PokemonType(["water"]))
		expect(effect.toString()).toEqual("<strong>Note:</strong> This Pokémon's type will not change since its type was customized.")
	})

	test("not applicable: pokemon type not customizde", () => {
		const pokemon = stubTrainerPokemon({
			type: eevee.type,
		})

		const effect = TypeCustomizedEffect.createIfApplicable(pokemon, eevee)

		expect(effect).toBeUndefined()
	})
})

describe("EvolutionEffect", () => {
	test("creates only applicable effects", () => {
		const pokemon = stubTrainerPokemon({
			pokemonId: eevee.id, // will change
			nickname: "Ganymede", // will NOT change
			type: eevee.type, // will change
			ability: eevee.abilities.data.normal[0], // will change
			ac: eevee.data.ac, // will change
			level: new Level(7), // will affect HP
			proficiencies: flareon.skills, // will NOT change
			savingThrows: eevee.data.saves, // will change
		})

		const effects = EvolutionEffect.compute(pokemon, eevee, flareon)

		expect(effects.length).toEqual(6)
	})
})
