import { test, expect } from "vitest"
import { HitDice } from "../HitDice"

test("sizeAsInt", () => {
	expect(new HitDice("d4").sizeAsInt()).toEqual(4)
	expect(new HitDice("d6").sizeAsInt()).toEqual(6)
	expect(new HitDice("d8").sizeAsInt()).toEqual(8)
	expect(new HitDice("d10").sizeAsInt()).toEqual(10)
	expect(new HitDice("d12").sizeAsInt()).toEqual(12)
	expect(new HitDice("d20").sizeAsInt()).toEqual(20)
})
