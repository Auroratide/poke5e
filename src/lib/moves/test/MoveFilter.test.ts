import { test, expect } from "vitest"
import { MoveFilter } from "../MoveFilter"
import { stubMove, stubTmDetails } from "$lib/moves/test/stubs-2"
import { stubContestDetails } from "../contest/test/stubs"

const moves = [
	stubMove({
		id: "raspberry",
		name: "Raspberry",
		type: "fire",
		power: ["str"],
		time: "1 action",
		range: "melee",
		pp: 5,
		contest: stubContestDetails({
			contest: "beauty",
		}),
	}),
	stubMove({
		name: "Orange",
		type: "fighting",
		power: ["dex"],
		time: "1 action",
		range: "melee",
		pp: 10,
		contest: stubContestDetails({
			contest: "beauty",
		}),
	}),
	stubMove({
		name: "Banana",
		type: "electric",
		power: ["con"],
		time: "1 action",
		range: "20ft",
		pp: 15,
		contest: stubContestDetails({
			contest: "beauty",
		}),
	}),
	stubMove({
		name: "Lime",
		type: "grass",
		power: ["int"],
		time: "1 bonus action",
		range: "melee",
		pp: 20,
		contest: stubContestDetails({
			contest: "beauty",
		}),
	}),
	stubMove({
		name: "Blueberry",
		type: "water",
		power: ["wis"],
		time: "1 action",
		range: "melee",
		pp: 20,
		contest: stubContestDetails({
			contest: "cute",
		}),
	}),
	stubMove({
		name: "Plum",
		type: "dragon",
		power: ["cha"],
		time: "1 bonus action",
		range: "melee",
		pp: 20,
		contest: stubContestDetails({
			contest: "cute",
		}),
	}),
	stubMove({
		name: "Peach",
		type: "fire",
		power: ["dex", "cha"],
		tm: stubTmDetails({
			id: 20,
			cost: 4000,
		}),
		time: "1 reaction",
		range: "self (20ft line)",
		pp: 20,
		contest: stubContestDetails({
			contest: "beauty",
		}),
	}),
	stubMove({
		name: "Lychee",
		type: "fairy",
		power: ["int"],
		tm: stubTmDetails({
			id: 18,
			cost: 6000,
		}),
		time: "1 minute",
		range: "melee",
		pp: 20,
		contest: stubContestDetails({
			contest: "beauty",
		}),
	}),
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

test("time only", () => {
	const filter = new MoveFilter()
		.time("bonus action")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result[0]).toEqual(moves[3])
	expect(result[1]).toEqual(moves[5])
})

test("time (other)", () => {
	const filter = new MoveFilter()
		.time("other")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[7])
})

test("rangeInFeet", () => {
	const filter = new MoveFilter()
		.rangeInFeet("=", 20)

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result[0]).toEqual(moves[2])
	expect(result[1]).toEqual(moves[6])
})

test("rangeInFeet: melee", () => {
	const filter = new MoveFilter()
		.rangeInFeet("=", 0)

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(6)
})

test("pp", () => {
	const filter = new MoveFilter()
		.pp("=", 15)

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[2])
})

test("cost", () => {
	const filter = new MoveFilter()
		.cost(">", 5000)

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(1)
	expect(result[0]).toEqual(moves[7])
})

test("contest only", () => {
	const filter = new MoveFilter()
		.contest("cute")

	const result = moves.filter(filter.apply)

	expect(result.length).toEqual(2)
	expect(result[0]).toEqual(moves[4])
	expect(result[1]).toEqual(moves[5])
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

test("filters count", () => {
	const none = new MoveFilter()
	expect(none.count()).toEqual(0)

	const one = new MoveFilter()
		.name("?")
	expect(one.count()).toEqual(1)

	const two = new MoveFilter()
		.name("?")
		.not(["something"])
	expect(two.count()).toEqual(2)
})
