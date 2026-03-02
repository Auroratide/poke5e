import { test, expect } from "vitest"
import { DynamicLeveler, type Creature } from "../DynamicLeveler"
import { Level } from "../Level"
import { Attributes } from "$lib/dnd/attributes"
import { HitDice } from "$lib/dnd/hit-dice"

test("increasing level, d10 con+1", () => {
	const creature: Creature = {
		level: new Level(5),
		hp: 30,
		hitDice: new HitDice("d10"), // +6 per level
		attributes: new Attributes({
			str: 10,
			dex: 10,
			con: 12, // +1 per level
			int: 10,
			wis: 10,
			cha: 10,
		}),
	}

	const toLevel10 = DynamicLeveler.adjustStats(creature, new Level(10))
	expect(toLevel10.hp).toEqual(65) // (6 + 1) * 5 = 35
	expect(toLevel10.level).toEqualData(new Level(10))

	const toLevel15 = DynamicLeveler.adjustStats(creature, new Level(15))
	expect(toLevel15.hp).toEqual(100)
	expect(toLevel15.level).toEqualData(new Level(15))
})

test("increasing level, d16 con+5", () => {
	const creature: Creature = {
		level: new Level(5),
		hp: 30,
		hitDice: new HitDice("d6"), // +4 per level
		attributes: new Attributes({
			str: 10,
			dex: 10,
			con: 20, // +5 per level
			int: 10,
			wis: 10,
			cha: 10,
		}),
	}

	const toLevel10 = DynamicLeveler.adjustStats(creature, new Level(10))
	expect(toLevel10.hp).toEqual(75) // (4 + 5) * 5 = 45

	const toLevel15 = DynamicLeveler.adjustStats(creature, new Level(15))
	expect(toLevel15.hp).toEqual(120)
})

test("decreasing level, d10 con+1", () => {
	const creature: Creature = {
		level: new Level(5),
		hp: 30,
		hitDice: new HitDice("d10"), // +6 per level
		attributes: new Attributes({
			str: 10,
			dex: 10,
			con: 12, // +1 per level
			int: 10,
			wis: 10,
			cha: 10,
		}),
	}

	const toLevel4 = DynamicLeveler.adjustStats(creature, new Level(4))
	expect(toLevel4.hp).toEqual(23) // (6 + 1) * 1 = 7

	const toLevel1 = DynamicLeveler.adjustStats(creature, new Level(1))
	expect(toLevel1.hp).toEqual(8) // minimum is 8
})
