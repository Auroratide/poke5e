import { describe, test, expect } from "vitest"
import { specializationDescription, skillModifiersFromSpecializations, hasSpecialization } from "./specializations"
import { stubNoSpecializations, stubSpecializations } from "./test/stubs"
import type { PokeType } from "$lib/pokemon/types"
import type { Skill } from "$lib/dnd/skills"

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
