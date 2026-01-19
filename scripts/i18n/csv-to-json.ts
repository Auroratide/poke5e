import fs from "node:fs/promises"
import path from "node:path"
import { parse } from "csv-parse/sync"

async function getEnglish(resource: string): Promise<any[]> {
	const json = await fs.readFile(path.join("static", "data", `${resource}.json`), { encoding: "utf-8" })
	const obj = JSON.parse(json)

	return Object.values(obj)[0] as object[]
}

async function getCsv(locale: string, resource: string): Promise<any[]> {
	const csv = await fs.readFile(path.join("scripts", "i18n", locale, `${resource}.csv`), { encoding: "utf-8" })
	
	const [header, ...rows] = parse(csv)
	return rows.map((row) => header.reduce((obj, h, i) => ({
		...obj,
		[h]: h === "description" ? row[i].split("\n").filter((it) => it.trim().length > 0) : row[i],
	}), {}))
}

async function writeTranslated(locale: string, resource: string, list: any[]) {
	const json = JSON.stringify({ items: list }, null, "\t")

	await fs.writeFile(path.join("static", "data", locale, `${resource}.json`), json, { encoding: "utf-8" })
}

/**
 * Usage: node scripts/i18n/csv-to-json.ts <locale> <resource_name>
 * Example: node scripts/i18n/csv-to-json.ts es items
 */
async function main() {
	const locale = process.argv[2]
	const resourceName = process.argv[3]

	if (locale == null || resourceName == null) throw new Error("You're missing locale and/or resource name")

	const english = await getEnglish(resourceName)
	const csv = await getCsv(locale, resourceName)

	// for each in en, find the csv row. if exists, 
	const translated = []
	for (const item of english) {
		const inCsv = csv.find((it) => it.en === item.name)
		if (inCsv) {
			const { en, ...values } = inCsv
			translated.push({
				id: item.id,
				...values,
			})
		}
	}

	await writeTranslated(locale, resourceName, translated)
}

main()