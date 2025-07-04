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