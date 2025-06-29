import fs from "node:fs/promises"
import path from "node:path"

async function main() {
	const pokemon = JSON.parse(await fs.readFile(path.join("static", "data", "pokemon.json"), { encoding: "utf-8" })).items
	const moves = JSON.parse(await fs.readFile(path.join("static", "data", "moves.json"), { encoding: "utf-8" })).moves

	pokemon.forEach((pokemon) => {
		const allPokemonMoves = [].concat(
			pokemon.moves.start ?? [],
			pokemon.moves.level2 ?? [],
			pokemon.moves.level6 ?? [],
			pokemon.moves.level10 ?? [],
			pokemon.moves.level14 ?? [],
			pokemon.moves.level18 ?? [],
			pokemon.moves.egg ?? [],
		)

		const missingMoves = allPokemonMoves.filter((pokemonMove) => moves.find((move) => move.id === pokemonMove) == null)

		missingMoves.forEach((missingMove) => {
			console.log(`${pokemon.id} is missing ${missingMove}`)
		})
	})
}

main()