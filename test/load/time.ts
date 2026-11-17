export type TimeOnceResult = {
	elapsedMs: number,
	error?: Error,
}

export async function timeOnce(fn: () => PromiseLike<unknown>): Promise<TimeOnceResult> {
	const start = performance.now()
	let error: Error | undefined = undefined

	try {
		await fn()
	} catch (e) {
		error = new Error("Encountered error while timing", { cause: e })
	}

	const end = performance.now()

	return {
		elapsedMs: end - start,
		error,
	}
}

export type TimeManyResult = {
	minMs: number,
	maxMs: number,
	avgMs: number,
	// Messages rather than Errors, since Errors serialize to {} in the JSON report
	errors: string[]
}

export async function timeMany(n: number, label: string, fn: (iteration: number) => PromiseLike<unknown>): Promise<TimeManyResult> {
	const results: TimeOnceResult[] = []
	for (let i = 0; i < n; ++i) {
		const timed = await timeOnce(() => fn(i))
		results.push(timed)
	}

	const withoutErrors = results.filter((it) => it.error == null)
	if (withoutErrors.length === 0) {
		throw new Error(`${label} failed all ${n} timing attempts, last error is presented as the cause.`, { cause: results[results.length - 1].error })
	}

	const ms = withoutErrors.map((it) => it.elapsedMs)
	const minMs = Math.min(...ms)
	const maxMs = Math.max(...ms)
	const avgMs = ms.reduce((a, b) => a + b, 0) / ms.length

	return {
		minMs,
		maxMs,
		avgMs,
		errors: results.filter((it) => it.error != null).map((it) => errorMessage(it.error)),
	}
}

function errorMessage(error: Error): string {
	return error.cause instanceof Error ? error.cause.message : error.message
}
