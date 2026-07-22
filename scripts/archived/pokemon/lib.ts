import fs from "node:fs/promises"
import path from "node:path"

export type Pokemon = {
	id: string,
	number: number,
	name: string,
	hitDice: string,
	minLevel: number,
	hp: number,
	sr: number,
	attributes: {
		str: number,
		dex: number,
		con: number,
		int: number,
		wis: number,
		cha: number,
	},
}

const FILE_PATH = path.join("static", "data", "pokemon.json")

export async function getPokemon(): Promise<Pokemon[]> {
	const file = await fs.readFile(FILE_PATH, { encoding: "utf-8" })
	return JSON.parse(file).items
}

export async function writePokemon(pokemon: Pokemon[]) {
	const data = JSON.stringify({ items: pokemon }, null, "\t")
	await fs.writeFile(FILE_PATH, data, { encoding: "utf-8" })
}

export function hitDiceAsInt(hitDice: string): number {
	return parseInt(hitDice.slice(1))
}

export function modifier(score: number): number {
	return Math.floor(score / 2) - 5
}
