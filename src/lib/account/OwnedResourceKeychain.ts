export type OwnedResource = {
	readKey: string
	writeKey?: string
}

export interface OwnedResourceKeychain {
	get: (readKey: string) => OwnedResource | undefined
	add: (resource: OwnedResource) => Promise<void>
	remove: (readKey: string) => Promise<void>
	list: () => Promise<OwnedResource[]>
}

