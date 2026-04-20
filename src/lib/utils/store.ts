import { browser } from "$app/environment"
import { readable, type Readable, type StartStopNotifier, get } from "svelte/store"

/**
 * This store caches the read result so we don't require a re-fetch every time
 * we drop to 0 subscribers.
 */
export function cachedReadable<T>(value: T, start: StartStopNotifier<T>): Readable<T> {
	let cache: T | undefined = undefined

	return readable(value, (set, update) => {
		if (cache != null) {
			set(cache)
		} else {
			start((value) => {
				cache = value
				set(value)
			}, (updater) => {
				update((value) => {
					const updated = updater(value)
					cache = updated
					return updated
				})
			})
		}
	})
}

export async function getWhenDefined<T>(store: Readable<T>, serverValue: T): Promise<T> {
	if (!browser) return serverValue

	const current = get(store)
	if (current != null) return current

	// overly safe tbh
	let unsubscribe: () => void = undefined
	return new Promise((resolve) => {
		unsubscribe = store.subscribe((value) => {
			if (value != null) {
				unsubscribe?.()
				resolve(value)
			}
		})
	})
}
