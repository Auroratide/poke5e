import path from "node:path"
import fs from "node:fs/promises"
import { writeItemSrd, type ItemSrdData } from "./files.ts"
import { superconsole } from "../superconsole.ts"

/**
 * This converts the old format of items to the SRD format. Namely,
 * - beta becomes updated (new, this item updated)
 * - description becomes a single markdown string rather than a list of strings
 * - all items with null description and ingameeffect get split off into a new file for later
 */

/** The item shape as it was before the SRD conversion. */
type ItemData = {
	id: string,
	name: string,
	type: string,
	cost: number | null,
	beta?: boolean,
	description: string[] | null,
	media: {
		sprite: string | null,
	},
	_ingameEffect?: string,
}

const itemsDir = path.join("src", "lib", "srd", "data", "2024", "items")

const isPending = (item: ItemData): boolean => item.description == null

// Keys follow the order they are declared in ItemSrdData.
const convert = (item: ItemData & { description: string[] }): ItemSrdData => ({
	id: item.id,
	name: item.name,
	type: item.type,
	cost: item.cost,
	description: item.description.join("\n\n"),
	media: item.media,
	updated: item.beta ? {
		tag: "New",
		details: "This item was recently updated.",
	} : undefined,
})

async function main() {
	// existing file is in srd/data/2024/items/en.json
	const raw = await fs.readFile(path.join(itemsDir, "en.json"), { encoding: "utf-8" })
	const items: ItemData[] = JSON.parse(raw).values

	if (items.some((item) => typeof item.description === "string")) {
		superconsole.failure("en.json already looks converted; nothing was written.")
		process.exitCode = 1
		return
	}

	const pending = items.filter(isPending)
	const converted = items
		.filter((item): item is ItemData & { description: string[] } => !isPending(item))
		.map(convert)

	await writeItemSrd(converted)
	await fs.writeFile(
		path.join(itemsDir, "pending.json"),
		JSON.stringify({ values: pending }, null, "\t"),
		{ encoding: "utf-8" },
	)

	superconsole.log(`updated   ${converted.filter((it) => it.updated != null).length}`)
	superconsole.log(`pending   ${pending.length} (${pending.filter((it) => it._ingameEffect != null).length} with an in-game effect)`)
	superconsole.success(`\nConverted ${converted.length} items!`)
}

main()
