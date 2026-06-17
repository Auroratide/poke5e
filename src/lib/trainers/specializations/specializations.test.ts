import { describe, test, expect } from "vitest"
import { specializationDescription, skillModifiersFromSpecializations, hasSpecialization, applySpecialization } from "./specializations"
import { stubNoSpecializations, stubSpecializations } from "./test/stubs"
import type { Skill } from "$lib/dnd/skills"
import type { PokeType } from "$lib/pokemon/types"
import { stubTrainer } from "../test/stubs"
import { SpecializationList } from "./2024/SpecializationList"
import { SpecializationList as SpecializationList2018 } from "./2018/SpecializationList"
import { stubSkillProficiencies } from "$lib/dnd/skills/test/stubs"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"

describe("specializationDescription", () => {
	test("single ASI", () => {
		const result = specializationDescription({
			id: "specialization",
			name: "Specialization",
			type: "normal",
			effect: [ {
				type: "asi",
				value: ["str"],
			} ],
		})

		expect(result).toEqual("Increase your STR by 1, to a maximum of 20. Add a +1 bonus to all skill checks made by any of your Normal-type Pokémon.")
	})

	test("multiple ASI", () => {
		const result = specializationDescription({
			id: "specialization",
			name: "Specialization",
			type: "normal",
			effect: [ {
				type: "asi",
				value: ["str", "dex", "con"],
			} ],
		})

		expect(result).toEqual("Increase your STR, DEX, or CON by 1, to a maximum of 20. Add a +1 bonus to all skill checks made by any of your Normal-type Pokémon.")
	})

	test("single proficiency", () => {
		const result = specializationDescription({
			id: "specialization",
			name: "Specialization",
			type: "normal",
			effect: [ {
				type: "proficiency",
				value: ["athletics"],
			} ],
		})

		expect(result).toEqual("You gain proficiency in Athletics, or if you already had proficiency, you gain expertise. Add a +1 bonus to all skill checks made by any of your Normal-type Pokémon.")
	})

	test("multiple proficiencies", () => {
		const result = specializationDescription({
			id: "specialization",
			name: "Specialization",
			type: "normal",
			effect: [ {
				type: "proficiency",
				value: ["athletics", "acrobatics", "stealth"],
			} ],
		})

		expect(result).toEqual("You gain proficiency in Athletics, Acrobatics, or Stealth, or if you already had proficiency, you gain expertise. Add a +1 bonus to all skill checks made by any of your Normal-type Pokémon.")
	})

	test("other", () => {
		const result = specializationDescription({
			id: "specialization",
			name: "Specialization",
			type: "normal",
			effect: [ {
				type: "other",
				value: "You become buff.",
			} ],
		})

		expect(result).toEqual("You become buff. Add a +1 bonus to all skill checks made by any of your Normal-type Pokémon.")
	})
})

describe("skillModifiersFromSpecializations", () => {
	const eachModifier = (modifiers: Record<Skill, number>): number => {
		const values = Object.values(modifiers)

		expect(Math.max(...values)).toEqual(Math.min(...values))

		return Math.max(...values)
	}

	test("no specializations", () => {
		const type: PokeType[] = ["normal"]
		const specializations = stubSpecializations({})

		const result = skillModifiersFromSpecializations(specializations, type)

		expect(eachModifier(result)).toEqual(0)
	})

	test("matching specialization", () => {
		const type: PokeType[] = ["normal"]
		const specializations = stubSpecializations({
			normal: 1,
		})

		const result = skillModifiersFromSpecializations(specializations, type)

		expect(eachModifier(result)).toEqual(1)
	})

	test("non-matching specialization", () => {
		const type: PokeType[] = ["normal"]
		const specializations = stubSpecializations({
			psychic: 1,
		})

		const result = skillModifiersFromSpecializations(specializations, type)

		expect(eachModifier(result)).toEqual(0)
	})

	test("multiple specializations and multiple types", () => {
		const type: PokeType[] = ["normal", "psychic"]
		const specializations = stubSpecializations({
			normal: 1,
			psychic: 1,
		})

		const result = skillModifiersFromSpecializations(specializations, type)

		expect(eachModifier(result)).toEqual(2)
	})

	test("level 2+ specialization", () => {
		const type: PokeType[] = ["normal"]
		const specializations = stubSpecializations({
			normal: 3,
		})

		const result = skillModifiersFromSpecializations(specializations, type)

		expect(eachModifier(result)).toEqual(3)
	})
})

