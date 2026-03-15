import fs from "node:fs/promises"
import path from "node:path"

// example media url: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png

const ASSETS_ITEM_PATH = path.join("static", "assets", "items")

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
	const destPath = path.join(path.join(ASSETS_ITEM_PATH, pokemonId), filename)
	await downloadFile(url, destPath)
}

async function processItem(name: string, id: string) {
	await download(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`, id, "sprite")
}

/**
 * Usage: node scripts/assets/get-one-item.ts blue-orb blue-orb
 */
async function main() {
	const name = process.argv[2]
	const id = process.argv[3]

	try {
		await processItem(name, id)
		console.log('\n=== Download Complete ===')
	} catch (error) {
		console.error('Fatal error:', error)
		process.exit(1)
	}
}

main()
