import { test, expect } from "vitest"
import { ItemFilter } from "../ItemFilter"
import { stubItem } from "./stubs"

const items = [
	stubItem({
		name: "Raspberry",
		type: "berry",
		cost: 300,
	}),
	stubItem({
		name: "Great Ball",
		type: "pokeball",
		cost: 500,
	}),
	stubItem({
		name: "Great Berry",
		type: "berry",
		cost: 300,
	}),
]

test("name only", () => {
	const filter = new ItemFilter()
		.name("raspberry")

	const result = items.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(items[0])
})

test("type only", () => {
	const filter = new ItemFilter()
		.type("pokeball")

	const result = items.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(items[1])
})

test("cost", () => {
	const filter = new ItemFilter()
		.cost("≥", 400)

	const result = items.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(items[1])
})

test("name and type", () => {
	const filter = new ItemFilter()
		.name("great")
		.type("berry")

	const result = items.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(items[2])
})

test("no results", () => {
	const filter = new ItemFilter()
		.name("?????")

	const result = items.filter(filter.apply)

	expect(result.length).toEqual(0)
})

test("filters count", () => {
	const none = new ItemFilter()
	expect(none.count()).toEqual(0)

	const one = new ItemFilter()
		.name("ball")
	expect(one.count()).toEqual(1)

	const two = new ItemFilter()
		.name("berry")
		.type("pokeball")
	expect(two.count()).toEqual(2)
})
