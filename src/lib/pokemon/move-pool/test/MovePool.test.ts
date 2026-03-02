import { describe, test, expect } from "vitest"
import { MovePool } from "../MovePool"
import { stubMove, stubTmDetails } from "$lib/moves/test/stubs-2"
import { Level } from "$lib/dnd/level"

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

describe("canLearnViaTm", () => {
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

		const result = pool.canLearnViaTm(move)

		expect(result).toBe(false)
	})

	test("on level", () => {
		const move = stubMove({
			id: "on-level",
		})

		const result = pool.canLearnViaTm(move)

		expect(result).toBe(false)
	})

	test("egg", () => {
		const move = stubMove({
			id: "as-egg",
		})

		const result = pool.canLearnViaTm(move)

		expect(result).toBe(false)
	})

	test("tm", () => {
		const move = stubMove({
			id: "tm",
			tm: stubTmDetails({
				id: 2,
			}).data,
		})

		const result = pool.canLearnViaTm(move)

		expect(result).toBe(true)
	})

	test("does not learn", () => {
		const move = stubMove({
			id: "cannot-learn",
			tm: stubTmDetails({
				id: 999,
			}).data,
		})

		const result = pool.canLearnViaTm(move)

		expect(result).toBe(false)
	})
})

describe("availableAtLevel", () => {
	const pool = new MovePool({
		start: ["1-1", "1-2"],
		level2: ["2-1", "2-2"],
		level6: ["6-1", "6-2"],
		level10: ["10-1", "10-2"],
		level14: ["14-1", "14-2"],
		level18: ["18-1", "18-2"],
	})

	test("level 1", () => {
		const result = pool.availableAtLevel(new Level(1))

		expect(result).toEqual(pool.start)
	})

	test("level 2", () => {
		const result = pool.availableAtLevel(new Level(2))

		expect(result).toEqual(pool.start.concat(pool.level2))
	})

	test("level 5", () => {
		const result = pool.availableAtLevel(new Level(5))

		expect(result).toEqual(pool.start.concat(pool.level2))
	})

	test("level 6", () => {
		const result = pool.availableAtLevel(new Level(6))

		expect(result).toEqual(pool.start
			.concat(pool.level2)
			.concat(pool.level6),
		)
	})

	test("level 10", () => {
		const result = pool.availableAtLevel(new Level(10))

		expect(result).toEqual(pool.start
			.concat(pool.level2)
			.concat(pool.level6)
			.concat(pool.level10),
		)
	})

	test("level 14", () => {
		const result = pool.availableAtLevel(new Level(14))

		expect(result).toEqual(pool.start
			.concat(pool.level2)
			.concat(pool.level6)
			.concat(pool.level10)
			.concat(pool.level14),
		)
	})

	test("level 18", () => {
		const result = pool.availableAtLevel(new Level(18))

		expect(result).toEqual(pool.start
			.concat(pool.level2)
			.concat(pool.level6)
			.concat(pool.level10)
			.concat(pool.level14)
			.concat(pool.level18),
		)
	})

	test("pool starts at a later level", () => {
		const pool = new MovePool({
			start: ["1-1", "1-2", "2-1", "2-2", "6-1", "6-2"],
			level2: undefined,
			level6: undefined,
			level10: ["10-1", "10-2"],
			level14: ["14-1", "14-2"],
			level18: ["18-1", "18-2"],
		})

		const result = pool.availableAtLevel(new Level(6))

		expect(result).toEqual(pool.start)
	})
})
