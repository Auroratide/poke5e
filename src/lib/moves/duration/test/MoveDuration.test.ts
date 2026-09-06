import { test, expect, describe } from "vitest"
import { MoveDuration } from "../MoveDuration"

describe("display", () => {
	test("instantaneous", () => {
		const duration: MoveDuration = {
			unit: "instantaneous",
			concentration: false,
		}

		const result = MoveDuration.display(duration)

		expect(result).toEqual("Instantaneous")
	})

	test("single round", () => {
		const duration: MoveDuration = {
			unit: "round",
			value: 1,
			concentration: false,
		}

		const result = MoveDuration.display(duration)

		expect(result).toEqual("1 Round")
	})

	test("multiple rounds", () => {
		const duration: MoveDuration = {
			unit: "round",
			value: 3,
			concentration: false,
		}

		const result = MoveDuration.display(duration)

		expect(result).toEqual("3 Rounds")
	})

	test("single minute", () => {
		const duration: MoveDuration = {
			unit: "minute",
			value: 1,
			concentration: false,
		}

		const result = MoveDuration.display(duration)

		expect(result).toEqual("1 Minute")
	})

	test("multiple minutes", () => {
		const duration: MoveDuration = {
			unit: "minute",
			value: 10,
			concentration: false,
		}

		const result = MoveDuration.display(duration)

		expect(result).toEqual("10 Minutes")
	})

	test("concentration", () => {
		const duration: MoveDuration = {
			unit: "minute",
			value: 1,
			concentration: true,
		}

		const result = MoveDuration.display(duration)

		expect(result).toEqual("Concentration, up to 1 Minute")
	})

	test("varies", () => {
		const duration: MoveDuration = {
			unit: "varies",
			concentration: false,
		}

		const result = MoveDuration.display(duration)

		expect(result).toEqual("Varies")
	})

	// Untested impossible scenarios: intantaneous concentration; varies concentration; minutes/rounds without value
})
