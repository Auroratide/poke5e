import { describe, test, expect } from "vitest"
import { stubSkillProficiencies } from "./stubs"
import type { Skill } from "../SkillRanks"

describe("addProficiencies", () => {
	test("proficiencies are new", () => {
		const ranks = stubSkillProficiencies({
			athletics: 1,
		})
	
		const newSkills: Skill[] = ["acrobatics", "persuasion"]
	
		const result = ranks.addProficiencies(newSkills)
	
		expect(result).toEqualData(stubSkillProficiencies({
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
	
		const result = ranks.addProficiencies(newSkills)
	
		expect(result).toEqualData(stubSkillProficiencies({
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
	
		const result = ranks.addProficiencies(newSkills)
	
		expect(result).toEqualData(stubSkillProficiencies({
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
	
		const result = ranks.addProficiencies(newSkills)
	
		expect(result).toEqualData(stubSkillProficiencies({
			athletics: 1,
		}))
	})
})