/**
 * Generates canonical Pokémon names from the PokéAPI database CSV exports.
 * Two kinds of output, both machine-owned; never edit them by hand:
 *
 *   - The `canonical` section of `messages/{locale}.json`, written for every locale so
 *     `pnpm machine-translate` never finds a gap to fill with a guessed translation.
 *   - Entity name overlays in `static/data/{locale}`, for DATA_LOCALES only.
 *
 * Source: https://github.com/PokeAPI/pokeapi/tree/master/data/v2/csv
 */
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { parse } from "csv-parse/sync"

const POKEAPI_COMMIT = "c0a9bc75af3a455cdfa27dde21e4ec95aedd3f25"
const SOURCE = `https://raw.githubusercontent.com/PokeAPI/pokeapi/${POKEAPI_COMMIT}/data/v2/csv`

/**
 * Locale to `languages.csv` id. Every locale with a message file belongs here, including
 * ones PokéAPI covers poorly: Portuguese (13, `pt-br`) has no type names at all and
 * Spanish is missing one, so those fall back to the English name rather than to nothing.
 */
const LANGUAGE_IDS = { en: 9, de: 6, es: 7, fr: 5, pt: 13 }

/**
 * Locales whose entity names come wholly from PokéAPI. Locales with hand-written overlays
 * must stay out of this list, since generating one replaces the whole file.
 */
const DATA_LOCALES = ["de"]

/** Mirrors PokemonTeraType.list; `canonical-names.test.ts` fails if the two drift apart. */
const TYPES = [
	"bug",
	"dark",
	"dragon",
	"electric",
	"fairy",
	"fighting",
	"fire",
	"flying",
	"ghost",
	"grass",
	"ground",
	"ice",
	"normal",
	"poison",
	"psychic",
	"rock",
	"steel",
	"water",
	"stellar",
]

const categories = [
	["pokemon", "items", "pokemon_species", "pokemon_species_names"],
	["moves", "moves", "moves", "move_names"],
	["abilities", "items", "abilities", "ability_names"],
	["items", "items", "items", "item_names"],
]

const downloads = new Map()

const csv = async (name) => {
	if (!downloads.has(name)) downloads.set(name, (async () => {
		const response = await fetch(`${SOURCE}/${name}.csv`)
		if (!response.ok) throw new Error(`Could not download ${name}.csv (${response.status})`)
		return parse(await response.text(), { columns: true, skip_empty_lines: true })
	})())

	return downloads.get(name)
}

async function namesFor(entityCsv, namesCsv, languageId, foreignKey = `${entityCsv.replace(/s$/, "")}_id`) {
	const entities = await csv(entityCsv)
	const identifiers = new Map(entities.map(({ id, identifier }) => [id, identifier]))
	return new Map((await csv(namesCsv))
		.filter((row) => Number(row.local_language_id) === languageId)
		.map((row) => [identifiers.get(row[foreignKey]), row.name]))
}

/** Keeps a message file's existing indentation and trailing newline. */
function serializeLike(original, value) {
	const indent = /\n([ \t]+)"/.exec(original)?.[1] ?? "\t"
	return JSON.stringify(value, null, indent) + (original.endsWith("\n") ? "\n" : "")
}

const englishTypes = await namesFor("types", "type_names", LANGUAGE_IDS.en)

for (const [locale, languageId] of Object.entries(LANGUAGE_IDS)) {
	const localizedTypes = await namesFor("types", "type_names", languageId)
	const types = Object.fromEntries(TYPES.map((type) => {
		const name = localizedTypes.get(type) ?? englishTypes.get(type)
		if (name == null) throw new Error(`PokéAPI has no English name for the type ${type}`)
		return [type, name]
	}))

	const path = `messages/${locale}.json`
	const original = await readFile(path, "utf8")
	const messages = JSON.parse(original)
	messages.canonical = { types }
	await writeFile(path, serializeLike(original, messages))
}

for (const locale of DATA_LOCALES) {
	await mkdir(`static/data/${locale}`, { recursive: true })

	for (const [filename, rootKey, entities, names] of categories) {
		const source = JSON.parse(await readFile(`static/data/${filename}.json`, "utf8"))[rootKey]
		const foreignKey = entities === "pokemon_species" ? "pokemon_species_id"
			: entities === "abilities" ? "ability_id"
			: `${entities.replace(/s$/, "")}_id`
		const localized = await namesFor(entities, names, LANGUAGE_IDS[locale], foreignKey)
		const items = source.flatMap(({ id }) => localized.has(id)
			? [{ id, name: localized.get(id) }]
			: [])
		await writeFile(`static/data/${locale}/${filename}.json`, `${JSON.stringify({ [rootKey]: items }, null, "\t")}\n`)
	}
}
