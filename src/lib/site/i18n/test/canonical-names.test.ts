import { describe, expect, test } from "vitest"
import { PokemonTeraType, PokemonType } from "$lib/pokemon/types"
import englishMessages from "../../../../../messages/en.json"

const messageFiles = import.meta.glob<{ canonical?: { types?: Record<string, string> } }>(
	"../../../../../messages/*.json",
	{ eager: true, import: "default" },
)

const locales = Object.entries(messageFiles)
	.map(([path, messages]) => [path.split("/").pop()!.replace(".json", ""), messages] as const)

const englishTypes = englishMessages.canonical.types

test("every type the app can display has a canonical name", () => {
	expect(Object.keys(englishTypes).sort()).toEqual([...PokemonTeraType.list].sort())
})

describe.each(locales)("%s", (locale, messages) => {
	/**
	 * A missing key is indistinguishable from an untranslated message, so `pnpm machine-translate`
	 * would fill it with a guess. The generator writes the English name instead for locales
	 * PokéAPI does not cover.
	 */
	test("has a canonical name for every type, leaving no gap for machine translation", () => {
		expect(Object.keys(messages.canonical?.types ?? {}).sort()).toEqual(Object.keys(englishTypes).sort())

		const blank = Object.entries(messages.canonical?.types ?? {})
			.filter(([, name]) => name.trim() === "")
			.map(([type]) => `${locale}.canonical.types.${type}`)
		expect(blank).toEqual([])
	})
})

test("type names read from the message catalog", () => {
	expect(PokemonType.name("electric")).toBe(englishTypes.electric)
	expect(PokemonType.name("stellar")).toBe(englishTypes.stellar)
})

test("types outside the canonical list keep their identifier", () => {
	// A move's type may be `varies` or `typeless`, which are Poké5e concepts rather than PokéAPI ones
	expect(PokemonType.name("varies")).toBe("Varies")
	expect(PokemonType.name("typeless")).toBe("Typeless")
})
