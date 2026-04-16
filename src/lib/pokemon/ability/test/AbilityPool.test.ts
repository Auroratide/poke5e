import { describe, test, expect } from "vitest"
import { AbilityPool } from "../AbilityPool"
import { stubPokemonSpecies } from "$lib/poke5e/species/test/stubs"
import { stubAbility } from "./stubs"

describe("findIndex", () => {
	const n0 = stubAbility({
		referenceId: "n0",
		name: "Normal 0",
	})

	const n1 = stubAbility({
		referenceId: undefined,
		name: "Normal 1",
	})

	const n2 = stubAbility({
		referenceId: "n2",
		name: "Normal 2",
	})

	const h0 = stubAbility({
		referenceId: "h0",
		name: "Hidden 0",
	})

	const h1 = stubAbility({
		referenceId: undefined,
		name: "Hidden 1",
	})

	const pool = new AbilityPool({
		normal: [n0.data, n1.data, n2.data],
		hidden: [h0.data, h1.data, n0.data],
	})

	test("not in list", () => {
		const result = pool.findIndex(stubAbility({
			referenceId: "not",
		}))

		expect(result).toEqual({
			exists: false,
			normal: -1,
			hidden: -1,
		})
	})

	test("reference in normal list", () => {
		const result = pool.findIndex(n2)

		expect(result).toEqual({
			exists: true,
			normal: 2,
			hidden: -1,
		})
	})

	test("custom in normal list", () => {
		const result = pool.findIndex(n1)

		expect(result).toEqual({
			exists: true,
			normal: 1,
			hidden: -1,
		})
	})

	test("reference in hidden list", () => {
		const result = pool.findIndex(h0)

		expect(result).toEqual({
			exists: true,
			normal: -1,
			hidden: 0,
		})
	})

	test("custom in hidden list", () => {
		const result = pool.findIndex(h1)

		expect(result).toEqual({
			exists: true,
			normal: -1,
			hidden: 1,
		})
	})

	test("in both lists", () => {
		const result = pool.findIndex(n0)

		expect(result).toEqual({
			exists: true,
			normal: 0,
			hidden: 2,
		})
	})
})

