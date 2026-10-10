import path from "node:path"
import fs from "node:fs/promises"

export type PokemonData = {
	id: string, // eg. bulbasaur
	name: string,
	number: number,
	hitDice: string,
	hp: number,
	minLevel: number,
	attributes: {
		str: number,
		dex: number,
		con: number,
		int: number,
		wis: number,
		cha: number,
	}
	habitat: {
		biomes: string[],
		nativeRegion?: string,
		regions?: string[],
	},
	moves: {
		start: string[],
		level2: string[],
		level6: string[],
		level10: string[],
		level14: string[],
		level18: string[],
		egg?: string[],
		tm?: number[],
	},
}

const srdPath = (edition: string) => path.join("src", "lib", "srd", "data", edition, "pokemon", "en.json")

export async function getPokemonSrd(edition: string = "2024"): Promise<PokemonData[]> {
	const raw = await fs.readFile(srdPath(edition), { encoding: "utf-8" })

	return JSON.parse(raw).values
}

export async function writePokemonSrd(data: PokemonData[], edition: string = "2024") {
	const raw = JSON.stringify({ values: data }, null, "\t")

	await fs.writeFile(srdPath(edition), raw, { encoding: "utf-8" })
}

// Older editions only store overrides against the 2024 data; see EditionOverride in src/lib/srd/editions.ts
export type PokemonOverride = {
	id: string,
	moves?: Partial<Record<keyof PokemonData["moves"], string[] | number[] | null>>,
	[key: string]: unknown,
}

export async function getPokemonOverrides(edition: string): Promise<PokemonOverride[]> {
	const raw = await fs.readFile(srdPath(edition), { encoding: "utf-8" })

	return JSON.parse(raw).values
}

export async function writePokemonOverrides(data: PokemonOverride[], edition: string) {
	const raw = JSON.stringify({ values: data }, null, "\t")

	await fs.writeFile(srdPath(edition), `${raw}\n`, { encoding: "utf-8" })
}

export function overrideInOldEdition(list2018: PokemonData[], override: Pick<PokemonData, "id"> & Partial<PokemonData>): PokemonData[] {
	const inOriginalList = list2018.findIndex((it) => it.id === override.id)
	const toReplaceWith = Object.assign({}, list2018[inOriginalList] ?? {}, override)
	if (inOriginalList >= 0) {
		list2018.splice(1, 1, toReplaceWith)
	} else {
		list2018.push(toReplaceWith)
	}

	return list2018
}

export function ensureSortedByNumber(list2018: PokemonData[], list2024: PokemonData[]): PokemonData[] {
	const numbers = new Map(list2024.map(({ id, number }) => [id, number]));

	return [...list2018].sort(
		(a, b) => (numbers.get(a.id) ?? Infinity) - (numbers.get(b.id) ?? Infinity)
	)
}
