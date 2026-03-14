import fs from "node:fs/promises"
import path from "node:path"

// example media url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png

type PokemonJsonFile = {
	items: {
		id: string,
		media: {
			main?: string,
			mainShiny?: string,
			sprite?: string,
			spriteShiny?: string,
		}
	}[]
}

type ItemsJsonFile = {
	items: {
		id: string,
		media: {
			sprite?: string,
		}
	}[]
}

const POKEMON_PATH = path.join("static", "data", "pokemon.json")
const ITEMS_PATH = path.join("static", "data", "items.json")
const ASSETS_POKEMON_PATH = path.join("static", "assets", "pokemon")
const ASSETS_ITEMS_PATH = path.join("static", "assets", "items")

async function readJsonFile(filePath: string) {
	const text = await fs.readFile(filePath, { encoding: "utf-8" })
	const cleaned = text.replace(/^\uFEFF/, '')

	return JSON.parse(cleaned)
}

/**
 * Examples:
 * `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png` will become `/assets/pokemon/{id}/main.png`
 * `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/1.png` will become `/assets/pokemon/{id}/main-shiny.png`
 * `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png` will become `/assets/pokemon/{id}/sprite.png`
 * `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png` will become `/assets/pokemon/{id}/sprite-shiny.png`
 */

function getFileExtension(url: string): string {
	const match = url.match(/\.([a-z0-9]+)(?:[?#]|$)/i)
	return match ? `.${match[1]}` : '.png'
}

async function downloadFile(url: string, destPath: string): Promise<boolean> {
	try {
		// Check if file already exists
		try {
			await fs.access(destPath)
			console.log(`  ✓ Skipping (already exists): ${destPath}`)
			return true
		} catch {
			// File doesn't exist, proceed with download
		}

		const response = await fetch(url)
		if (!response.ok) {
			console.error(`  ✗ Failed to download ${url}: ${response.status} ${response.statusText}`)
			return false
		}

		const buffer = Buffer.from(await response.arrayBuffer())
		
		// Ensure directory exists
		const dir = path.dirname(destPath)
		await fs.mkdir(dir, { recursive: true })
		
		await fs.writeFile(destPath, buffer)
		console.log(`  ✓ Downloaded: ${destPath}`)
		return true
	} catch (error) {
		console.error(`  ✗ Error downloading ${url}:`, error)
		return false
	}
}

async function processPokemon() {
	console.log('\n=== Processing Pokemon ===')
	const data = await readJsonFile(POKEMON_PATH) as PokemonJsonFile
	
	let downloaded = 0
	let failed = 0
	let skipped = 0

	for (const pokemon of data.items) {
		console.log(`\nProcessing Pokemon: ${pokemon.id}`)
		const pokemonDir = path.join(ASSETS_POKEMON_PATH, pokemon.id)

		// Process main image
		if (pokemon.media.main) {
			const ext = getFileExtension(pokemon.media.main)
			const filename = `main${ext}`
			const destPath = path.join(pokemonDir, filename)
			const success = await downloadFile(pokemon.media.main, destPath)
			if (success) {
				pokemon.media.main = `/assets/pokemon/${pokemon.id}/${filename}`
				downloaded++
			} else {
				failed++
			}
		}

		// Process main shiny image
		if (pokemon.media.mainShiny) {
			const ext = getFileExtension(pokemon.media.mainShiny)
			const filename = `main-shiny${ext}`
			const destPath = path.join(pokemonDir, filename)
			const success = await downloadFile(pokemon.media.mainShiny, destPath)
			if (success) {
				pokemon.media.mainShiny = `/assets/pokemon/${pokemon.id}/${filename}`
				downloaded++
			} else {
				failed++
			}
		}

		// Process sprite image
		if (pokemon.media.sprite) {
			const ext = getFileExtension(pokemon.media.sprite)
			const filename = `sprite${ext}`
			const destPath = path.join(pokemonDir, filename)
			const success = await downloadFile(pokemon.media.sprite, destPath)
			if (success) {
				pokemon.media.sprite = `/assets/pokemon/${pokemon.id}/${filename}`
				downloaded++
			} else {
				failed++
			}
		}

		// Process sprite shiny image
		if (pokemon.media.spriteShiny) {
			const ext = getFileExtension(pokemon.media.spriteShiny)
			const filename = `sprite-shiny${ext}`
			const destPath = path.join(pokemonDir, filename)
			const success = await downloadFile(pokemon.media.spriteShiny, destPath)
			if (success) {
				pokemon.media.spriteShiny = `/assets/pokemon/${pokemon.id}/${filename}`
				downloaded++
			} else {
				failed++
			}
		}
	}

	// Write updated JSON
	await fs.writeFile(POKEMON_PATH, JSON.stringify(data, null, "\t"), { encoding: 'utf-8' })
	console.log('\n✓ Updated pokemon.json')
	console.log(`Pokemon Summary: ${downloaded} downloaded/skipped, ${failed} failed`)
}

async function processItems() {
	console.log('\n=== Processing Items ===')
	const data = await readJsonFile(ITEMS_PATH) as ItemsJsonFile
	
	let downloaded = 0
	let failed = 0
	let skipped = 0

	for (const item of data.items) {
		console.log(`\nProcessing Item: ${item.id}`)
		const itemDir = path.join(ASSETS_ITEMS_PATH, item.id)

		// Process sprite image
		if (item.media.sprite) {
			const ext = getFileExtension(item.media.sprite)
			const filename = `sprite${ext}`
			const destPath = path.join(itemDir, filename)
			const success = await downloadFile(item.media.sprite, destPath)
			if (success) {
				item.media.sprite = `/assets/items/${item.id}/${filename}`
				downloaded++
			} else {
				failed++
			}
		}
	}

	// Write updated JSON
	await fs.writeFile(ITEMS_PATH, JSON.stringify(data, null, "\t"), { encoding: 'utf-8' })
	console.log('\n✓ Updated items.json')
	console.log(`Items Summary: ${downloaded} downloaded/skipped, ${failed} failed`)
}

async function main() {
	try {
		await processPokemon()
		await processItems()
		console.log('\n=== Localization Complete ===')
	} catch (error) {
		console.error('Fatal error:', error)
		process.exit(1)
	}
}

main()
