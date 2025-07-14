import type { Attributes, SkillRanks } from "../types"

export function stubAttributes(template: Partial<Attributes> = {}): Attributes {
	return {
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10,
		...template,
	}
}

export function stubSkillProficiencies(ranks: Partial<SkillRanks> = {}): SkillRanks {
	return {
		"athletics": 0,
		"acrobatics": 0,
		"sleight of hand": 0,
		"stealth": 0,
		"arcana": 0,
		"history": 0,
		"investigation": 0,
		"nature": 0,
		"religion": 0,
		"animal handling": 0,
		"insight": 0,
		"medicine": 0,
		"perception": 0,
		"survival": 0,
		"deception": 0,
		"intimidation": 0,
		"performance": 0,
		"persuasion": 0,
		...ranks,
	}
}
