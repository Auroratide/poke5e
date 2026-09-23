import * as z from "zod"
import { Updated } from "../common/schema"

export const ItemJson = z.object({
	id: z.string(),
	name: z.string(),
	type: z.string(),
	cost: z.union([z.int(), z.null()]),
	description: z.string(),
	media: z.object({
		sprite: z.union([z.string(), z.null()]),
	}),
	updated: Updated.optional(),
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
