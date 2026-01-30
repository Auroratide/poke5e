import { test, expect, describe } from "vitest"
import { Resource } from "../Resource"

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