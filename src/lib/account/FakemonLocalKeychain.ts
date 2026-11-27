import type { OwnedResource, OwnedResourceKeychain } from "./OwnedResourceKeychain"

const KEY_PREFIX = "fakemon::"

const lsKey = (readKey: string) => `${KEY_PREFIX}${readKey}`

function get(readKey: string): OwnedResource | undefined {
	const key = lsKey(readKey)

	const value = localStorage.getItem(key)
	if (value == null) return undefined

	try {
		const data = JSON.parse(value)

		return {
			writeKey: data.writeKey,
			readKey: readKey,
		}
	} catch (e) {
		console.warn(e)
		return undefined
	}
}

function syncList() {
	const result: OwnedResource[] = []

	for (let i = 0; i < localStorage.length; ++i) {
		const key = localStorage.key(i)
		if (!key.startsWith(KEY_PREFIX)) continue

		const item = get(key.split("::")[1])
		if (item != null) {
			result.push(item)
		}
	}

	return result
}

async function list() {
	return syncList()
}

export const FakemonLocalKeychain: OwnedResourceKeychain & {
	syncList: () => OwnedResource[],
} = {
	list,
	syncList,
}
