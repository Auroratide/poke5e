import * as z from "zod"

export const ContestType = z.union([
	z.literal("clever"),
	z.literal("tough"),
	z.literal("beauty"),
	z.literal("cool"),
	z.literal("cute"),
])

export const ContestJson = z.object({
	id: z.string(),
	contest: ContestType,
	appeal: z.int(),
	jam: z.int(),
	effect: z.string(),
}).meta({
	id: "Contest",
	title: "Contest",
})

export const ContestListJson = z.object({
	values: z.array(ContestJson),
}).meta({
	id: "ContestList",
	title: "Contest List",
})

export type ContestJson = z.infer<typeof ContestJson>
export type ContestListJson = z.infer<typeof ContestListJson>
