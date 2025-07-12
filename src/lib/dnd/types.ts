import { skillList } from "./proficiency"

export type Attributes = {
	str: number,
	dex: number,
	con: number,
	int: number,
	wis: number,
	cha: number,
}

export type Attribute = keyof Attributes

export type Skill =
	"athletics" |
	"acrobatics" |
	"sleight of hand" |
	"stealth" |
	"arcana" |
	"history" |
	"investigation" |
	"nature" |
	"religion" |
	"animal handling" |
	"insight" |
	"medicine" |
	"perception" |
	"survival" |
	"deception" |
	"intimidation" |
	"performance" |
	"persuasion"

export type SkillRanks = Record<Skill, number>

export function skillListToRanks(list: Skill[]): SkillRanks {
	return skillList.reduce((ranks, skill) => ({
		...ranks,
		[skill.name]: list.includes(skill.name) ? 1 : 0,
	}), {} as SkillRanks)
}

export function isProficient(ranks: SkillRanks, skill: Skill): boolean {
	return ranks[skill] > 0
}

export function isExpert(ranks: SkillRanks, skill: Skill): boolean {
	return ranks[skill] > 1
}
