import fs from "node:fs/promises"
import path from "node:path"

const Categories = {
	"stat-boosts": "medicine",
	"medicine": "berry",
	"type-protection": "berry",
	"evolution": "evolution",
	"held-items": "held item",
	"choice": "held item",
	"bad-held-items": "held item",
	"type-enhancement": "held item",
	"vitamins": "medicine",
	"healing": "medicine",
	"pp-recovery": "medicine",
	"revival": "medicine",
	"status-cures": "medicine",
	"special-balls": "pokeball",
	"standard-balls": "pokeball",
}

const inlistedCategories = Object.keys(Categories)

async function main() {
	const result = []

	const items = JSON.parse(await fs.readFile(path.join("scripts", "items", "out", "cache.json"), { encoding: "utf-8" }))

	for (const item of items) {
		if (!inlistedCategories.includes(item.category.name))
			continue

		const dndItem = {
			id: item.name,
			name: item.names[0]?.name,
			type: Categories[item.category.name],
			cost: item.cost === 0 ? null : item.cost,
			description: null,
			media: {
				sprite: item.sprites.default ?? null,
			},
			_ingameEffect: item.effect_entries[0]?.effect,
		}

		result.push(dndItem)
	}

	result.push(...manualEntries())

	await fs.writeFile(path.join("scripts", "items", "out", "items.json"), JSON.stringify({ items: result }, null, "\t"), { encoding: "utf-8" })

	console.log(`\nDONE! ${result.length} items made.`)
}

function manualEntries() {
	return [ {
		id: "arceus-plate",
		name: "Arceus Plate",
		type: "held item",
		cost: null,
		description: [
			"Changes the typing of Arceus and the move Judgement. Comes in 18 varieties, one for each pokémon type."
		],
		media: {
			sprite: null,
		},
	}, {
		id: "megalite-stone",
		name: "Megalite Stone",
		type: "held item",
		cost: null,
		description: ["Allows the Pokémon holding this to Mega Evolve. Has one charge, and recovers its charge at dawn each day."],
		media: {
			sprite: null,
		},
	}, {
		id: "z-crystal",
		name: "Z-Crystal",
		type: "held item",
		cost: null,
		description: ["Allows the Pokémon holding this to use a Z-Move. Has one charge, and recovers its charge at dawn each day."],
		media: {
			sprite: null,
		},
	} ]
}

await main()
