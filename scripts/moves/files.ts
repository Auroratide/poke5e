import path from "node:path"
import fs from "node:fs/promises"

export type MoveData = {
	id: string, // eg. tackle
	name: string,
	type: string,
	categories?: string[]
	time: string,
	range: string,
	duration: string,
}

const PATH = path.join("static", "data", "moves.json")

export async function getMoveData(): Promise<MoveData[]> {
	const raw = await fs.readFile(PATH, { encoding: "utf-8" })

	return JSON.parse(raw).moves
}

export async function writeMoveData(data: MoveData[]) {
	const raw = JSON.stringify({ moves: data }, null, "\t")

	await fs.writeFile(PATH, raw, { encoding: "utf-8" })
}
