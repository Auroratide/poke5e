import fs from "node:fs/promises"
import path from "node:path"

async function api(url) {
	return await fetch(url).then((res) => {
		if (res.ok) {
			return res.json()
		} else {
			throw new Error(`Request for ${url} failed`)
		}
	})
}

async function main() {
	const failed = []
	const cache = []

	const allItems = await api("https://pokeapi.co/api/v2/item?limit=10000")

	const printProgress = () => {
		process.stdout.clearLine(0)
		process.stdout.cursorTo(0)
		process.stdout.write(`${cache.length + failed.length} / ${allItems.count}`)
	}

	// slower, but let's not obliterate the api
	for (const item of allItems.results) {
		try {
			const itemData = await api(item.url)
			const {
				flavor_text_entries,
				game_indices,
				...removedUnusedKeys
			} = itemData
			removedUnusedKeys.names = removedUnusedKeys.names.filter((it) => it.language.name === "en")
			cache.push(removedUnusedKeys)
		} catch (err) {
			failed.push({ name: item.name, error: err })
		} finally {
			printProgress()
		}
	}

	await fs.writeFile(path.join("scripts", "items", "out", `cache.json`), JSON.stringify(cache, null, "\t"), { encoding: "utf-8" })

	console.log("\nDONE!")
	if (failed.length > 0) {
		console.log(`  ${failed.length} / ${allItems.count} Failed.`)
		failed.forEach((it) => {
			console.log(`  ${it.name}: ${it.error.message}`)
		})
	}
}

await main()
