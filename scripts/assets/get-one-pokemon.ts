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

const ASSETS_POKEMON_PATH = path.join("static", "assets", "pokemon")

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

async function download(url: string, pokemonId: string, fileName: string) {
	const ext = getFileExtension(url)
	const filename = `${fileName}${ext}`
	const destPath = path.join(path.join(ASSETS_POKEMON_PATH, pokemonId), filename)
	await downloadFile(url, destPath)
}

async function processPokemon(num: string, id: string) {
	await download(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${num}.png`, id, "main")
	await download(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${num}.png`, id, "main-shiny")
	await download(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${num}.png`, id, "sprite")
	await download(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${num}.png`, id, "sprite-shiny")
}

/**
 * Usage: node scripts/assets/get-one-pokemon.ts 10021 landorus-therian
 */
async function main() {
	const num = process.argv[2]
	const id = process.argv[3]

	try {
		await processPokemon(num, id)
		console.log('\n=== Download Complete ===')
	} catch (error) {
		console.error('Fatal error:', error)
		process.exit(1)
	}
}

main()
