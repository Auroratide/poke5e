import { describe, test, expect } from "vitest"
import { PokemonStorage, isInBox, isInParty } from "../pokemon-storage"
import { stubTrainerPokemon } from "./stubs"

describe("isInParty", () => {
	test("a pokemon in the party", () => {
		const pokemon = stubTrainerPokemon({ storage: PokemonStorage.Party })

		expect(isInParty(pokemon)).toBe(true)
	})

	test("a pokemon in the box", () => {
		const pokemon = stubTrainerPokemon({ storage: PokemonStorage.Box })

		expect(isInParty(pokemon)).toBe(false)
	})

	test("an unrecognised location is not the party", () => {
		// Party is an allowlist, so a location this version does not know about
		// must never leak into the party list.
		const pokemon = stubTrainerPokemon({ storage: "daycare" as PokemonStorage })

		expect(isInParty(pokemon)).toBe(false)
	})
})

describe("isInBox", () => {
	test("a pokemon in the box", () => {
		const pokemon = stubTrainerPokemon({ storage: PokemonStorage.Box })

		expect(isInBox(pokemon)).toBe(true)
	})

	test("an unrecognised location is not the box either", () => {
		const pokemon = stubTrainerPokemon({ storage: "daycare" as PokemonStorage })

		expect(isInBox(pokemon)).toBe(false)
	})
})
