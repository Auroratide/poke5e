import * as z from "zod"

export const ItemJson = z.object({
	id: z.string(),
	name: z.string(),
	type: z.string(),
	cost: z.union([z.int(), z.null()]),
	description: z.union([z.array(z.string()), z.null()]),
	media: z.object({
		sprite: z.union([z.string(), z.null()]),
	}),
	beta: z.boolean().optional(),
	_ingameEffect: z.string().optional(),
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
