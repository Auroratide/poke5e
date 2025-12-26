import { derived, readable, writable, type Readable } from "svelte/store"
import { resolve } from "$app/paths"
import { Move } from "./Move"
import type { Tm } from "./Tm"
import type { Data } from "$lib/DataClass"
import { TmDetails } from "./TmDetails"

export const MovesStore = readable<Move[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(resolve("/moves.json"))
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
