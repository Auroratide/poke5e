import type { Data } from "$lib/DataClass"
import type { Fakemon, ReadKey } from "../Fakemon"

const KEY_PREFIX = "fakemon::"
const INITIALIZATION_KEY = "fakemon-initialization"

type FakemonIdentifyingInfo = Pick<Data<Fakemon>, "id" | "readKey" | "writeKey">

const lsKey = (readKey: ReadKey) => `${KEY_PREFIX}${readKey}`

function get(readKey: ReadKey): FakemonIdentifyingInfo | undefined {
	const key = lsKey(readKey)

	const value = localStorage.getItem(key)
	if (value == null) return undefined

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
		id: value.id ?? previous?.id,
		writeKey: value.writeKey ?? previous?.writeKey,
	}))
}

function list(): FakemonIdentifyingInfo[] {
	const result: FakemonIdentifyingInfo[] = []

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

function remove(readKey: ReadKey) {
	const key = lsKey(readKey)
	localStorage.removeItem(key)
}

/**
 * The site originally had some residue "official" fakemon. Now that
 * Fakemon are officially a feature, we can remove these. But to maintain
 * some level of documentation-level backward compatibility, we'll seed
 * everyone with the "official" fakemon that they can either use or
 * discard.
 * 
 * Note: These values only work in production. They'll fail silently in
 * local environment.
 */
function initializeOriginalOfficialFakemon() {
	if (localStorage.getItem(INITIALIZATION_KEY) == null) {
		// Brawleon
		add({
			id: "f5d3c413-13ab-46b4-baac-cb6a9456569d",
			readKey: "M0VQPQMCKB5BZ",
		})

		// Minereon
		add({
			id: "12627782-bfd0-417a-a5c2-d50a3de4e55e",
			readKey: "VCDM1WSWKX3XC",
		})

		// Droideon
		add({
			id: "ae965fd8-b4a9-4eac-b10f-ffe3644cf4c8",
			readKey: "XDRJZRS1PKK7V",
		})

		// Rookite
		add({
			id: "9c6112af-c5f0-495c-8c4f-9c95497805e1",
			readKey: "BWMC6BSH0WZDR",
		})

		// Terreon
		add({
			id: "e7c00151-a545-43ec-aadb-ade06569db62",
			readKey: "4EXG4UUMEBV5S",
		})

		// Belseraph
		add({
			id: "86d8122a-fd96-48ec-b91a-bd3ad97268f2",
			readKey: "CER1BHMJSG4J9",
		})

		// Specteon
		add({
			id: "dbbfd85c-78f5-4c2b-858a-b220e062c544",
			readKey: "S67VFHXFN9MF7",
		})

		// Eeveon
		add({
			id: "43e41160-23e9-4b13-b59f-8b28e0651d88",
			readKey: "7SBDF1PSXS533",
		})

		// Pesteon
		add({
			id: "b5a1c8a2-4fbd-44a2-93a5-b10bedb91acf",
			readKey: "MTBTQKX47K09J",
		})

		// Aereon
		add({
			id: "202df03e-35e4-4e9b-885e-7d196e268ea8",
			readKey: "8544V64Y4WZH7",
		})

		// Drakeon
		add({
			id: "a75de62b-6cfb-43db-9074-34c484b2d829",
			readKey: "6WD99HM090QTG",
		})

		// Toxeon
		add({
			id: "7c8522c4-a3f1-4111-b5c1-a7c30bb3d159",
			readKey: "JPMYYCBZBD19G",
		})

		localStorage.setItem(INITIALIZATION_KEY, "true")
	}
}

export const FakemonLocalStorage = {
	get,
	add,
	list,
	remove,
	initializeOriginalOfficialFakemon,
} as const
