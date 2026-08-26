import { SrdClient } from "$lib/srd"
import { derived } from "svelte/store"
import { rulesVersion } from "../rules-version"
import { browser } from "$app/environment"
import { FeatureToggles } from "../FeatureToggles"
import type { Edition } from "$lib/srd/editions"

export type Fetched<T> = {
	result: T | undefined,
	fetching: boolean,
	error: Error | undefined
}

const DEFAULT_FETCHED = <T>(): Fetched<T> => ({ result: undefined, fetching: true, error: undefined })

type CachedEntry<T> = {
	edition: Edition,
	promise: Promise<T>,
	settled?: Fetched<T>,
}

export function srdStore<T>(load: (client: SrdClient) => Promise<T>) {
	let entry: CachedEntry<T> | undefined = undefined
	const entryFor = (edition: Edition): CachedEntry<T> => {
		if (entry == null || entry.edition !== edition) {
			const e = { edition } as CachedEntry<T>
			e.promise = load(new SrdClient(edition))
			e.promise
				.then((result) => {
					e.settled = { result, fetching: false, error: undefined }
				})
				.catch(() => {
					if (entry === e) entry = undefined
				})
			entry = e
		}

		return entry
	}

	return derived(rulesVersion, (edition, set) => {
		if (!browser) return

		// Always defer to 2018 until this becomes official
		const editionToUse = FeatureToggles.PreviewUpdatedMoves() ? edition : "2018"
		const e = entryFor(editionToUse)

		if (e.settled != null) {
			set(e.settled)
			return
		}

		let cancelled = false
		set(DEFAULT_FETCHED<T>())

		e.promise
			.then((result) => { if (!cancelled) set({ result, fetching: false, error: undefined }) })
			.catch((error) => { if (!cancelled) set({ result: undefined, fetching: false, error }) })

		return () => { cancelled = true }
	}, DEFAULT_FETCHED<T>())
}
