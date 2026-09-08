import { describe, test, expect } from "vitest"
import { matchesPokemonFilter } from "../pokemon-filter"
import { stubTrainerPokemon } from "./stubs"
import { SpeciesIdentifier } from "$lib/poke5e/species"
import { TagList } from "$lib/poke5e/tags"

const eevee = stubTrainerPokemon({
	nickname: "Softie",
	pokemonId: new SpeciesIdentifier("eevee"),
	tags: TagList.from(["starter"]),
})

const mimikyu = stubTrainerPokemon({
	nickname: "Spooky",
	pokemonId: new SpeciesIdentifier("mimikyu"),
	tags: TagList.from(["ghost-team"]),
})

// Carries both tags, so "all" and "any" can be told apart.
const gengar = stubTrainerPokemon({
	nickname: "Grinner",
	pokemonId: new SpeciesIdentifier("gengar"),
	tags: TagList.from(["starter", "ghost-team"]),
})

const allTags = TagList.from(["starter", "ghost-team"])

describe("matchesPokemonFilter", () => {
	test("no filter matches everything", () => {
		const matches = matchesPokemonFilter("", [], "any", allTags)

		expect([eevee, mimikyu].filter(matches)).toEqual([eevee, mimikyu])
	})

	test("matches on nickname, case insensitively", () => {
		const matches = matchesPokemonFilter("SOFT", [], "any", allTags)

		expect([eevee, mimikyu].filter(matches)).toEqual([eevee])
	})

	test("matches on species name", () => {
		const matches = matchesPokemonFilter("mimikyu", [], "any", allTags)

		expect([eevee, mimikyu].filter(matches)).toEqual([mimikyu])
	})

	test("matches a hyphenated species by its spaced name", () => {
		const tapu = stubTrainerPokemon({
			nickname: "Guardian",
			pokemonId: new SpeciesIdentifier("tapu-koko"),
		})

		const matches = matchesPokemonFilter("tapu koko", [], "any", allTags)

		expect([tapu, eevee].filter(matches)).toEqual([tapu])
	})

	test("selected tags narrow the list", () => {
		const matches = matchesPokemonFilter("", ["ghost-team"], "any", allTags)

		expect([eevee, mimikyu].filter(matches)).toEqual([mimikyu])
	})

	test("typing an exact tag name filters by that tag", () => {
		const matches = matchesPokemonFilter("starter", [], "any", allTags)

		expect([eevee, mimikyu].filter(matches)).toEqual([eevee])
	})

	test("text and tags both have to match", () => {
		const matches = matchesPokemonFilter("softie", ["ghost-team"], "any", allTags)

		expect([eevee, mimikyu].filter(matches)).toEqual([])
	})

	test("any mode matches a pokemon carrying either tag", () => {
		const matches = matchesPokemonFilter("", ["starter", "ghost-team"], "any", allTags)

		expect([eevee, mimikyu, gengar].filter(matches)).toEqual([eevee, mimikyu, gengar])
	})

	test("all mode matches only a pokemon carrying every tag", () => {
		const matches = matchesPokemonFilter("", ["starter", "ghost-team"], "all", allTags)

		expect([eevee, mimikyu, gengar].filter(matches)).toEqual([gengar])
	})

	test("a typed tag name obeys the mode rather than always widening", () => {
		// "starter" is typed and "ghost-team" is ticked, so in all mode a pokemon
		// needs both -- the typed tag joins the selection instead of ORing past it.
		const anyMatches = matchesPokemonFilter("starter", ["ghost-team"], "any", allTags)
		const allMatches = matchesPokemonFilter("starter", ["ghost-team"], "all", allTags)

		expect([eevee, mimikyu, gengar].filter(anyMatches)).toEqual([eevee, mimikyu, gengar])
		expect([eevee, mimikyu, gengar].filter(allMatches)).toEqual([gengar])
	})
})
