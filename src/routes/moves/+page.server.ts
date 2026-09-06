import type { PageServerLoad } from "./$types"
import { MoveListing } from "$lib/moves/MoveListing"
import { DEFAULT_SRD_EDITION } from "$lib/site/edition"
import { SrdClient } from "$lib/srd"

export const load: PageServerLoad = async ({ fetch }) => {
	const client = new SrdClient(DEFAULT_SRD_EDITION, fetch)

	const [moves, contests] = await Promise.all([
		client.moves.all(),
		client.contest.all(),
	])

	const contestByMove = new Map(contests.values.map((it) => [it.id, it]))

	return {
		movesList: moves.values.map((it) => MoveListing.project(it, contestByMove.get(it.id))),
	}
}
