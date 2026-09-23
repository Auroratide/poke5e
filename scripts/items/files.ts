import path from "node:path"
import fs from "node:fs/promises"

export type ItemSrdData = {
	id: string,
	name: string,
	type: string,
	cost: number | null,
	description: string,
	media: {
		sprite: string | null,
	},
	updated?: {
		tag: string,
		details: string,
	},
}

const srdPath = (edition: string) => path.join("src", "lib", "srd", "data", edition, "items", "en.json")

export async function getItemSrd(edition: string = "2024"): Promise<ItemSrdData[]> {
	const raw = await fs.readFile(srdPath(edition), { encoding: "utf-8" })

	return JSON.parse(raw).values
}

export async function writeItemSrd(data: ItemSrdData[], edition: string = "2024") {
	const raw = JSON.stringify({ values: data }, null, "\t")

	await fs.writeFile(srdPath(edition), raw, { encoding: "utf-8" })
}
