export function measureTime<T>(toTime: () => T): {
	value: T,
	elapsedMs: number,
} {
	const start = Date.now()
	const value = toTime()
	const end = Date.now()

	return {
		value: value,
		elapsedMs: end - start,
	}
}
