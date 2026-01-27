import fs from "node:fs/promises"
import path from "node:path"

const POKEAPI_PATH = path.join("scripts", "tms", ".pokeapi")

function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

type PokeApiListItem = {
	url: string,
}

type PokeApiPokemon = {
	id: number,
	moves: {
		move: {
			name: string,
		},
		version_group_details: {
			level_learned_at: number,
			move_learn_method: {
				name: string,
			},
		}[],
	}[]
}

/**
 * TMs must be cached first
 */
async function main() {
	await fs.mkdir(POKEAPI_PATH, { recursive: true })

	const listOfPokemon: PokeApiListItem[] = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5000")
		.then((res) => res.json())
		.then((json) => json.results)

	const pokemon: PokeApiPokemon[] = []
	
	const total = listOfPokemon.length
	let current = 0
	for (const apiPokemon of listOfPokemon) {
		const poke: PokeApiPokemon = await fetch(apiPokemon.url).then((res) => res.json())
		pokemon.push({
			id: poke.id,
			moves: poke.moves,
		})
		console.log(`${++current} / ${total}`)
		await wait(50)
	}

	await fs.writeFile(path.join(POKEAPI_PATH, "pokemon.json"), JSON.stringify({ pokemon }), { encoding: "utf-8" })
}

main()