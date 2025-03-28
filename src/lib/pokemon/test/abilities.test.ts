import { test, expect } from "vitest"
import { pokemonWithAbilities } from "../abilities"
import { stubAbility } from "./stubs"
import { stubPokemon } from "$lib/creatures/test/stubs"

test("empty lists", () => {
	const result = pokemonWithAbilities([], [])

	expect(result).toEqual({})
})

test("abilities and pokemon match up", () => {
	const appleAbility = stubAbility({ id: "apple-picker", name: "Apple Picker" })
	const orangeAbility = stubAbility({ id: "orange-picker", name: "Orange Picker" })
	const abilities = [appleAbility, orangeAbility]


	const applemon = stubPokemon({ name: "Applemon", abilities: [appleAbility] })
	const orangemon = stubPokemon({ name: "Orangemon", abilities: [orangeAbility] })
	const pokemon = [applemon, orangemon]

	const result = pokemonWithAbilities(abilities, pokemon)

	expect(result).toEqual({
		"apple-picker": [applemon],
		"orange-picker": [orangemon],
	})
})

test("multiple pokemon have the same ability", () => {
	const fruitAbility = stubAbility({ id: "fruit-picker", name: "Fruit Picker" })
	const vegAbility = stubAbility({ id: "veg-picker", name: "Veg Picker" })
	const abilities = [fruitAbility, vegAbility]


	const applemon = stubPokemon({ name: "Applemon", abilities: [fruitAbility] })
	const orangemon = stubPokemon({ name: "Orangemon", abilities: [fruitAbility] })
	const tomatomon = stubPokemon({ name: "Tomatomon", abilities: [vegAbility] })
	const pokemon = [applemon, orangemon, tomatomon]

	const result = pokemonWithAbilities(abilities, pokemon)

	expect(result).toEqual({
		"fruit-picker": [applemon, orangemon],
		"veg-picker": [tomatomon],
	})
})

test("an ability has no associated pokemon", () => {
	const fruitAbility = stubAbility({ id: "fruit-picker", name: "Fruit Picker" })
	const vegAbility = stubAbility({ id: "veg-picker", name: "Veg Picker" })
	const abilities = [fruitAbility, vegAbility]


	const applemon = stubPokemon({ name: "Applemon", abilities: [fruitAbility] })
	const orangemon = stubPokemon({ name: "Orangemon", abilities: [fruitAbility] })
	const pokemon = [applemon, orangemon]

	const result = pokemonWithAbilities(abilities, pokemon)

	expect(result).toEqual({
		"fruit-picker": [applemon, orangemon],
		"veg-picker": [],
	})
})

test("a pokemon has an ability not in the list of abilities", () => {
	const fruitAbility = stubAbility({ id: "fruit-picker", name: "Fruit Picker" })
	const vegAbility = stubAbility({ id: "veg-picker", name: "Veg Picker" })
	const dairyAbility = stubAbility({ id: "dairy-picker", name: "Dairy Picker" })
	const abilities = [fruitAbility, vegAbility] // dairy not in the list!


	const applemon = stubPokemon({ name: "Applemon", abilities: [fruitAbility] })
	const orangemon = stubPokemon({ name: "Orangemon", abilities: [fruitAbility] })
	const tomatomon = stubPokemon({ name: "Tomatomon", abilities: [vegAbility] })
	const milkmon = stubPokemon({ name: "Milkmon", abilities: [dairyAbility] })
	const pokemon = [applemon, orangemon, tomatomon, milkmon]

	const result = pokemonWithAbilities(abilities, pokemon)

	expect(result).toEqual({
		"fruit-picker": [applemon, orangemon],
		"veg-picker": [tomatomon],
	})
})
