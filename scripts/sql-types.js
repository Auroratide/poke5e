/**
 * This creates a sql statement that creates a reference table of pokemon
 * to their usual type. The table is meant to be joined on.
 */
import * as path from 'path'
import * as fs from 'fs/promises'

const POKEMON_IN = path.join('static', 'data', 'pokemon.json')
const SQL_OUT = path.join('db', 'migrations', '00017_add-types-table.sql')

const CREATE_TABLE = `CREATE TABLE private.species_info (
    id VARCHAR(255) PRIMARY KEY,
    type VARCHAR(255)[] NOT NULL
);`

const INSERT_INTO = `INSERT INTO private.species_info
    (id, type)
VALUES
{{FRAGMENTS}};`

const jsonToObj = (json) => JSON.parse(json)
const addQuotes = (it) => `'${it}'`
const toFile = (filePath) => (statement) => fs.writeFile(filePath, statement, { encoding: 'utf-8' })

const createInsertFragments = (items) => {
    return items.map((it) => `    ('${it.id}', ARRAY[${it.type.map(addQuotes).join(', ')}])`)
}

const createInsertStatement = (fragments) => INSERT_INTO.replace('{{FRAGMENTS}}', fragments.join(',\n'))

const prependTableStatement = (insertStatement) => `${CREATE_TABLE}\n\n${insertStatement}`

fs.readFile(POKEMON_IN, { encoding: 'utf-8' })
    .then(jsonToObj)
    .then(obj => obj.items)
    .then(createInsertFragments)
    .then(createInsertStatement)
    .then(prependTableStatement)
    .then(toFile(SQL_OUT))
    .then(() => console.log(`\nFinished!`))
