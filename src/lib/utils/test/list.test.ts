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
