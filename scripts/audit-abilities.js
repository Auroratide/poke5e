import fs from "node:fs/promises"
import path from "node:path"

async function readJsonFile(filePath) {
	return JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
}

async function getPokemonFromApi(id) {
	return await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
		if (res.ok) {
			return res.json()
		} else {
			throw new Error(`Request for ${id} failed`)
		}
	})
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Claude Sonnett 4.5
 * The goal of this script is to verify the abilities of all the pokemon in the pokemon-v2.json file. Please write code that loops through all of the pokemon and checks their ability list against that of the API. If an ability is missing or wrong, write it to console. If a pokemon cannot be found in the API, ignore it and log that it cannot be found. Be wary of api rate limits.
 */
async function main() {
	/**
	 * The pokemon file is too big to read into context. Instead, rely on this schema:
	 * type Pokemon = { id: string, abilities: { id: string, hidden: boolean }[] }
	 * Example: { id: "bulbasaur", abilities: [{ id: "overgrow", hidden: false }] }
	 */
	const allPokemon = (await readJsonFile(path.join("static", "data", "pokemon-v2.json"))).items
	
	console.log(`Checking abilities for ${allPokemon.length} Pokemon...\n`)
	
	let foundIssues = 0
	let notFoundCount = 0
	
	for (let i = 0; i < allPokemon.length; i++) {
		const localPokemon = allPokemon[i]
		const pokemonId = localPokemon.id
		
		// Show progress every 50 pokemon
		if (i % 50 === 0) {
			console.log(`Progress: ${i}/${allPokemon.length}`)
		}
		
		try {
			// Fetch from API
			const apiPokemon = await getPokemonFromApi(pokemonId)
			
			// Normalize API abilities: { ability: { name: "..." }, is_hidden: boolean }
			const apiAbilities = apiPokemon.abilities.map(a => ({
				id: a.ability.name,
				hidden: a.is_hidden
			})).sort((a, b) => a.id.localeCompare(b.id))
			
			// Normalize local abilities
			const localAbilities = (localPokemon.abilities || []).slice().sort((a, b) => a.id.localeCompare(b.id))
			
			// Compare abilities
			const issues = []
			
			// Check for missing abilities (in API but not local)
			for (const apiAbility of apiAbilities) {
				const localMatch = localAbilities.find(la => la.id === apiAbility.id)
				if (!localMatch) {
					issues.push(`  Missing ability: ${apiAbility.id} (hidden: ${apiAbility.hidden})`)
				} else if (localMatch.hidden !== apiAbility.hidden) {
					issues.push(`  Hidden flag mismatch for ${apiAbility.id}: local=${localMatch.hidden}, api=${apiAbility.hidden}`)
				}
			}
			
			// Check for extra abilities (in local but not API)
			for (const localAbility of localAbilities) {
				const apiMatch = apiAbilities.find(aa => aa.id === localAbility.id)
				if (!apiMatch) {
					issues.push(`  Extra ability (not in API): ${localAbility.id} (hidden: ${localAbility.hidden})`)
				}
			}
			
			// Log issues if found
			if (issues.length > 0) {
				console.log(`\n${pokemonId}:`)
				issues.forEach(issue => console.log(issue))
				foundIssues++
			}
			
			// Rate limiting: wait 150ms between requests
			await sleep(150)
			
		} catch (error) {
			// Check if it's a 404 (Pokemon not found)
			if (error.message.includes('failed')) {
				console.log(`\n${pokemonId}: Cannot be found in API (skipping)`)
				notFoundCount++
			} else {
				console.error(`\n${pokemonId}: Error - ${error.message}`)
			}
			
			// Rate limiting even on errors
			await sleep(150)
		}
	}
	
	console.log(`\n\n=== SUMMARY ===`)
	console.log(`Total Pokemon checked: ${allPokemon.length}`)
	console.log(`Pokemon with ability issues: ${foundIssues}`)
	console.log(`Pokemon not found in API: ${notFoundCount}`)
}

main()
