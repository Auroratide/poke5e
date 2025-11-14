import { readable, type Readable, type StartStopNotifier } from "svelte/store"

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