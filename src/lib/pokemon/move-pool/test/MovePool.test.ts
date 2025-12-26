import { describe, test, expect } from "vitest"
import { MovePool } from "../MovePool"
import { stubMove, stubTmDetails } from "$lib/moves/test/stubs-2"

describe("canLearn", () => {
	const pool = new MovePool({
		start: ["at-start"],
		level6: ["on-level"],
		egg: ["as-egg"],
		tm: [2],
	})

	test("start", () => {
		const move = stubMove({
			id: "at-start",
		})

		const result = pool.canLearn(move)

		expect(result).toBe(true)
	})

	test("on level", () => {
		const move = stubMove({
			id: "on-level",
		})

		const result = pool.canLearn(move)

		expect(result).toBe(true)
	})

	test("egg", () => {
		const move = stubMove({
			id: "as-egg",
		})

		const result = pool.canLearn(move)

		expect(result).toBe(true)
	})

	test("tm", () => {
		const move = stubMove({
			id: "tm",
			tm: stubTmDetails({
				id: 2,
			}).data,
		})

		const result = pool.canLearn(move)

		expect(result).toBe(true)
	})

	test("does not learn", () => {
		const move = stubMove({
			id: "cannot-learn",
			tm: stubTmDetails({
				id: 999,
			}).data,
		})

		const result = pool.canLearn(move)

		expect(result).toBe(false)
	})
})