import { test, expect } from "vitest"
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