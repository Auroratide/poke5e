import type { RequestHandler } from "./$types"
import moves from "../../../../static/data/moves.json"
import tms from "../../../../static/data/tms.json"
import pokemon from "../../../../static/data/pokemon.json"

export const GET: RequestHandler = async ({ params }) => {
	const selected = tms.tms.find(it => it.id === parseInt(params.id))
	const move = moves.moves.find(it => it.id === selected.move)
	const pokemonThatCanLearnThis = pokemon.items.filter(it =>
		it.moves.tm?.some(tm => tm === selected.id) ?? false,
	)

	if (selected !== undefined) {
		return new Response(JSON.stringify({
			...selected,
			moveInfo: {
				...move,
				name: `${selected.id} - ${move.name}`,
			},
			pokemon: pokemonThatCanLearnThis.map(it => ({
				id: it.id,
				name: it.name,
			})),
		}), {
			status: 200,
		})
	} else {
		return new Response(null, { status: 404 })
	}
}