describe("findApplicableAbility", () => {
	const n0 = stubAbility({
		referenceId: "n0",
		name: "Normal 0",
	})

	const n1 = stubAbility({
		referenceId: undefined,
		name: "Normal 1",
	})

	const h0 = stubAbility({
		referenceId: "h0",
		name: "Hidden 0",
	})

	const pool = new AbilityPool({
		normal: [n0.data, n1.data],
		hidden: [h0.data],
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

		expect(result.value).toEqualData(n0)
		expect(result.hidden).toBe(false)
	})

	test("in normal list index 1", () => {
		const result = pool.findApplicableAbility({
			normal: 1,
			hidden: -1,
		})

		expect(result.value).toEqualData(n1)
		expect(result.hidden).toBe(false)
	})

	test("in hidden list", () => {
		const result = pool.findApplicableAbility({
			normal: -1,
			hidden: 0,
		})

		expect(result.value).toEqualData(h0)
		expect(result.hidden).toBe(true)
	})

	test("overshoots normal list", () => {
		const result = pool.findApplicableAbility({
			normal: 2,
			hidden: -1,
		})

		// Finds the last applicable ability
		expect(result.value).toEqualData(n1)
		expect(result.hidden).toBe(false)
	})

	test("overshoots hidden list", () => {
		const result = pool.findApplicableAbility({
			normal: -1,
			hidden: 1,
		})

		// Finds the last applicable ability
		expect(result.value).toEqualData(h0)
		expect(result.hidden).toBe(true)
	})

	test("in both lists", () => {
		const result = pool.findApplicableAbility({
			normal: 0,
			hidden: 0,
		})

		// Prefer the normal list, arbitrary decision
		expect(result.value).toEqualData(n0)
		expect(result.hidden).toBe(false)
	})

	test("pool has no normal abilities", () => {
		const poolNoNormal = new AbilityPool({
			normal: [],
			hidden: [h0.data],
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
			normal: [n0.data],
			hidden: [],
		})

		const result = poolNoHidden.findApplicableAbility({
			normal: -1,
			hidden: 0,
		})

		// go ahead and use the normal ability
		expect(result.value).toEqualData(n0)
		expect(result.hidden).toBe(false)
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

describe("groupSpeciesByAbility", () => {
	const abilityPool = (...abilityIds: string[]) => ({
		normal: abilityIds.map((it) => ({
			referenceId: it,
			name: "",
			description: "",
		})),
		hidden: [],
	})

	test("empty lists", () => {
		const result = AbilityPool.groupSpeciesByAbility([], [])
	
		expect(result).toEqual({})
	})
	
	test("abilities and pokemon match up", () => {
		const appleAbility = "apple-picker"
		const orangeAbility = "orange-picker"
		const abilities = [appleAbility, orangeAbility]
	
		const applemon = stubPokemonSpecies({ name: "Applemon", abilities: abilityPool(appleAbility) })
		const orangemon = stubPokemonSpecies({ name: "Orangemon", abilities: abilityPool(orangeAbility) })
		const pokemon = [applemon, orangemon]
	
		const result = AbilityPool.groupSpeciesByAbility(abilities, pokemon)
	
		expect(result).toEqual({
			"apple-picker": [applemon],
			"orange-picker": [orangemon],
		})
	})
	
	test("multiple pokemon have the same ability", () => {
		const fruitAbility = "fruit-picker"
		const vegAbility = "veg-picker"
		const abilities = [fruitAbility, vegAbility]
	
	
		const applemon = stubPokemonSpecies({ name: "Applemon", abilities: abilityPool(fruitAbility) })
		const orangemon = stubPokemonSpecies({ name: "Orangemon", abilities: abilityPool(fruitAbility) })
		const tomatomon = stubPokemonSpecies({ name: "Tomatomon", abilities: abilityPool(vegAbility) })
		const pokemon = [applemon, orangemon, tomatomon]
	
		const result = AbilityPool.groupSpeciesByAbility(abilities, pokemon)
	
		expect(result).toEqual({
			"fruit-picker": [applemon, orangemon],
			"veg-picker": [tomatomon],
		})
	})
	
	test("an ability has no associated pokemon", () => {
		const fruitAbility = "fruit-picker"
		const vegAbility = "veg-picker"
		const abilities = [fruitAbility, vegAbility]
	
	
		const applemon = stubPokemonSpecies({ name: "Applemon", abilities: abilityPool(fruitAbility) })
		const orangemon = stubPokemonSpecies({ name: "Orangemon", abilities: abilityPool(fruitAbility) })
		const pokemon = [applemon, orangemon]
	
		const result = AbilityPool.groupSpeciesByAbility(abilities, pokemon)
	
		expect(result).toEqual({
			"fruit-picker": [applemon, orangemon],
			"veg-picker": [],
		})
	})
	
	test("a pokemon has an ability not in the list of abilities", () => {
		const fruitAbility = "fruit-picker"
		const vegAbility = "veg-picker"
		const dairyAbility = "dairy-picker"
		const abilities = [fruitAbility, vegAbility] // dairy not in the list!
	
	
		const applemon = stubPokemonSpecies({ name: "Applemon", abilities: abilityPool(fruitAbility) })
		const orangemon = stubPokemonSpecies({ name: "Orangemon", abilities: abilityPool(fruitAbility) })
		const tomatomon = stubPokemonSpecies({ name: "Tomatomon", abilities: abilityPool(vegAbility) })
		const milkmon = stubPokemonSpecies({ name: "Milkmon", abilities: abilityPool(dairyAbility) })
		const pokemon = [applemon, orangemon, tomatomon, milkmon]
	
		const result = AbilityPool.groupSpeciesByAbility(abilities, pokemon)
	
		expect(result).toEqual({
			"fruit-picker": [applemon, orangemon],
			"veg-picker": [tomatomon],
		})
	})
})