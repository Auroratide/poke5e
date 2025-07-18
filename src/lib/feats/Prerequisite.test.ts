import { expect, test } from "vitest"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { level, oneOfAttributes } from "./Prerequisite"

test("level prerequisite", () => {
	expect(level(4)({
		level: 4,
		attributes: stubAttributes(),
	})).toBe(true)

	expect(level(4)({
		level: 3,
		attributes: stubAttributes(),
	})).toBe(false)
})

test("attribute prerequisite", () => {
	expect(oneOfAttributes(["str"], 13)({
		level: 4,
		attributes: stubAttributes({
			str: 13,
		}),
	})).toBe(true)

	expect(oneOfAttributes(["str"], 13)({
		level: 4,
		attributes: stubAttributes({
			str: 12,
		}),
	})).toBe(false)

	expect(oneOfAttributes(["str", "dex"], 13)({
		level: 4,
		attributes: stubAttributes({
			str: 10,
			dex: 13,
		}),
	})).toBe(true)

	expect(oneOfAttributes(["str", "dex"], 13)({
		level: 4,
		attributes: stubAttributes({
			str: 12,
			dex: 12,
			con: 13,
		}),
	})).toBe(false)
})
