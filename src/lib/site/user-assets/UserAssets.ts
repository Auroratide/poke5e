import { DetailedError } from "$lib/site/errors/DetailedError"

export class UserAssets {
	constructor(private readonly baseUrl: string) {}

	upload = async (url: string, file: File) => {
		// Only the host is included; the full presigned URL contains a signature.
		const fileDetails = `Host: ${hostOf(url)}; Type: ${file.type || "unknown"}; Size: ${file.size} bytes`

		let uploadResponse: Response
		try {
			uploadResponse = await fetch(url, {
				method: "PUT",
				body: file,
				headers: {
					"Content-Type": file.type,
				},
			})
		} catch (e) {
			throw new UserAssetsError("Could not upload file; the upload request did not complete.", fileDetails, e)
		}

		if (!uploadResponse.ok) {
			const body = await uploadResponse.text().catch(() => "")
			console.error(body)
			throw new UserAssetsError("Could not upload file.", `Status: ${uploadResponse.status}; ${fileDetails}`, body || undefined)
		}
	}

	getAssetUrl(name: string): string {
		return `${this.baseUrl}/${name}`
	}
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
