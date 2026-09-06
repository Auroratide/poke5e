import type { EntryGenerator, PageServerLoad } from "./$types"
import { error } from "@sveltejs/kit"
import { DEFAULT_SRD_EDITION } from "$lib/site/edition"
import { SrdClient } from "$lib/srd"
import { TmsSrd } from "$lib/srd/tms/server"

/**
 * TM pages used to be found by crawling the TM reference table. Generating them
 * from the data instead keeps them prerendered no matter what links to them.
 */
export const entries: EntryGenerator = () => TmsSrd.ids().map((id) => ({ id }))

/**
 * A TM names its move, so the page is a TM plus that move, plus the contest the
 * move belongs to — three SRD resources joined into the one Move the components
 * expect.
 *
 * Contests are read as a list rather than by id because most moves have no
 * contest entry, and asking for one that does not exist is a 404.
 */
export const load: PageServerLoad = async ({ fetch, params }) => {
	const value = await SrdClient.forEachEdition(async (client) => {
		const tm = await client.tms.one(params.id)
		if (tm == null) return undefined

		const [move, contests, effects] = await Promise.all([
			client.moves.one(tm.move),
			client.contest.all(),
			client.contestEffects.all(),
		])
		if (move == null) return undefined

		const contest = contests.values.find((it) => it.id === move.id)
		const effect = contest != null
			? effects.values.find((it) => it.id === contest.effect)
			: undefined

		return { move, contest, effect, tm }
	}, fetch)

	if (value[DEFAULT_SRD_EDITION] == null) error(404)

	return { value }
}
