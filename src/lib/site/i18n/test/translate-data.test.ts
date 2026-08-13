import { test, expect } from "vitest"
import { translateData } from "../translate-data"
import type { DeepPartial } from "$lib/utils/types"

type Item = {
	id: string,
	name: string,
	aliases?: string[],
	description: string,
	cost: number,
	action?: { // test deep references
		name: string,
		attribute: string,
	},
}

const items: Item[] = [ {
	id: "poke-ball",
	name: "Poke Ball",
	description: "Lets a trainer attempt a Capture Roll to catch a Pokémon.",
	cost: 200,
}, {
	id: "great-ball",
	name: "Great Ball",
	description: "Lets a trainer attempt a Capture Roll to catch a Pokémon. Reduce the capture DC by 5.",
	cost: 500,
	action: {
		name: "Throw",
		attribute: "dex",
	},
}, {
	id: "ultra-ball",
	name: "Ultra Ball",
	description: "Lets a trainer attempt a Capture Roll to catch a Pokémon. Reduce the capture DC by 10.",
	cost: 1000,
} ]

const spanishItems: DeepPartial<Item>[] = [ {
	id: "poke-ball",
	name: "Poke Ball",
	description: "Permite a un entrenador hacer una tirada de Captura para atrapar un Pokémon.",
}, {
	id: "great-ball",
	name: "Súper Ball",
	description: "Permite a un entrenador hacer una tirada de Captura para atrapar un Pokémon. Reduce la CD de Captura en 5.",
	action: {
		name: "Tirar",
	},
} ]

test("english", async () => {
	const result = await translateData(
		items,
		async () => spanishItems,
		"en",
	)

	expect(result).toEqual([ {
		id: "poke-ball",
		name: "Poke Ball",
		description: "Lets a trainer attempt a Capture Roll to catch a Pokémon.",
		cost: 200,
	}, {
		id: "great-ball",
		name: "Great Ball",
		description: "Lets a trainer attempt a Capture Roll to catch a Pokémon. Reduce the capture DC by 5.",
		cost: 500,
		action: {
			name: "Throw",
			attribute: "dex",
		},
	}, {
		id: "ultra-ball",
		name: "Ultra Ball",
		description: "Lets a trainer attempt a Capture Roll to catch a Pokémon. Reduce the capture DC by 10.",
		cost: 1000,
	} ])
})

test("spanish", async () => {
	const result = await translateData(
		items,
		async () => spanishItems,
		"es",
	)

	// Ultraball is missing from es.json, so we fall back to English
	expect(result).toEqual([ {
		id: "poke-ball",
		name: "Poke Ball",
		description: "Permite a un entrenador hacer una tirada de Captura para atrapar un Pokémon.",
		cost: 200,
	}, {
		id: "great-ball",
		name: "Súper Ball",
		description: "Permite a un entrenador hacer una tirada de Captura para atrapar un Pokémon. Reduce la CD de Captura en 5.",
		cost: 500,
		action: {
			name: "Tirar",
			attribute: "dex",
		},
		aliases: [ "Great Ball" ],
	}, {
		id: "ultra-ball",
		name: "Ultra Ball",
		description: "Lets a trainer attempt a Capture Roll to catch a Pokémon. Reduce the capture DC by 10.",
		cost: 1000,
	} ])
})

test("the english name becomes an alias so translated items stay searchable in either language", async () => {
	const result = await translateData(items, async () => spanishItems, "es")
	const aliasesById = Object.fromEntries(result.map((it) => [ it.id, it.aliases ]))

	// Poke Ball is spelled identically in both languages, so it needs no alias
	expect(aliasesById["poke-ball"]).toBeUndefined()
	expect(aliasesById["great-ball"]).toEqual([ "Great Ball" ])

	// Ultra Ball is untranslated, so its name already matches an English search
	expect(aliasesById["ultra-ball"]).toBeUndefined()
})

test("aliases declared by a locale are kept alongside the english name", async () => {
	const result = await translateData(
		items,
		async () => [ { id: "great-ball", name: "Súper Ball", aliases: [ "Superball" ] } ],
		"es",
	)

	expect(result.find((it) => it.id === "great-ball")?.aliases).toEqual([ "Superball", "Great Ball" ])
})
