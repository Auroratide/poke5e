import { test, expect } from "vitest"
import { withCustomDistances } from "../types"
import { DndSpeedTypes } from "$lib/dnd/DndSpeeds"

test("nothing is overridden", () => {
	const result = withCustomDistances(DndSpeedTypes, [ {
		type: "walking",
		value: 30,
	}, {
		type: "climbing",
		value: 15,
	} ], {})

	expect(result).toEqual({
		walking: 30,
		climbing: 15,
	})
})

test("something is added", () => {
	const result = withCustomDistances(DndSpeedTypes, [ {
		type: "walking",
		value: 30,
	}, {
		type: "climbing",
		value: 15,
	} ], {
		swimming: 10,
	})

	expect(result).toEqual({
		walking: 30,
		climbing: 15,
		swimming: 10,
	})
})

test("something is overridden", () => {
	const result = withCustomDistances(DndSpeedTypes, [ {
		type: "walking",
		value: 30,
	}, {
		type: "climbing",
		value: 15,
	} ], {
		walking: 10,
	})

	expect(result).toEqual({
		walking: 10,
		climbing: 15,
	})
})

test("something is set to 0", () => {
	const result = withCustomDistances(DndSpeedTypes, [ {
		type: "walking",
		value: 30,
	}, {
		type: "climbing",
		value: 15,
	} ], {
		climbing: 0,
	})

	expect(result).toEqual({
		walking: 30,
		climbing: 0,
	})
})

test("values have null", () => {
	const result = withCustomDistances(DndSpeedTypes, [ {
		type: "walking",
		value: 30,
	}, {
		type: "climbing",
		value: 15,
	} ], {
		walking: null,
	})

	expect(result).toEqual({
		walking: 30,
		climbing: 15,
	})
})
