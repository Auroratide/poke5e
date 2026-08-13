import { expect, test } from "vitest"
import pokemon from "../../../../../static/data/de/pokemon.json"
import moves from "../../../../../static/data/de/moves.json"
import abilities from "../../../../../static/data/de/abilities.json"
import items from "../../../../../static/data/de/items.json"
import englishPokemon from "../../../../../static/data/pokemon.json"
import englishMoves from "../../../../../static/data/moves.json"
import englishMessages from "../../../../../messages/en.json"
import germanMessages from "../../../../../messages/de.json"
import canonical from "../canonical/de.json"
import { translateData } from "../translate-data"
import { includesSearch } from "$lib/utils/string"

const byId = <T extends { id: string }>(values: T[]) =>
	Object.fromEntries(values.map((value) => [value.id, value]))

const searchable = (value: { name: string, aliases?: string[] }) => [value.name, ...(value.aliases ?? [])]

const flatten = (value: Record<string, unknown>, prefix = ""): Record<string, string> =>
	Object.fromEntries(Object.entries(value).flatMap(([key, child]) => {
		const path = prefix ? `${prefix}.${key}` : key
		return child != null && typeof child === "object"
			? Object.entries(flatten(child as Record<string, unknown>, path))
			: [[path, String(child)]]
	}))

const placeholders = (message: string) =>
	Array.from(message.matchAll(/\{([^}]+)\}/g), (match) => match[1]).sort()

test("uses official German canonical names from the generated PokéAPI overlays", () => {
	expect(byId(pokemon.items).bulbasaur.name).toBe("Bisasam")
	expect(byId(pokemon.items).charizard.name).toBe("Glurak")
	expect(byId(moves.moves).thunderbolt.name).toBe("Donnerblitz")
	expect(byId(abilities.items).overgrow.name).toBe("Notdünger")
	expect(byId(items.items).potion.name).toBe("Trank")
	expect(canonical.types.electric).toBe("Elektro")
	expect(canonical.natures.adamant).toBe("Hart")
})

test("localized names remain searchable by German and English names", async () => {
	// The overlays carry German names only; the English name is retained as an alias when merging
	const translatedPokemon = await translateData(englishPokemon.items, async () => pokemon.items, "de")
	const translatedMoves = await translateData(englishMoves.moves, async () => moves.moves, "de")

	const charizard = byId(translatedPokemon).charizard
	const thunderbolt = byId(translatedMoves).thunderbolt
	expect(charizard.name).toBe("Glurak")
	expect(thunderbolt.name).toBe("Donnerblitz")
	expect(includesSearch(searchable(charizard), "Glurak")).toBe(true)
	expect(includesSearch(searchable(charizard), "charizard")).toBe(true)
	expect(includesSearch(searchable(thunderbolt), "Donnerblitz")).toBe(true)
	expect(includesSearch(searchable(thunderbolt), "thunderbolt")).toBe(true)
})

test("German messages match the English catalog and interpolation variables", () => {
	const english = flatten(englishMessages)
	const german = flatten(germanMessages)

	expect(Object.keys(german).sort()).toEqual(Object.keys(english).sort())
	for (const key of Object.keys(english)) {
		expect(placeholders(german[key]), key).toEqual(placeholders(english[key]))
	}
})

test("German messages do not contain accidental English carryover", () => {
	const english = flatten(englishMessages)
	const german = flatten(germanMessages)
	const intentionallyIdentical = new Set([
		"$schema", "sitetitle", "name", "sr", "pokeslots", "pp", "ac", "hp", "bonus",
		"avatar", "tm", "tms", "jam", "tera", "sprite", "pokemon.title", "tmsSection.title",
		"items.title", "fakemon.title",
	])

	const untranslated = Object.keys(english)
		.filter((key) => english[key] === german[key] && !intentionallyIdentical.has(key))

	expect(untranslated).toEqual([])
})
