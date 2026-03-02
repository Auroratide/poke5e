import { test, expect } from "vitest"
import { MovesetGenerator } from "../MovesetGenerator"
import { Level } from "$lib/dnd/level"
import { stubMovePool } from "$lib/pokemon/move-pool/test/stubs"

test("chooses from legally available moves", () => {
	const pool = stubMovePool({
		start: ["1-1", "1-2"],
		level2: ["2-1", "2-2"],
		level6: ["6-1", "6-2"],
		level10: ["10-1", "10-2"],
		level14: ["14-1", "14-2"],
		level18: ["18-1", "18-2"],
	})

	const result = MovesetGenerator.chooseMoves(pool, new Level(6))

	expect(new Set(result).size).toEqual(4) // guarantee unique
	expect(result).toSubset(pool.start.concat(pool.level2).concat(pool.level6))
	expect(result).toExclude(pool.level10.concat(pool.level14).concat(pool.level18))
})

test("less than 4 available moves", () => {
	const pool = stubMovePool({
		start: ["1-1", "1-2"],
		level2: ["2-1", "2-2"],
		level6: ["6-1", "6-2"],
		level10: ["10-1", "10-2"],
		level14: ["14-1", "14-2"],
		level18: ["18-1", "18-2"],
	})

	const result = MovesetGenerator.chooseMoves(pool, new Level(1))

	expect(new Set(result).size).toEqual(2) // only start moves are available
	expect(result).toSubset(pool.start)
})
