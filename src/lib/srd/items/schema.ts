import * as z from "zod"

export const ItemJson = z.object({
	id: z.string(),
	from: z.string(),
	type: z.string(),
	cost: z.union([z.int(), z.null()]),
	description: z.array(z.string()),
	media: z.object({
		sprite: z.string(),
	}),
})

export const ItemListJson = z.object({
	values: z.array(ItemJson),
})

export type ItemJson = z.infer<typeof ItemJson>
export type ItemListJson = z.infer<typeof ItemListJson>
