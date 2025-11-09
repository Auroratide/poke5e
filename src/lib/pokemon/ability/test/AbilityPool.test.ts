import { describe, test, expect } from "vitest"
import { AbilityPool } from "../AbilityPool"

describe("findApplicableAbility", () => {
	const pool = new AbilityPool({
		normal: ["n0", "n1"],
		hidden: ["h0"],
	})

	test("not in list", () => {
		const result = pool.findApplicableAbility({
			normal: -1,
			hidden: -1,
		})

		expect(result).toBeUndefined()
	})

	test("in normal list", () => {
		const result = pool.findApplicableAbility({
			normal: 0,
			hidden: -1,
		})

		expect(result).toEqual({
			id: "n0",
			hidden: false,
		})
	})

	test("in normal list index 1", () => {
		const result = pool.findApplicableAbility({
			normal: 1,
			hidden: -1,
		})

		expect(result).toEqual({
			id: "n1",
			hidden: false,
		})
	})

	test("in hidden list", () => {
		const result = pool.findApplicableAbility({
			normal: -1,
			hidden: 0,
		})

		expect(result).toEqual({
			id: "h0",
			hidden: true,
		})
	})

	test("overshoots normal list", () => {
		const result = pool.findApplicableAbility({
			normal: 2,
			hidden: -1,
		})

		// Finds the last applicable ability
		expect(result).toEqual({
			id: "n1",
			hidden: false,
		})
	})

	test("overshoots hidden list", () => {
		const result = pool.findApplicableAbility({
			normal: -1,
			hidden: 1,
		})

		// Finds the last applicable ability
		expect(result).toEqual({
			id: "h0",
			hidden: true,
		})
	})

	test("in both lists", () => {
		const result = pool.findApplicableAbility({
			normal: 0,
			hidden: 0,
		})

		// Prefer the normal list, arbitrary decision
		expect(result).toEqual({
			id: "n0",
			hidden: false,
		})
	})

	test("pool has no normal abilities", () => {
		const poolNoNormal = new AbilityPool({
			normal: [],
			hidden: ["h0"],
		})

		const result = poolNoNormal.findApplicableAbility({
			normal: 0,
			hidden: -1,
		})

		// we cannot upgrade a non-hidden ability to a hidden one
		expect(result).toBeUndefined()
	})

	test("pool has no hidden abilities", () => {
		const poolNoHidden = new AbilityPool({
			normal: ["n0"],
			hidden: [],
		})

		const result = poolNoHidden.findApplicableAbility({
			normal: -1,
			hidden: 0,
		})

		// go ahead and use the normal ability
		expect(result).toEqual({
			id: "n0",
			hidden: false,
		})
	})

	test("pool has no abilities", () => {
		const poolNoNothing = new AbilityPool({
			normal: [],
			hidden: [],
		})

		const result = poolNoNothing.findApplicableAbility({
			normal: 0,
			hidden: -1,
		})

		expect(result).toBeUndefined()
	})
})
