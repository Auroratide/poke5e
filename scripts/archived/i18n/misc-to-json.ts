import fs from "node:fs/promises"
import path from "node:path"
import { parse } from "csv-parse/sync"

async function getEnglish(): Promise<object> {
	const json = await fs.readFile(path.join("messages", "en.json"), { encoding: "utf-8" })
	return JSON.parse(json)
}

async function getCsv(locale: string): Promise<any[]> {
	const csv = await fs.readFile(path.join("scripts", "i18n", locale, "misc.csv"), { encoding: "utf-8" })
	
	const [header, ...rows] = parse(csv)
	return rows.map((row) => header.reduce((obj, h, i) => {
		if (row[i].trim().length === 0) return obj

		return {
			...obj,
			[h]: row[i],
		}
	}, {}))
}

async function writeTranslated(locale: string, obj: object) {
	const json = JSON.stringify(obj, null, "\t")

	await fs.writeFile(path.join("messages", `${locale}-draft.json`), json, { encoding: "utf-8" })
}

/**
 * Usage: node scripts/i18n/misc-to-json.ts <locale>
 */
async function main() {
	const locale = process.argv[2]

	if (locale == null) throw new Error("You're missing locale name")

	const english = await getEnglish()
	const csv = await getCsv(locale)

	const frEntries = []	

	for (const row of csv) {
		const enEntry = Object.entries(english).find((it) => it[1] === row.en)
		if (enEntry == null) {
			console.log("cannot find", row)
			continue
		}

		frEntries.push([enEntry[0], row[locale]])
	}

	const frJson = Object.fromEntries(frEntries)

	await writeTranslated(locale, frJson)
}

main()