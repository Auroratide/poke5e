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