import { SrdClient } from "$lib/srd"
import { derived, type Readable } from "svelte/store"
import { rulesVersion } from "../rules-version"
import { browser } from "$app/environment"

export type Fetched<T> = {
	result: T | undefined,
	fetching: boolean,
	error: Error | undefined
}

const DEFAULT_FETCHED = <T>(): Fetched<T> => ({ result: undefined, fetching: true, error: undefined })

export function srdStore<T>(load: (client: SrdClient) => Promise<T>): Readable<Fetched<T>> {
	return derived(rulesVersion, (edition, set) => {
		if (!browser) return

		let cancelled = false
		set(DEFAULT_FETCHED<T>())

		load(new SrdClient(edition))
			.then((result) => { if (!cancelled) set({ result, fetching: false, error: undefined }) })
			.catch((error) => { if (!cancelled) set({ result: undefined, fetching: false, error }) })

		return () => { cancelled = true }
	}, DEFAULT_FETCHED<T>())
}
