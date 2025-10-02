import type { Move, Tm } from "./types"
import { derived, readable, writable } from "svelte/store"
import { base } from "$app/paths"

export const moves = readable<Move[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/moves.json`)
			.then(res => res.json())
			.then(data => set(data.moves))
	}
})

export const tms = readable<Tm[]>(undefined, (set) => {
	if (typeof window !== "undefined") {
		fetch(`${base}/tms.json`)
			.then(res => res.json())
			.then(data => set(data.items))
	}
})

export const tmMoves = derived([moves, tms], ([moves, tms]) => {
	return tms?.map((tm) => {
		const move = moves?.find((it) => it.id === tm.moveInfo.id)
		return {
			...move,
			id: tm.id.toString(),
			name: tm.moveInfo.name,
		}
	})
})

export const filterValue = writable("")
export const currentSorter = writable(() => 0)

export const filterTmValue = writable("")
export const currentTmSorter = writable(() => 0)
