import type { PageServerLoad } from "./$types"
import { SrdClient } from "$lib/srd"

export const load: PageServerLoad = async ({ fetch }) => {
	const tms = await SrdClient.forEachEdition(async (client) => {
		const [tms, moves] = await Promise.all([
			client.tms.all(),
			client.moves.all(),
		])

		const nameByMove = new Map(moves.values.map((it) => [it.id, it.name]))

		return tms.values
			.map((it) => ({
				id: it.id,
				name: nameByMove.get(it.move) ?? it.move,
				cost: it.cost,
			}))
			.sort((a, b) => a.id - b.id)
	}, fetch)

	return { tms }
}
