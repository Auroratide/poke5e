import { test, expect } from "vitest"
import { ContestMoveEffect } from "../ContestMoveEffect"
import { stubContestMoveEffect } from "./stubs"

test("normalizes the effects", () => {
	const moveOne = {
		effect: "1",
	}

	const moveTwo = {
		effect: "2",
	}

	const effects = [
		stubContestMoveEffect({
			id: "1",
			name: "one",
		}),
		stubContestMoveEffect({
			id: "2",
			name: "two",
		}),
	]

	const resultOne = ContestMoveEffect.normalizeContestId(moveOne, effects)
	expect(resultOne).toEqual({
		effect: effects[0],
	})

	const resultTwo = ContestMoveEffect.normalizeContestId(moveTwo, effects)
	expect(resultTwo).toEqual({
		effect: effects[1],
	})
})
