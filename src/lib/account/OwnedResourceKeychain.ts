export type OwnedResource = {
	readKey: string
	writeKey?: string
}

export interface OwnedResourceKeychain {
	list: () => Promise<OwnedResource[]>
}

