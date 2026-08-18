import * as z from "zod"

export const AbilityJson = z.object({
	id: z.string(),
	name: z.string(),
	description: z.string(),
})

export const AbilityListJson = z.object({
	values: z.array(AbilityJson),
})

export type AbilityJson = z.infer<typeof AbilityJson>
export type AbilityListJson = z.infer<typeof AbilityListJson>
