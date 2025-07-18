import { skillList } from "./proficiency"

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

export function skillRanksToList(ranks: SkillRanks): Skill[] {
	return Object
		.entries(ranks)
		.filter(([, rank]) => rank > 0)
		.map((it) => it[0] as Skill)
}

export function addProficiencies(ranks: SkillRanks, skills: Skill[]): SkillRanks {
	const updatedRanks = { ...ranks }

	for (const skill of skills) {
		if (updatedRanks[skill] === 0) {
			updatedRanks[skill] = 1
		}
	}

	return updatedRanks
}

export function isProficient(ranks: SkillRanks, skill: Skill): boolean {
	return ranks[skill] > 0
}

export function isExpert(ranks: SkillRanks, skill: Skill): boolean {
	return ranks[skill] > 1
}
