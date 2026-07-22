import * as path from "path"
import * as fs from "fs/promises"

const evolutionJsonPath = path.join("static", "data", "evolution.json")
const jsonToObj = (json) => JSON.parse(json)

const addIds = (items) => items.map((it) => ({
	id: `${it.from}-to-${it.to}`,
	...it,
}))

const listIntoObject = (items) => ({ items })

const toFile = (filePath) => (obj) => fs.writeFile(filePath, JSON.stringify(obj, null, "\t"), { encoding: "utf-8" })

fs.readFile(evolutionJsonPath, { encoding: "utf-8" })
	.then(jsonToObj)
	.then(obj => obj.items)
	.then(addIds)
	.then(listIntoObject)
	.then(toFile(evolutionJsonPath))
	.then(() => console.log("Finished."))
