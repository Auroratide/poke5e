import * as z from "zod"

export const ContestEffectJson = z.object({
	id: z.string(),
	name: z.string(),
	effect: z.string(),
}).meta({
	id: "ContestEffect",
	title: "Contest Effect",
})

export const ContestEffectListJson = z.object({
	values: z.array(ContestEffectJson),
}).meta({
	id: "ContestEffectList",
	title: "Contest Effect List",
})

export type ContestEffectJson = z.infer<typeof ContestEffectJson>
export type ContestEffectListJson = z.infer<typeof ContestEffectListJson>
