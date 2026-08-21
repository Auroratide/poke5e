import { test, expect, describe } from "vitest"
import { TagList } from "../TagList"

test("no duplicates", () => {
	let tags = TagList.empty()

	tags = TagList.add(tags, "one")
	tags = TagList.add(tags, "two")
	tags = TagList.add(tags, "two")

	expect(tags).toEqual(["one", "two"])
})

test("ignores case", () => {
	let tags = TagList.empty()

	tags = TagList.add(tags, "one")
	tags = TagList.add(tags, "ONE")
	tags = TagList.add(tags, "TWO")

	expect(tags).toEqual(["one", "two"])

	expect(TagList.has(tags, "ONE")).toBe(true)
})

test("removal", () => {
	let tags = TagList.empty()

	tags = TagList.add(tags, "one")
	tags = TagList.add(tags, "two")
	tags = TagList.remove(tags, "one")

	expect(tags).toEqual(["two"])

	expect(TagList.has(tags, "one")).toBe(false)
})

test("from array", () => {
	expect(TagList.from(["one", "two"])).toEqual(["one", "two"])
	expect(TagList.from(["one", "oNe"])).toEqual(["one"])
})

test("equality", () => {
	const base = TagList.from(["one", "two", "three"])
	const sameAsBase = TagList.from(["one", "two", "three"])
	const differentOrder = TagList.from(["two", "one", "three"])
	const missingTag = TagList.from(["two", "three"])
	const extraTag = TagList.from(["one", "two", "three", "four"])

	expect(TagList.equal(base, sameAsBase)).toBe(true)
	expect(TagList.equal(base, differentOrder)).toBe(true)
	expect(TagList.equal(base, missingTag)).toBe(false)
	expect(TagList.equal(base, extraTag)).toBe(false)

	expect(TagList.equal(TagList.empty(), TagList.empty())).toBe(true)
})

test("merge", () => {
	const a = TagList.from(["one", "two", "three"])
	const b = TagList.from(["three", "four", "five"])

	const result = TagList.merge(a, b)

	expect(TagList.equal(result, TagList.from(["one", "two", "three", "four", "five"]))).toBe(true)
})

test("overlaps", () => {
	const a = TagList.from(["one", "two", "three"])
	const b = TagList.from(["three", "four", "five"])
	const c = TagList.from(["five", "six", "seven"])

	expect(TagList.overlaps(a, b)).toBe(true)
	expect(TagList.overlaps(b, c)).toBe(true)
	expect(TagList.overlaps(a, c)).toBe(false)

	expect(TagList.overlaps(b, a)).toBe(true)
	expect(TagList.overlaps(c, b)).toBe(true)
	expect(TagList.overlaps(c, a)).toBe(false)
})

test("subsets", () => {
	const a = TagList.from(["one", "two", "three"])
	const b = TagList.from(["one", "three"])
	const c = TagList.from(["one", "four"])
	const d = TagList.from([])

	expect(TagList.subsets(a, b)).toBe(false)
	expect(TagList.subsets(b, a)).toBe(true)

	expect(TagList.subsets(a, c)).toBe(false)
	expect(TagList.subsets(c, a)).toBe(false)

	expect(TagList.subsets(a, d)).toBe(false)
	expect(TagList.subsets(d, a)).toBe(true)
})

describe("filterBy", () => {
	const tagged = (...tags: string[]) => ({
		tags: TagList.from(tags),
	})

	test("no tags specified", () => {
		const apple = tagged("red")
		const orange = tagged("orange")
		const banana = tagged("yellow")

		const list = [apple, orange, banana]

		const filter = TagList.filterBy(TagList.empty(), "any")
		const result = list.filter(filter)

		expect(result).toEqual([apple, orange, banana])
	})

	test("has desired tag", () => {
		const apple = tagged("red")
		const orange = tagged("orange")
		const banana = tagged("yellow")
		const lemon = tagged("yellow")

		const list = [apple, orange, banana, lemon]

		const filter = TagList.filterBy(TagList.from(["yellow"]), "any")
		const result = list.filter(filter)

		expect(result).toEqual([banana, lemon])
	})

	test("none have desired tag", () => {
		const apple = tagged("red")
		const orange = tagged("orange")
		const banana = tagged("yellow")

		const list = [apple, orange, banana]

		const filter = TagList.filterBy(TagList.from(["green"]), "any")
		const result = list.filter(filter)

		expect(result).toEqual([])
	})

	test("any mode: has one of the desired tags", () => {
		const apple = tagged("red")
		const orange = tagged("orange", "citrus")
		const banana = tagged("yellow")
		const lemon = tagged("yellow", "citrus")

		const list = [apple, orange, banana, lemon]

		const filter = TagList.filterBy(TagList.from(["yellow", "citrus"]), "any")
		const result = list.filter(filter)

		expect(result).toEqual([orange, banana, lemon])
	})

	test("all mode: has all of the desired tags", () => {
		const apple = tagged("red")
		const orange = tagged("orange", "citrus")
		const banana = tagged("yellow")
		const lemon = tagged("yellow", "citrus")

		const list = [apple, orange, banana, lemon]

		const filter = TagList.filterBy(TagList.from(["yellow", "citrus"]), "all")
		const result = list.filter(filter)

		expect(result).toEqual([lemon])
	})

	test("all mode: only has a subset of desired tags", () => {
		const apple = tagged("red")
		const orange = tagged("orange", "citrus")
		const banana = tagged("yellow")
		const lemon = tagged("yellow", "citrus")

		const list = [apple, orange, banana, lemon]

		const filter = TagList.filterBy(TagList.from(["red", "citrus"]), "all")
		const result = list.filter(filter)

		expect(result).toEqual([])
	})
})