describe("hasSpecialization", () => {
	test("has specialization", () => {
		const specializations = stubSpecializations({
			normal: 1,
		})

		const result = hasSpecialization(specializations)

		expect(result).toBe(true)
	})

	test("does not have specialization", () => {
		const specializations = stubNoSpecializations()

		const result = hasSpecialization(specializations)

		expect(result).toBe(false)
	})
})

describe("applySpecialization", () => {
	test("new specialization", () => {
		// given
		const trainer = stubTrainer({
			specializations: stubSpecializations({
				normal: 1,
			}),
		})

		const specialization = SpecializationList.fighting
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then
		expect(result.specializations.normal).toEqual(1)
		expect(result.specializations.fighting).toEqual(1)
	})

	test("already had specialization", () => {
		// given
		const trainer = stubTrainer({
			specializations: stubSpecializations({
				fighting: 1,
			}),
		})

		const specialization = SpecializationList.fighting
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then
		expect(result.specializations.fighting).toEqual(2)
	})

	test("specialization at max allowable", () => {
		// given
		const trainer = stubTrainer({
			specializations: stubSpecializations({
				fighting: 5,
			}),
		})

		const specialization = SpecializationList.fighting
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then
		expect(result.specializations.fighting).toEqual(5)
	})

	test("asi applied to trainer", () => {
		// given
		const trainer = stubTrainer({
			attributes: stubAttributes({
				cha: 10,
			}),
		})

		const specialization = SpecializationList.normal
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then
		expect(result.attributes.cha.score).toEqual(11)
	})

	test("asi already at 20", () => {
		// given
		const trainer = stubTrainer({
			attributes: stubAttributes({
				cha: 20,
			}),
		})

		const specialization = SpecializationList.normal
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then
		expect(result.attributes.cha.score).toEqual(20)
	})

	test("skill assigned to trainer", () => {
		// given
		const trainer = stubTrainer({
			proficiencies: stubSkillProficiencies({
				athletics: 0,
			}),
		})

		const specialization = SpecializationList.fighting
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then
		expect(result.proficiencies.isProficient("athletics")).toBe(true)
	})

	test("already had proficiency", () => {
		// given
		const trainer = stubTrainer({
			proficiencies: stubSkillProficiencies({
				athletics: 1,
			}),
		})

		const specialization = SpecializationList.fighting
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then
		expect(result.proficiencies.isExpert("athletics")).toBe(true)
	})

	test("already had expertise", () => {
		// given
		const trainer = stubTrainer({
			proficiencies: stubSkillProficiencies({
				athletics: 2,
			}),
		})

		const specialization = SpecializationList.fighting
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then
		expect(result.proficiencies.data.athletics).toEqual(2)
	})

	test("asi chosen among multiple choices", () => {
		// given
		const trainer = stubTrainer({
			attributes: stubAttributes({
				dex: 10,
				cha: 10,
			}),
		})

		const specialization = SpecializationList2018.normal
		
		// when
		const result = applySpecialization(trainer, specialization, {
			asi: "dex",
		})

		// then
		expect(result.attributes.dex.score).toEqual(11)
		expect(result.attributes.cha.score).toEqual(10)
	})

	test("skill chosen among multiple choices", () => {
		// given
		const trainer = stubTrainer({
			proficiencies: stubSkillProficiencies({
				deception: 0,
				stealth: 0,
			}),
		})

		const specialization = SpecializationList2018.dark
		
		// when
		const result = applySpecialization(trainer, specialization, {
			skill: "deception",
		})

		// then
		expect(result.proficiencies.isProficient("deception")).toBe(true)
		expect(result.proficiencies.isProficient("stealth")).toBe(false)
	})

	test("multiple choices but none were chosen", () => {
		// given
		const trainer = stubTrainer({
			attributes: stubAttributes({
				str: 10,
				dex: 10,
				cha: 10,
			}),
		})

		const specialization = SpecializationList2018.normal
		
		// when
		const result = applySpecialization(trainer, specialization, {})

		// then: first in list arbitrarily chosen
		expect(result.attributes.str.score).toEqual(11)
		expect(result.attributes.dex.score).toEqual(10)
		expect(result.attributes.cha.score).toEqual(10)
	})
})