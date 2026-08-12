/**
 * Generates compact locale overlays from the PokéAPI database CSV exports.
 * Generated files contain names only; never edit them by hand.
 * Source: https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { parse } from "csv-parse/sync"

const POKEAPI_COMMIT = "c0a9bc75af3a455cdfa27dde21e4ec95aedd3f25"
const SOURCE = `https://raw.githubusercontent.com/PokeAPI/pokeapi/${POKEAPI_COMMIT}/data/v2/csv`
const LANGUAGE_ID = 6 // German (`de`) in languages.csv
const locale = "de"

const categories = [
	["pokemon", "items", "pokemon_species", "pokemon_species_names"],
	["moves", "moves", "moves", "move_names"],
	["abilities", "items", "abilities", "ability_names"],
	["items", "items", "items", "item_names"],
]

const csv = async (name) => {
	const response = await fetch(`${SOURCE}/${name}.csv`)
	if (!response.ok) throw new Error(`Could not download ${name}.csv (${response.status})`)
	return parse(await response.text(), { columns: true, skip_empty_lines: true })
}

async function namesFor(entityCsv, namesCsv, foreignKey = `${entityCsv.replace(/s$/, "")}_id`) {
	const entities = await csv(entityCsv)
	const identifiers = new Map(entities.map(({ id, identifier }) => [id, identifier]))
	return new Map((await csv(namesCsv))
		.filter((row) => Number(row.local_language_id) === LANGUAGE_ID)
		.map((row) => [identifiers.get(row[foreignKey]), row.name]))
}

await mkdir(`static/data/${locale}`, { recursive: true })
await mkdir(`src/lib/site/i18n/canonical`, { recursive: true })

for (const [filename, rootKey, entities, names] of categories) {
	const source = JSON.parse(await readFile(`static/data/${filename}.json`, "utf8"))[rootKey]
	const foreignKey = entities === "pokemon_species" ? "pokemon_species_id"
		: entities === "abilities" ? "ability_id"
		: `${entities.replace(/s$/, "")}_id`
	const localized = await namesFor(entities, names, foreignKey)
	const items = source.flatMap(({ id, name }) => localized.has(id)
		? [{ id, name: localized.get(id), aliases: [name] }]
		: [])
	await writeFile(`static/data/${locale}/${filename}.json`, `${JSON.stringify({ [rootKey]: items }, null, "\t")}\n`)
}

const canonical = {}
for (const [kind, entities, names] of [["types", "types", "type_names"], ["natures", "natures", "nature_names"]]) {
	canonical[kind] = Object.fromEntries(await namesFor(entities, names))
}
await writeFile(`src/lib/site/i18n/canonical/${locale}.json`, `${JSON.stringify(canonical, null, "\t")}\n`)
