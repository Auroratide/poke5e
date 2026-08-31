import { test, expect, describe } from "vitest"
import { Nature } from "../Nature"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"

// note this is only testing a sample

describe("applying nature to attributes", () => {
	const attributes = () => stubAttributes({
		str: 10,
		dex: 10,
		con: 10,
		int: 10,
		wis: 10,
		cha: 10,
	})

	test("neutral nature", () => {
		const result = new Nature("Hardy").applyTo(attributes())

		expect(result.data).toEqual({
			str: 10,
			dex: 10,
			con: 10,
			int: 10,
			wis: 10,
			cha: 10,
		})
	})

	test("non-neutral nature", () => {
		// just a sample to prove the concept
		const lonely = new Nature("Lonely").applyTo(attributes())
		const modest = new Nature("Modest").applyTo(attributes())

		expect(lonely.data).toEqual({
			str: 11,
			dex: 10,
			con: 9,
			int: 10,
			wis: 10,
			cha: 10,
		})

		expect(modest.data).toEqual({
			str: 9,
			dex: 10,
			con: 10,
			int: 10,
			wis: 11,
			cha: 10,
		})
	})

	test("custom nature", () => {
		const result = new Nature("Groooovy").applyTo(attributes())

		// customs are neutral
		expect(result.data).toEqual({
			str: 10,
			dex: 10,
			con: 10,
			int: 10,
			wis: 10,
			cha: 10,
		})
	})
})