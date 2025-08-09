import type { Data } from "$lib/DataClass"
import type { Fakemon, ReadKey } from "../Fakemon"

const KEY_PREFIX = "fakemon::"

type FakemonIdentifyingInfo = Pick<Data<Fakemon>, "id" | "readKey" | "writeKey">

const lsKey = (readKey: ReadKey) => `${KEY_PREFIX}${readKey}`

function get(readKey: ReadKey): FakemonIdentifyingInfo | undefined {
	const key = lsKey(readKey)

	const value = localStorage.getItem(key)
	try {
		const data = JSON.parse(value)

		return {
			...data,
			readKey: readKey,
		}
	} catch (e) {
		console.warn(e)
		return undefined
	}
}

function add(value: FakemonIdentifyingInfo) {
	const previous = get(value.readKey)

	const key = lsKey(value.readKey)

	localStorage.setItem(key, JSON.stringify({
		id: value.id ?? previous.id,
		writeKey: value.writeKey ?? previous.writeKey,
	}))
}

export const FakemonLocalStorage = {
	get,
	add,
} as const
