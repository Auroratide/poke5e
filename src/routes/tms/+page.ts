import type { PageLoad } from "./$types"
import { base } from "$app/paths"
import { Move } from "$lib/moves/Move"
import type { Tm } from "$lib/moves/Tm"
import type { Data } from "$lib/DataClass"
import { TmDetails } from "$lib/moves/TmDetails"

export const load: PageLoad = async ({ fetch }) => {
	const tms: Tm[] = await fetch(`${base}/moves.json`)
		.then((res) => res.json())
		.then((data) => data.moves)
		.then((moves: Data<Move>[]) => moves.map((it) => new Move(it)))
		.then((moves) => moves.filter((it) => it.isTm()))
		.then((tms) => tms.sort(TmDetails.byTmId))

	return { tmsList: tms }
}
