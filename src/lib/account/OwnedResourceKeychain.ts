export type OwnedResource = {
	readKey: string
	writeKey?: string
}

export interface OwnedResourceKeychain {
	get: (readKey: string) => OwnedResource | undefined
	list: () => Promise<OwnedResource[]>
}

