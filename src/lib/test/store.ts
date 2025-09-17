import { type Readable, get } from "svelte/store"

export async function waitForStore<T>(store: Readable<T | undefined>, timeout = 5000) {
	const currentValue = get(store)
	if (currentValue != null) return currentValue

	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(new Error(`Store was not ready after ${timeout}ms`))
		}, timeout)

		const unsubscribe = store.subscribe((value) => {
			if (value != null) {
				clearTimeout(timer)
				unsubscribe()
				resolve(value)
			}
		})
	})
}
