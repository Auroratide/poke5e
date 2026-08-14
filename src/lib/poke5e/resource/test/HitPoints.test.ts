import { test, expect, describe } from "vitest"
import { Resource } from "../Resource"
import { HitPoints } from "../HitPoints"
import { Level } from "$lib/dnd/level"

describe("improveViaConIncrease", () => {
	test("con increases by 0", () => {
		const hp = {
			current: 12,
			max: 20,
		}

		const result = HitPoints.improveViaConIncrease(hp, new Level(4), 0)

		expect(result).toEqual({
			current: 12,
			max: 20,
		})
	})

	test("con increases by 1", () => {
		const hp = {
			current: 12,
			max: 20,
		}

		const result = HitPoints.improveViaConIncrease(hp, new Level(4), 1)

		expect(result).toEqual({
			current: 12,
			max: 20,
		})
	})

	test("con increases by 2", () => {
		const hp = {
			current: 12,
			max: 20,
		}

		const result = HitPoints.improveViaConIncrease(hp, new Level(4), 2)

		expect(result).toEqual({
			current: 16,
			max: 24,
		})
	})

	test("con increases by 4", () => {
		const hp = {
			current: 12,
			max: 20,
		}

		const result = HitPoints.improveViaConIncrease(hp, new Level(4), 4)

		expect(result).toEqual({
			current: 20,
			max: 28,
		})
	})

	test("con actually decreases", () => {
		const hp = {
			current: 12,
			max: 20,
		}

		const result = HitPoints.improveViaConIncrease(hp, new Level(4), -2)

		expect(result).toEqual({
			current: 12,
			max: 16,
		})
	})
})

describe("adjustMax", () => {
	test("max does not change", () => {
		const resource = {
			current: 12,
			max: 20,
		}

		const result = Resource.adjustMax(resource, 20)

		expect(result).toEqual({
			current: 12,
			max: 20,
		})
	})

	test("max increases", () => {
		const resource = {
			current: 10,
			max: 40,
		}

		const result = Resource.adjustMax(resource, 60)

		expect(result).toEqual({
			current: 30,
			max: 60,
		})
	})

	test("max decreases", () => {
		const resource = {
			current: 10,
			max: 40,
		}

		const result = Resource.adjustMax(resource, 20)

		expect(result).toEqual({
			current: 10,
			max: 20,
		})
	})

	test("max decreases below current", () => {
		const resource = {
			current: 10,
			max: 40,
		}

		const result = Resource.adjustMax(resource, 5)

		expect(result).toEqual({
			current: 5,
			max: 5,
		})
	})
})