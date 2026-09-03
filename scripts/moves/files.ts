import path from "node:path"
import fs from "node:fs/promises"

export type MoveData = {
	id: string, // eg. tackle
	name: string,
	type: string,
	power: string | string[]
	time: string,
	pp: number,
	duration: string,
	range: string,
	description: (string | object)[],
	higherLevels?: string,
	damage?: {
		dice: {
			"1": string,
			"5": string,
			"10": string,
			"17": string,
		},
		modifier: number | string,
		type: string[] | string,
	},
	attack?: {
		scope: "melee" | "ranged"
	},
	save?: {
		attribute: string[],
		dc: string,
	},
	beta?: boolean,
	optional?: string[],
	tm?: {
		id: number,
		cost: number,
	},
	categories?: string[],
}

export type MoveSrdData = {
	id: string,
	name: string,
	type: string,
	power: string | string[]
	time: {
		unit: string
	},
	pp: number,
	duration: {
		unit: string,
		value?: number,
		concentration?: boolean,
	},
	range: {
		type: string,
		unit?: string,
		value?: number,
		reach?: {
			unit: string,
			value: number,
		}
	},
	shape?: {
		type: string,
		unit: string,
		value: number,
	},
	table?: object,
	description: string,
	higherLevels?: string,
	dice?: {
		class: string,
		tiers?: [string, string, string, string],
		modifier: string,
		type: string,
	},
	attack?: {
		scope: "melee" | "ranged"
	},
	save?: {
		attribute: string,
	},
	beta?: boolean,
	optional?: string,
	tm?: {
		id: number,
		cost: number,
	},
	categories?: string[],
}

const PATH = path.join("static", "data", "moves.json")
const SRD_PATH = path.join("src", "lib", "srd", "data", "2024", "moves", "en.json")

export async function getMoveData(): Promise<MoveData[]> {
	const raw = await fs.readFile(PATH, { encoding: "utf-8" })

	return JSON.parse(raw).moves
}

export async function writeMoveData(data: MoveData[]) {
	const raw = JSON.stringify({ moves: data }, null, "\t")

	await fs.writeFile(PATH, raw, { encoding: "utf-8" })
}

export async function writeMoveSrd(data: MoveSrdData[]) {
	const raw = JSON.stringify({ values: data }, null, "\t")

	await fs.writeFile(SRD_PATH, raw, { encoding: "utf-8" })
}
