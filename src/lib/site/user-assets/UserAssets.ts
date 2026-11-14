import { DetailedError } from "$lib/site/errors/DetailedError"

export type UserAssetsOptions = {
	/**
	 * How long to wait before each retry. An array of length 2 retries twice.
	 */
	retryDelaysMs?: number[],

	/**
	 * Called when an upload succeeds only after retrying, for logging.
	 */
	onRecovered?: (details: string) => void,
}

type AttemptResult =
	| { type: "ok" }
	| { type: "network-error", error: unknown }
	| { type: "bad-response", response: Response }

export class UserAssets {
	private readonly retryDelaysMs: number[]
	private readonly onRecovered: (details: string) => void

	constructor(private readonly baseUrl: string, options: UserAssetsOptions = {}) {
		this.retryDelaysMs = options.retryDelaysMs ?? [500, 1500]
		this.onRecovered = options.onRecovered ?? (() => {})
	}

	upload = async (url: string, file: File) => {
		// Only the host is included; the full presigned URL contains a signature.
		const fileDetails = `Host: ${hostOf(url)}; Type: ${file.type || "unknown"}; Size: ${file.size} bytes`
		const maxAttempts = this.retryDelaysMs.length + 1

		let result: AttemptResult
		let attempts = 0
		while (attempts < maxAttempts) {
			result = await this.attemptUpload(url, file)
			attempts += 1

			if (!isRetryable(result) || attempts >= maxAttempts) break

			await sleep(this.retryDelaysMs[attempts - 1])
		}

		const attemptDetails = `Attempts: ${attempts}; ${fileDetails}`

		if (result.type === "ok") {
			if (attempts > 1) {
				this.onRecovered(attemptDetails)
			}

			return
		}

		if (result.type === "network-error") {
			throw new UserAssetsError("Could not upload file; the upload request did not complete.", attemptDetails, result.error)
		}

		const body = await result.response.text().catch(() => "")
		console.error(body)
		throw new UserAssetsError("Could not upload file.", `Status: ${result.response.status}; ${attemptDetails}`, body || undefined)
	}

	getAssetUrl(name: string): string {
		return `${this.baseUrl}/${name}`
	}

	private attemptUpload = async (url: string, file: File): Promise<AttemptResult> => {
		try {
			const response = await fetch(url, {
				method: "PUT",
				body: file,
				headers: {
					"Content-Type": file.type,
				},
			})

			return response.ok ? { type: "ok" } : { type: "bad-response", response }
		} catch (error) {
			return { type: "network-error", error }
		}
	}
}

function isRetryable(result: AttemptResult): boolean {
	if (result.type === "network-error") return true
	if (result.type === "bad-response") return result.response.status >= 500 || result.response.status === 429

	return false
}

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function hostOf(url: string): string {
	try {
		return new URL(url).host
	} catch {
		return "invalid url"
	}
}

export class UserAssetsError extends DetailedError {
	constructor(message: string, details: string, cause?: unknown) {
		super(message, details, cause)
	}
}
