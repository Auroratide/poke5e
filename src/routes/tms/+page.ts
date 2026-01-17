import type { PageLoad } from "./$types"
import { Move } from "$lib/moves/Move"
import type { Tm } from "$lib/moves/tms/Tm"
import type { Data } from "$lib/DataClass"
import { TmDetails } from "$lib/moves/tms/TmDetails"
import { Url } from "$lib/site/url"

export const load: PageLoad = async ({ fetch }) => {
	const tms: Tm[] = await fetch(Url.api.moves())
		.then((res) => res.json())
		.then((data) => data.moves)
		.then((moves: Data<Move>[]) => moves.map((it) => new Move(it)))
		.then((moves) => moves.filter((it) => it.isTm()))
		.then((tms) => tms.sort(TmDetails.byTmId))

	return { tmsList: tms }
}
