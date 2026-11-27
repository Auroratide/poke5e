import { FakemonLocalKeychain } from "./FakemonLocalKeychain"
import type { OwnedResourceKeychain } from "./OwnedResourceKeychain"

export const FakemonKeychain: OwnedResourceKeychain = {
	list: FakemonLocalKeychain.list,
}
