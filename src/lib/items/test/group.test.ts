import { test, expect } from "vitest"
import { groupByType } from "../group"
import { stubItem } from "./stubs"
import type { Item } from "../types"

const berry = stubItem({
	id: "berry",
	name: "Berry",
	type: "berry",
})

const evoStone = stubItem({
	id: "evo-stone",
	name: "Evo Stone",
	type: "evolution",
})

const pokeball = stubItem({
	id: "pokeball",
	name: "Pokeball",
	type: "pokeball",
})

const potion = stubItem({
	id: "potion",
	name: "Potion",
	type: "medicine",
})

const heldItem = stubItem({
	id: "held-item",
	name: "Held Item",
	type: "held item",
})

const ALL_ITEMS: Item[] = [
	berry,
	evoStone,
	pokeball,
	potion,
	heldItem,
]

test("default groups", () => {
	// when
	const result = groupByType(ALL_ITEMS, [])

	// then
	expect(result).toEqual([ {
		name: "Pokeball",
		items: [pokeball],
	}, {
		name: "Medicine",
		items: [potion],
	}, {
		name: "Berry",
		items: [berry],
	}, {
		name: "Held Item",
		items: [heldItem],
	}, {
		name: "Evolution",
		items: [evoStone],
	} ])
})

test("group order given", () => {
	// when
	const result = groupByType(ALL_ITEMS, ["medicine", "held item", "berry", "evolution", "pokeball"])

	// then
	expect(result).toEqual([ {
		name: "Medicine",
		items: [potion],
	}, {
		name: "Held Item",
		items: [heldItem],
	}, {
		name: "Berry",
		items: [berry],
	}, {
		name: "Evolution",
		items: [evoStone],
	}, {
		name: "Pokeball",
		items: [pokeball],
	} ])
})

test("multiple items in a single group", () => {
	// given
	const moreBerries = [
		stubItem({ id: "strawberry", type: "berry"}),
		stubItem({ id: "blueberry", type: "berry"}),
		stubItem({ id: "raspberry", type: "berry"}),
	]

	// when
	const result = groupByType(ALL_ITEMS.concat(moreBerries), [])

	// then
	expect(result).toEqual([ {
		name: "Pokeball",
		items: [pokeball],
	}, {
		name: "Medicine",
		items: [potion],
	}, {
		name: "Berry",
		items: [berry, ...moreBerries],
	}, {
		name: "Held Item",
		items: [heldItem],
	}, {
		name: "Evolution",
		items: [evoStone],
	} ])
})
