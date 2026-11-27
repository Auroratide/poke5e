import { FakemonLocalKeychain } from "./FakemonLocalKeychain"
import type { OwnedResourceKeychain } from "./OwnedResourceKeychain"

export const FakemonKeychain: OwnedResourceKeychain = {
	get: FakemonLocalKeychain.get,
	list: FakemonLocalKeychain.list,
}
