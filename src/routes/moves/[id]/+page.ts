import { Move } from "$lib/moves/Move"
import { SrdClient } from "$lib/srd"
import type { PageLoad } from "./$types"

export const load: PageLoad = async ({ fetch, params }) => {
	const value = await SrdClient.forEachEdition(async (client) => {
		const [move, contest, tms] = await Promise.all([
			client.moves.one(params.id),
			client.contest.one(params.id),
			client.tms.all(),
		])

		const tm = tms.values.find((it) => it.move === params.id)
		const effect = contest != null ? await client.contestEffects.one(contest.effect) : undefined

		return Move.fromJson(move, { contest, contestEffect: effect, tm })
	}, fetch)

	return {
		value,
	}
}
