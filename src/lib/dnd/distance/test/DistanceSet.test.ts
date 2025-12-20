import { test, expect, describe } from "vitest"
import { DistanceSet } from "../DistanceSet"
import { Speeds } from "$lib/dnd/movement"
import { Senses } from "$lib/dnd/senses"

describe("fromList", () => {
	test("empty list", () => {
		const result = DistanceSet.fromList(Speeds, [])

		expect(result).toEqualData(new Speeds({}))
	})

	test("speeds", () => {
		const result = DistanceSet.fromList(Speeds, [ {
			type: Speeds.types.Walking,
			value: 10,
		}, {
			type: Speeds.types.Hover,
			value: 20,
		} ])

		expect(result).toEqualData(new Speeds({
			walking: 10,
			hover: 20,
		}))
	})

	test("senses", () => {
		const result = DistanceSet.fromList(Senses, [ {
			type: Senses.types.Darkvision,
			value: 30,
		} ])

		expect(result).toEqualData(new Senses({
			darkvision: 30,
		}))
	})

	test("something is redeclared", () => {
		const result = DistanceSet.fromList(Senses, [ {
			type: Senses.types.Darkvision,
			value: 30,
		}, {
			type: Senses.types.Darkvision,
			value: 60,
		} ])

		// last one is used
		expect(result).toEqualData(new Senses({
			darkvision: 60,
		}))
	})
})

describe("mergeWith", () => {
	test("nothing is overridden", () => {
		const initial = new Speeds({
			walking: 30,
			climbing: 15,
		})

		const result = initial.mergeWith(new Speeds({}))

		expect(result).toEqualData(new Speeds({
			walking: 30,
			climbing: 15,
		}))
	})
	
	test("something is added", () => {
		const initial = new Speeds({
			walking: 30,
			climbing: 15,
		})

		const result = initial.mergeWith(new Speeds({
			swimming: 10,
		}))
	
		expect(result).toEqualData(new Speeds({
			walking: 30,
			climbing: 15,
			swimming: 10,
		}))
	})
	
	test("something is overridden", () => {
		const initial = new Speeds({
			walking: 30,
			climbing: 15,
		})

		const result = initial.mergeWith(new Speeds({
			walking: 10,
		}))
	
		expect(result).toEqualData(new Speeds({
			walking: 10,
			climbing: 15,
		}))
	})
	
	test("something is set to 0", () => {
		const initial = new Speeds({
			walking: 30,
			climbing: 15,
		})

		const result = initial.mergeWith(new Speeds({
			climbing: 0,
		}))

		expect(result).toEqualData(new Speeds({
			walking: 30,
			climbing: 0,
		}))
	})
	
	test("values have null", () => {
		const initial = new Speeds({
			walking: 30,
			climbing: 15,
		})

		const result = initial.mergeWith(new Speeds({
			walking: null,
		}))

		expect(result).toEqualData(new Speeds({
			walking: 30,
			climbing: 15,
		}))
	})
})

describe("formatString", () => {
	test("speed", () => {
		const speeds = new Speeds({
			walking: 30,
		})

		const result = speeds.formatString("walking")

		expect(result).toEqual("30ft. walking")
	})

	test("senses", () => {
		const senses = new Senses({
			darkvision: 25
		})

		const result = senses.formatString("darkvision")

		expect(result).toEqual("darkvision 25ft.")
	})
})