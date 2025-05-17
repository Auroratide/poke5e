import { describe, test, expect } from "vitest"
import { specializationDescription } from "./specializations"

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
