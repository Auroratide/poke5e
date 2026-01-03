import { test, expect } from "vitest"
import { MoveFilter } from "../MoveFilter"
import { stubMove, stubTmDetails } from "$lib/moves/test/stubs-2"

const moves = [
	stubMove({
		id: "raspberry",
		name: "Raspberry",
		type: "fire",
		power: ["str"],
	}),
	stubMove({
		name: "Orange",
		type: "fighting",
		power: ["dex"],
	}),
	stubMove({
		name: "Banana",
		type: "electric",
		power: ["con"],
	}),
	stubMove({
		name: "Lime",
		type: "grass",
		power: ["int"],
	}),
	stubMove({
		name: "Blueberry",
		type: "water",
		power: ["wis"],
	}),
	stubMove({
		name: "Plum",
		type: "dragon",
		power: ["cha"],
	}),
	stubMove({
		name: "Peach",
		type: "fire",
		power: ["dex", "cha"],
	}),
	stubMove({
		name: "Lychee",
		type: "fairy",
		power: ["int"],
		tm: stubTmDetails({
			id: 18,
		}),
	})
]

test("name only", () => {
	const filter = new MoveFilter()
		.name("raspberry")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[0])
})

test("type only", () => {
	const filter = new MoveFilter()
		.type("dragon")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[5])
})

test("power only", () => {
	const filter = new MoveFilter()
		.power("con")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[2])
})

test("not only", () => {
	const filter = new MoveFilter()
		.not(["raspberry"])

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(moves.length - 1)
})

test("move has multiple powers", () => {
	const filter = new MoveFilter()
		.power("cha")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result[0]).toEqual(moves[5])
	expect(result[1]).toEqual(moves[6])
})


test("name multiple match", () => {
	const filter = new MoveFilter()
		.name("berry")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result[0]).toEqual(moves[0])
	expect(result[1]).toEqual(moves[4])
})

test("name and type", () => {
	const filter = new MoveFilter()
		.name("berry")
		.type("fire")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[0])
})

test("type and power", () => {
	const filter = new MoveFilter()
		.type("fire")
		.power("dex")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[6])
})

test("no results", () => {
	const filter = new MoveFilter()
		.name("?????")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(0)
})

test("empty name", () => {
	const filter = new MoveFilter()
		.name("")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(moves.length)
})

test("empty type", () => {
	const filter = new MoveFilter()
		.type("")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(moves.length)
})

test("empty power", () => {
	const filter = new MoveFilter()
		.power("")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(moves.length)
})

test("exact tm number", () => {
	const filter = new MoveFilter()
		.tm(18)
	
	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[7])
})

test("partial tm number", () => {
	const filter = new MoveFilter()
		.tm(1)
	
	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[7])
})

test("not a matching tm number", () => {
	const filter = new MoveFilter()
		.tm(28)
	
	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(0)
})
