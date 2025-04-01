import type { Item } from "../types"

export function stubItem(template: Partial<Item>): Item {
	return {
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
	}
}