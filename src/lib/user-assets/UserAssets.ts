
export class UserAssets {
	constructor(private readonly baseUrl: string) {}

	upload = async (url: string, file: File) => {
		const uploadResponse = await fetch(url, {
			method: "PUT",
			body: file,
			headers: {
				"Content-Type": file.type,
				"Content-Length": file.size.toString(),
			},
		})

		if (!uploadResponse.ok) {
			console.error(await uploadResponse.text())
			throw new UserAssetsError("Could not upload file.")
		}
	}

	getAssetUrl(name: string): string {
		return `${this.baseUrl}/${name}`
	}
}

export type ErrorDiagnostics = {
	code?: string,
	details?: string,
}

export class UserAssetsError extends Error {
	constructor(message: string, readonly diagnostics?: ErrorDiagnostics) {
		super(message + (diagnostics?.code ? ` Code: ${diagnostics.code}` : ""))
	}
}
