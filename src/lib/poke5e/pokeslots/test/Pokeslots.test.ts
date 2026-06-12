import { test, expect } from "vitest"
import { Pokeslots } from "../Pokeslots"
import { Level } from "$lib/dnd/level"

test("maxAllowed", () => {
	expect(Pokeslots.maxAllowed(new Level(1))).toEqual(3)
	expect(Pokeslots.maxAllowed(new Level(5))).toEqual(4)
	expect(Pokeslots.maxAllowed(new Level(10))).toEqual(5)
	expect(Pokeslots.maxAllowed(new Level(15))).toEqual(6)
	expect(Pokeslots.maxAllowed(new Level(20))).toEqual(6)
})
