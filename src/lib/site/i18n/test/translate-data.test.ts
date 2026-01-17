import { test, expect } from "vitest"
import { translateData } from "../translate-data"

type Item = {
	id: string,
	name: string,
	description: string,
	cost: number,
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
}, {
	id: "ultra-ball",
	name: "Ultra Ball",
	description: "Lets a trainer attempt a Capture Roll to catch a Pokémon. Reduce the capture DC by 10.",
	cost: 1000,
} ]

const spanishItems: Partial<Item>[] = [ {
	id: "poke-ball",
	name: "Poke Ball",
	description: "Permite a un entrenador hacer una tirada de Captura para atrapar un Pokémon.",
}, {
	id: "great-ball",
	name: "Súper Ball",
	description: "Permite a un entrenador hacer una tirada de Captura para atrapar un Pokémon. Reduce la CD de Captura en 5.",
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
	}, {
		id: "ultra-ball",
		name: "Ultra Ball",
		description: "Lets a trainer attempt a Capture Roll to catch a Pokémon. Reduce the capture DC by 10.",
		cost: 1000,
	} ])
})
