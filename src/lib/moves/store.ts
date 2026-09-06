import { derived, writable, type Readable } from "svelte/store"
import type { Tm } from "./tms/Tm"
import { TmDetails } from "./tms/TmDetails"
import type { Fetched } from "$lib/site/stores"
import { MovesStore } from "./MovesStore"

export { MovesStore }

export const TmsStore: Readable<Fetched<Tm[]>> = derived(MovesStore, ({ result, fetching, error }) => ({
	result: result
		?.filter((it) => it.isTm())
		.sort(TmDetails.byTmId),
	fetching,
	error,
}))

export const MovesFilterStore = writable("")
export const MovesSorterStore = writable(() => 0)

export const TmsFilterStore = writable("")
export const TmsSorterStore = writable(() => 0)
