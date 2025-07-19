import { DataClass, type Data } from "$lib/DataClass"
import type { Attribute, Attributes } from "../attributes"
import type { Level } from "../level"

export class SkillRanks extends DataClass<{
	"athletics": number,
	"acrobatics": number,
	"sleight of hand": number,
	"stealth": number,
	"arcana": number,
	"history": number,
	"investigation": number,
	"nature": number,
	"religion": number,
	"animal handling": number,
	"insight": number,
	"medicine": number,
	"perception": number,
	"survival": number,
	"deception": number,
	"intimidation": number,
	"performance": number,
	"persuasion": number,
}> {
	static readonly list: {
		 name: Skill,
		 attribute: Attribute,
	}[] = [ {
			name: "athletics",
			attribute: "str",
		}, {
			name: "acrobatics",
			attribute: "dex",
		}, {
			name: "sleight of hand",
			attribute: "dex",
		}, {
			name: "stealth",
			attribute: "dex",
		}, {
			name: "arcana",
			attribute: "int",
		}, {
			name: "history",
			attribute: "int",
		}, {
			name: "investigation",
			attribute: "int",
		}, {
			name: "nature",
			attribute: "int",
		}, {
			name: "religion",
			attribute: "int",
		}, {
			name: "animal handling",
			attribute: "wis",
		}, {
			name: "insight",
			attribute: "wis",
		}, {
			name: "medicine",
			attribute: "wis",
		}, {
			name: "perception",
			attribute: "wis",
		}, {
			name: "survival",
			attribute: "wis",
		}, {
			name: "deception",
			attribute: "cha",
		}, {
			name: "intimidation",
			attribute: "cha",
		}, {
			name: "performance",
			attribute: "cha",
		}, {
			name: "persuasion",
			attribute: "cha",
		} ]

	toList = (): Skill[] => Object
		.entries(this.data)
		.filter(([, rank]) => rank > 0)
		.map((it) => it[0] as Skill)

	addProficiencies = (skills: Skill[]): SkillRanks => {
		for (const skill of skills) {
			if (this.data[skill] === 0) {
				this.data[skill] = 1
			}
		}

		return this
	}

	isProficient = (skill: Skill): boolean => this.data[skill] > 0
	isExpert = (skill: Skill): boolean => this.data[skill] > 1

	modifier = (skill: Skill, attributes: Attributes, level: Level): number => {
		const relevantAttribute = SkillRanks.list.find(it => it.name === skill).attribute

		return attributes[relevantAttribute].modifier + level.proficiencyBonus
	}

	static fromList(list: Skill[]): SkillRanks {
		return new SkillRanks(SkillRanks.list.reduce((ranks, skill) => ({
			...ranks,
			[skill.name]: list.includes(skill.name) ? 1 : 0,
		}), {} as Data<SkillRanks>))
	}
}

export type Skill = keyof Data<SkillRanks>
