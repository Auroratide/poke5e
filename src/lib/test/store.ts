import { type Readable, get } from "svelte/store"

const TIMEOUT = 2500

export async function waitForStore<T>(store: Readable<T | undefined>, condition = (value: T) => value != null): Promise<T> {
	const currentValue = get(store)
	if (condition(currentValue)) return currentValue

	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			reject(new Error(`Store was not ready after ${TIMEOUT}ms`))
		}, TIMEOUT)

		const unsubscribe = store.subscribe((value) => {
			if (condition(value)) {
				clearTimeout(timer)
				unsubscribe()
				resolve(value)
			}
		})
	})
}
