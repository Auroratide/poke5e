async function wait(n) {
	return new Promise((resolve) => setTimeout(resolve, n))
}

async function main() {
	const allMoves = await fetch("https://poke5e.app/moves.json")
		.then((res) => res.json())
		.then((data) => data.moves)

	for (const move of allMoves) {
		const deets = await fetch(`https://poke5e.app/moves/${move.id}.json`).then((res) => res.json())

		if (deets.pokemon.length <= 0) {
			console.log(deets.id)
		}

		await wait(50)
	}
}

main()
