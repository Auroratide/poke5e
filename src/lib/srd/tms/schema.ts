import * as z from "zod"

export const TmJson = z.object({
	id: z.int().meta({
		description: "Unique identifier, also the TM's number.",
	}),
	move: z.string().meta({
		description: "ID of the move for the TM.",
	}),
	cost: z.int().meta({
		description: "Cost in pokemon dollars.",
	}),
}).meta({
	id: "Tm",
	title: "TM",
	description: "A TM.",
})

export const TmListJson = z.object({
	values: z.array(TmJson),
}).meta({
	id: "TmList",
	title: "TM List",
	description: "Collection of all TMs.",
})

export type TmJson = z.infer<typeof TmJson>
export type TmListJson = z.infer<typeof TmListJson>
