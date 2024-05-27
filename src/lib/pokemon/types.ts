export const PokeTypes = [
	"normal",
	"fighting",
	"flying",
	"poison",
	"ground",
	"rock",
	"bug",
	"ghost",
	"steel",
	"fire",
	"water",
	"grass",
	"electric",
	"psychic",
	"ice",
	"dragon",
	"dark",
	"fairy",
] as const
export type PokeType = typeof PokeTypes[number]
export const isPokeType = (type: string): type is PokeType =>
	(PokeTypes as readonly string[]).includes(type)

export type AbilityId = string
export type Ability = {
	id: AbilityId,
	name: string,
	description: string,
	hidden?: boolean
}

export type EvolutionCondition = {
	type: "level",
	value: number,
} | {
	type: "item",
	value: string,
} | {
	type: "loyalty",
	value: number,
} | {
	type: "move",
	value: string,
} | {
	type: "move-type",
	value: PokeType,
} | {
	type: "gender",
	value: "male" | "female",
} | {
	type: "time",
	value: "day" | "night" | "morning" | "afternoon",
} | {
	type: "special",
	value: string,
}

export type EvolutionEffect = {
	type: "asi",
	value: number,
} | {
	type: "special",
	value: string,
}

export type PokeEvolution = {
	stage: string,
	maxStage: string,
	description?: string,
	from: string[],
	to: {
		id: string,
		conditions: EvolutionCondition[],
		effects: EvolutionEffect[],
	}[]
}
