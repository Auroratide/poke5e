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
}).meta({
	id: "Item",
	title: "Item",
})

export const ItemListJson = z.object({
	values: z.array(ItemJson),
}).meta({
	id: "ItemList",
	title: "Item List",
})


export type ItemJson = z.infer<typeof ItemJson>
export type ItemListJson = z.infer<typeof ItemListJson>
