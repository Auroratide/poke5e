import { FakemonLocalKeychain } from "./FakemonLocalKeychain"
import type { OwnedResourceKeychain } from "./OwnedResourceKeychain"

export const FakemonKeychain: OwnedResourceKeychain = {
	get: FakemonLocalKeychain.get,
	add: FakemonLocalKeychain.add,
	remove: FakemonLocalKeychain.remove,
	list: FakemonLocalKeychain.list,
}
