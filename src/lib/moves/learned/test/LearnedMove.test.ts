import type { MoveStats } from "$lib/moves/MoveStats"
import { stubLearnedMove } from "$lib/trainers/test/stubs"
import { describe, test, expect } from "vitest"
import { LearnedMove } from "../LearnedMove"

const createMoveStats = (props: {
	toHit?: number,
	save?: number,
	damage?: number,
}): MoveStats => ({
	toHit: props.toHit,
	save: props.save != null ? {
		attribute: ["dex"],
		dc: props.save,
	} : undefined,
	damage: props.damage != null ? {
		dice: "0",
		mod: props.damage,
		isHealing: false,
		stabApplied: false,
	} : undefined,
})

describe("applyToMoveStats", () => {
	test("no modifications", () => {
		const learnedMove = stubLearnedMove({
			modifiers: {
				toHit: 0,
				saveDc: 0,
				damage: 0,
			},
		})

		const moveStats = createMoveStats({
			toHit: 2,
			save: 2,
			damage: 2,
		})

		const result = LearnedMove.applyToMoveStats(learnedMove, moveStats)

		expect(result).toEqual(createMoveStats({
			toHit: 2,
			save: 2,
			damage: 2,
		}))
	})

	test("modify to hit", () => {
		const learnedMove = stubLearnedMove({
			modifiers: {
				toHit: 3,
				saveDc: 0,
				damage: 0,
			},
		})

		const moveStats = createMoveStats({
			toHit: 2,
			save: 2,
			damage: 2,
		})

		const result = LearnedMove.applyToMoveStats(learnedMove, moveStats)

		expect(result).toEqual(createMoveStats({
			toHit: 5,
			save: 2,
			damage: 2,
		}))
	})

	test("modify save", () => {
		const learnedMove = stubLearnedMove({
			modifiers: {
				toHit: 0,
				saveDc: 2,
				damage: 0,
			},
		})

		const moveStats = createMoveStats({
			toHit: 2,
			save: 2,
			damage: 2,
		})

		const result = LearnedMove.applyToMoveStats(learnedMove, moveStats)

		expect(result).toEqual(createMoveStats({
			toHit: 2,
			save: 4,
			damage: 2,
		}))
	})

	test("modify damage", () => {
		const learnedMove = stubLearnedMove({
			modifiers: {
				toHit: 0,
				saveDc: 0,
				damage: 5,
			},
		})

		const moveStats = createMoveStats({
			toHit: 2,
			save: 2,
			damage: 2,
		})

		const result = LearnedMove.applyToMoveStats(learnedMove, moveStats)

		expect(result).toEqual(createMoveStats({
			toHit: 2,
			save: 2,
			damage: 7,
		}))
	})

	test("modify something that isn't defined", () => {
		const learnedMove = stubLearnedMove({
			modifiers: {
				toHit: 2,
				saveDc: 1,
				damage: 3,
			},
		})

		const moveStats = createMoveStats({
			toHit: undefined,
			save: undefined,
			damage: undefined,
		})

		const result = LearnedMove.applyToMoveStats(learnedMove, moveStats)

		expect(result).toEqual(createMoveStats({
			toHit: undefined,
			save: undefined,
			damage: undefined,
		}))
	})

	test("negative modifiers", () => {
		const learnedMove = stubLearnedMove({
			modifiers: {
				toHit: -1,
				saveDc: -2,
				damage: -3,
			},
		})

		const moveStats = createMoveStats({
			toHit: 2,
			save: 2,
			damage: 2,
		})

		const result = LearnedMove.applyToMoveStats(learnedMove, moveStats)

		expect(result).toEqual(createMoveStats({
			toHit: 1,
			save: 0,
			damage: -1,
		}))
	})
})