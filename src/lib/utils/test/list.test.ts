import { describe, test, expect } from "vitest"
import * as list from "../list"

describe("reorderOne", () => {
	test("reorders the element", () => {
		const array = [0, 1, 2, 3, 4, 5]

		const result = list.reorderOne(array, 2, 0)

		expect(result).toEqual([2, 0, 1, 3, 4, 5])
	})

	test("from out of bounds", () => {
		const array = [0, 1, 2, 3, 4, 5]

		expect(() => list.reorderOne(array, 20, 2)).toThrow()
	})

	test("to out of bounds", () => {
		const array = [0, 1, 2, 3, 4, 5]

		expect(() => list.reorderOne(array, 2, 20)).toThrow()
	})
})

describe("applyOrderToSubset", () => {
	const id = (it: string) => it

	test("no items filtered out behaves like a plain reorder", () => {
		const all = ["a", "b", "c"]

		const result = list.applyOrderToSubset(all, all, ["c", "a", "b"], id)

		expect(result).toEqual(["c", "a", "b"])
	})

	test("reorders within the visible subset only", () => {
		const all = ["a", "hidden", "b", "c"]
		const subset = ["a", "b", "c"]

		const result = list.applyOrderToSubset(all, subset, ["c", "a", "b"], id)

		expect(result).toEqual(["c", "hidden", "a", "b"])
	})

	test("items outside the subset keep their absolute positions", () => {
		const all = ["boxed1", "a", "boxed2", "b"]
		const subset = ["a", "b"]

		const result = list.applyOrderToSubset(all, subset, ["b", "a"], id)

		expect(result).toEqual(["boxed1", "b", "boxed2", "a"])
	})

	test("an empty subset leaves the list untouched", () => {
		const all = ["a", "b"]

		const result = list.applyOrderToSubset(all, [], [], id)

		expect(result).toEqual(["a", "b"])
	})
})

describe("fromCommaOrNewlineString", () => {
	test("empty string", () => {
		const input = ""

		const result = list.fromCommaOrNewlineString(input)

		expect(result).toEqual([])
	})

	test("single item", () => {
		const input = "one"

		const result = list.fromCommaOrNewlineString(input)

		expect(result).toEqual(["one"])
	})

	test("commas with no spaces", () => {
		const input = "one,two,three"

		const result = list.fromCommaOrNewlineString(input)

		expect(result).toEqual(["one", "two" ,"three"])
	})

	test("commas with spaces", () => {
		const input = "one, two, three"

		const result = list.fromCommaOrNewlineString(input)

		expect(result).toEqual(["one", "two", "three"])
	})

	test("newlines", () => {
		const input = "one\ntwo\nthree"

		const result = list.fromCommaOrNewlineString(input)

		expect(result).toEqual(["one", "two", "three"])
	})

	test("newlines and commas", () => {
		const input = "one, two,\nthree"

		const result = list.fromCommaOrNewlineString(input)

		expect(result).toEqual(["one", "two", "three"])
	})

	test("multiple commas", () => {
		const input = "one,, two,, three"

		const result = list.fromCommaOrNewlineString(input)

		expect(result).toEqual(["one", "two", "three"])
	})
})

describe("sortAccordingTo", () => {
	test("", () => {
		const originalList = [ {
			id: "2",
		}, {
			id: "4",
		}, {
			id: "3",
		}, {
			id: "1",
		} ]

		const accordingTo = [ {
			x: "1",
		}, {
			x: "4",
		}, {
			x: "3",
		}, {
			x: "2",
		} ]

		const result = list.sortAccordingTo(originalList, accordingTo, (it) => it.id, (it) => it.x)

		expect(result).toEqual([ {
			id: "1",
		}, {
			id: "4",
		}, {
			id: "3",
		}, {
			id: "2",
		} ])
	})
})

describe("replaceOrAddById", () => {
	test("exists", () => {
		const originalList = [ {
			id: "2",
			value: 5,
		}, {
			id: "4",
			value: 6,
		}, {
			id: "3",
			value: 7,
		}, {
			id: "1",
			value: 8,
		} ]

		const replacement = {
			id: "4",
			value: 4,
		}

		const result = list.replaceOrAddById(originalList, replacement, (it) => it.id)

		expect(result).toEqual([ {
			id: "2",
			value: 5,
		}, {
			id: "4",
			value: 4,
		}, {
			id: "3",
			value: 7,
		}, {
			id: "1",
			value: 8,
		} ])
	})

	test("not exists", () => {
		const originalList = [ {
			id: "2",
			value: 5,
		}, {
			id: "4",
			value: 6,
		}, {
			id: "3",
			value: 7,
		}, {
			id: "1",
			value: 8,
		} ]

		const replacement = {
			id: "5",
			value: 4,
		}

		const result = list.replaceOrAddById(originalList, replacement, (it) => it.id)

		expect(result).toEqual([ {
			id: "2",
			value: 5,
		}, {
			id: "4",
			value: 6,
		}, {
			id: "3",
			value: 7,
		}, {
			id: "1",
			value: 8,
		}, {
			id: "5",
			value: 4,
		} ])
	})
})
