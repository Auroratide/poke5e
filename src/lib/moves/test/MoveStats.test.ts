import { test, expect } from "vitest"
import { stubMove } from "./stubs-2"
import type { Attributes } from "$lib/dnd/attributes"
import { stubAttributes } from "$lib/dnd/attributes/test/stubs"
import { Level } from "$lib/dnd/level"
import { deriveMoveStats } from "../MoveStats"

const ATTRIBUTES: Attributes = stubAttributes({
	str: 8,
	dex: 10,
	con: 12,
	int: 14,
	wis: 16,
	cha: 18,
})

test("single attribute", () => {
	const move = stubMove({
		power: ["int"],
		type: "normal",
	})

	// +2 from int, +2 from level
	const result = deriveMoveStats(move, {
		attributes: ATTRIBUTES,
		level: new Level(1),
		type: ["psychic"],
	})

	expect(result).toEqual({
		toHit: 4,
		dc: 12,
		dmg: 2,
	})
})

test("multiple attribute", () => {
	const move = stubMove({
		power: ["str", "dex"],
		type: "normal",
	})

	// +0 from dex, +2 from level
	const result = deriveMoveStats(move, {
		attributes: ATTRIBUTES,
		level: new Level(1),
		type: ["psychic"],
	})

	expect(result).toEqual({
		toHit: 2,
		dc: 10,
		dmg: 0,
	})
})

test("any attribute", () => {
	const move = stubMove({
		power: "any",
		type: "normal",
	})

	// +4 from cha, +2 from level
	const result = deriveMoveStats(move, {
		attributes: ATTRIBUTES,
		level: new Level(1),
		type: ["psychic"],
	})

	expect(result).toEqual({
		toHit: 6,
		dc: 14,
		dmg: 4,
	})
})

test("no attribute", () => {
	const move = stubMove({
		power: "none",
		type: "normal",
	})

	const result = deriveMoveStats(move, {
		attributes: ATTRIBUTES,
		level: new Level(1),
		type: ["psychic"],
	})

	expect(result).toBeUndefined()
})

test("varies attribute", () => {
	const move = stubMove({
		power: "varies",
		type: "normal",
	})

	const result = deriveMoveStats(move, {
		attributes: ATTRIBUTES,
		level: new Level(1),
		type: ["psychic"],
	})

	expect(result).toBeUndefined()
})

test("has STAB", () => {
	const move = stubMove({
		power: ["int"],
		type: "psychic",
	})

	// +2 from int, +2 from level, +2 from STAB
	const result = deriveMoveStats(move, {
		attributes: ATTRIBUTES,
		level: new Level(1),
		type: ["psychic"],
	})

	expect(result).toEqual({
		toHit: 4,
		dc: 12,
		dmg: 4,
	})
})

test("higher level", () => {
	const move = stubMove({
		power: ["int"],
		type: "normal",
	})

	// +2 from int, +6 from level
	const result = deriveMoveStats(move, {
		attributes: ATTRIBUTES,
		level: new Level(20),
		type: ["psychic"],
	})

	expect(result).toEqual({
		toHit: 8,
		dc: 16,
		dmg: 2,
	})
})

test("multiple types with STAB", () => {
	const move = stubMove({
		power: ["int"],
		type: "normal",
	})

	// +2 from int, +2 from level, +2 from STAB
	const result = deriveMoveStats(move, {
		attributes: ATTRIBUTES,
		level: new Level(1),
		type: ["psychic", "normal"],
	})

	expect(result).toEqual({
		toHit: 4,
		dc: 12,
		dmg: 4,
	})
})
