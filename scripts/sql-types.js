/**
 * This creates a sql statement that creates a reference table of pokemon
 * to their usual type. The table is meant to be joined on.
 */
import * as path from "path"
import * as fs from "fs/promises"

const POKEMON_IN = path.join("static", "data", "pokemon-v2.json")
const SQL_OUT = path.join("supabase", "migrations", "20251121150215_regenerate_species_info.sql")
const EXCLUDED_FAKEMON = [
	"rookite",
	"belseraph",
	"droideon",
	"brawleon",
	"specteon",
	"toxeon",
	"minereon",
	"aereon",
	"pesteon",
	"terreon",
	"drakeon",
	"eeveon",
]

const INSERT_INTO = `INSERT INTO private.species_info
	(id, type)
VALUES
{{FRAGMENTS}}
ON CONFLICT (id) DO NOTHING;`

const jsonToObj = (json) => JSON.parse(json)
const addQuotes = (it) => `'${it}'`
const toFile = (filePath) => (statement) => fs.writeFile(filePath, statement, { encoding: "utf-8" })

const ignoreFakemon = (items) => 
	items.filter((it) => !EXCLUDED_FAKEMON.includes(it.id))

const createInsertFragments = (items) => {
	return items.map((it) => `\t('${it.id}', ARRAY[${it.type.map(addQuotes).join(", ")}])`)
}

const createInsertStatement = (fragments) => INSERT_INTO.replace("{{FRAGMENTS}}", fragments.join(",\n"))

fs.readFile(POKEMON_IN, { encoding: "utf-8" })
	.then(jsonToObj)
	.then(obj => obj.items)
	.then(ignoreFakemon)
	.then(createInsertFragments)
	.then(createInsertStatement)
	.then(toFile(SQL_OUT))
	.then(() => console.log("\nFinished!"))
