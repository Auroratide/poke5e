import { derived, readable, writable, type Readable } from "svelte/store"
import { Move } from "./Move"
import type { Tm } from "./tms/Tm"
import type { Data } from "$lib/DataClass"
import { TmDetails } from "./tms/TmDetails"
import { Url } from "$lib/site/url"

export const MovesStore = readable<Move[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(Url.api.moves())
			.then(res => res.json())
			.then(data => data.moves)
			.then((moves: Data<Move>[]) => moves.map((it) => new Move(it)))
			.then((moves) => set(moves))
	}
})

export const TmsStore: Readable<Tm[]> = derived(MovesStore, (moves) => {
	return moves
		?.filter((it) => it.isTm())
		.sort(TmDetails.byTmId)
})

export const MovesFilterStore = writable("")
export const MovesSorterStore = writable(() => 0)

export const TmsFilterStore = writable("")
export const TmsSorterStore = writable(() => 0)
