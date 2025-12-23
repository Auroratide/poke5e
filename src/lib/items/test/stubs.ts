import type { Data } from "$lib/DataClass"
import { Item } from "../Item"

export function stubItem(template: Partial<Data<Item>>): Item {
	return new Item({
		id: "lum-berry",
		name: "Lum Berry",
		type: "berry",
		cost: 200,
		description: [
			"Consume to cure any single status condition. Can be consumed as a reaction to becoming being afflicted with a status condition.",
		],
		media: {
			sprite: null,
		},
		...template,
	})
}