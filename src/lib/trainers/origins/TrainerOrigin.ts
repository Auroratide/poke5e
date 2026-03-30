import type { Attribute } from "$lib/dnd/attributes"
import type { Skill } from "$lib/dnd/skills"
import type { MarkdownString } from "$lib/ui/rendering"

export type TrainerOrigin = {
	id: string,
	name: string,
	description: MarkdownString,
	abilityScores: {
		name: string,
		description: MarkdownString,
		values: Attribute[] | "any two" | Attribute[][],
	},
	proficiencies: {
		name: string,
		description: MarkdownString,
		values: Skill[],
	},
	feats: {
		name: string,
		description: MarkdownString,
		effect: MarkdownString,
	},
	languages: {
		values: string[],
	}
}

export const TrainerOrigin = {
	abilityScoresHasOptions: (values: Attribute[] | Attribute[][]): values is Attribute[][] =>
		Array.isArray(values[0]),
} as const
