import * as z from "zod"

export const AbilityJson = z.object({
	id: z.string().meta({
		description: "Unique identifier.",
	}),
	name: z.string().meta({
		description: "Display name, localized.",
	}),
	description: z.string().meta({
		description: "Rules text for the ability. Plain text with no markup.",
	}),
	aliases: z.array(z.string()).optional().meta({
		description: "Alternative display names for searching.\nUsually the English name for localized output.",
	}),
	deprecated: z.boolean().optional().meta({
		description: "Ability is to no longer be used.",
	}),
}).meta({
	id: "Ability",
	title: "Ability",
	description: "A Pokémon ability as defined by the Pokémon 5e handbook.",
})

export const AbilityListJson = z.object({
	values: z.array(AbilityJson).meta({
		description: "Every ability, sorted by id.",
	}),
}).meta({
	id: "AbilityList",
	title: "Ability List",
	description: "Collection of all abilities.",
})

export type AbilityJson = z.infer<typeof AbilityJson>
export type AbilityListJson = z.infer<typeof AbilityListJson>
