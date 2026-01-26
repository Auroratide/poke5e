import fs from "node:fs/promises"
import path from "node:path"

const MOVES_PATH = path.join("static", "data", "moves.json")

type Move = {
	id: string,
}

async function readJsonFile(filePath: string) {
	return JSON.parse(await fs.readFile(filePath, { encoding: "utf-8" }))
}

async function getListOfMovesFromPokemonApi(): Promise<Move[]> {
	const response = await fetch("https://pokeapi.co/api/v2/move?limit=10000")
	const data = await response.json()
	
	return data.results.map((move: { name: string }) => ({
		id: move.name
	}))
}

function getMovesInApiButNotInMyFile(movesFromFile: Move[], movesFromApi: Move[]): Move[] {
	const fileMovesSet = new Set(movesFromFile.map(move => move.id))
	
	return movesFromApi.filter(move => !fileMovesSet.has(move.id))
}

async function main() {
	const fileMoves: Move[] = (await readJsonFile(MOVES_PATH)).moves
	const apiMoves: Move[] = await getListOfMovesFromPokemonApi()

	const missingMoves = getMovesInApiButNotInMyFile(fileMoves, apiMoves)

	missingMoves.forEach((it) => {
		console.log(it.id)
	})
}

main()
