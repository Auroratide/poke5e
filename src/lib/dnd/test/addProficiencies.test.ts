import { test, expect } from "vitest"
import { addProficiencies, type Skill } from "../types"
import { stubSkillProficiencies } from "./stubs"

test("proficiencies are new", () => {
	const ranks = stubSkillProficiencies({
		athletics: 1,
	})

	const newSkills: Skill[] = ["acrobatics", "persuasion"]

	const result = addProficiencies(ranks, newSkills)

	expect(result).toEqual(stubSkillProficiencies({
		athletics: 1,
		acrobatics: 1,
		persuasion: 1,
	}))
})

test("proficiencies already exist", () => {
	const ranks = stubSkillProficiencies({
		athletics: 1,
	})

	const newSkills: Skill[] = ["athletics", "persuasion"]

	const result = addProficiencies(ranks, newSkills)

	expect(result).toEqual(stubSkillProficiencies({
		athletics: 1,
		persuasion: 1,
	}))
})

test("skills have expertise", () => {
	const ranks = stubSkillProficiencies({
		athletics: 2,
		acrobatics: 2,
	})

	const newSkills: Skill[] = ["athletics", "persuasion"]

	const result = addProficiencies(ranks, newSkills)

	expect(result).toEqual(stubSkillProficiencies({
		athletics: 2,
		acrobatics: 2,
		persuasion: 1,
	}))
})

test("adding nothing", () => {
	const ranks = stubSkillProficiencies({
		athletics: 1,
	})

	const newSkills: Skill[] = []

	const result = addProficiencies(ranks, newSkills)

	expect(result).toEqual(stubSkillProficiencies({
		athletics: 1,
	}))
})
