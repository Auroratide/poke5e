import type { PageLoad } from "./$types"
import { Url } from "$lib/site/url"
import type { Data } from "$lib/DataClass"
import { Move } from "$lib/moves/Move"
import { TmDetails, type Tm } from "$lib/moves/tms"

export const load: PageLoad = async ({ fetch }) => {
	const tms: Tm[] = await fetch(Url.api.moves())
			.then((res) => res.json())
			.then((data) => data.moves)
			.then((moves: Data<Move>[]) => moves.map((it) => new Move(it)))
			.then((moves) => moves.filter((it) => it.isTm()))
			.then((tms) => tms.sort(TmDetails.byTmId))

		return { tmList: tms }
}
