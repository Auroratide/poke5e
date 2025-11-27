import type { ReadWriteKey } from "../types"

const getReadKeys = (): ReadWriteKey[] =>
	localStorage.getItem("trainers")?.split(",")?.filter((it) => it !== "") ?? []

const addReadKey = (key: ReadWriteKey) => {
	const previous = getReadKeys()
	const newList = [...new Set(previous.concat(key))]
	localStorage.setItem("trainers", newList.join(","))
}

const removeReadKey = (key: ReadWriteKey) => {
	const previous = getReadKeys()
	const newList = previous.filter((it) => it !== key)
	localStorage.setItem("trainers", newList.join(","))
}

const getReadKey = (writeKey: ReadWriteKey): ReadWriteKey | undefined =>
	getReadKeys().find((readKey) => getWriteKey(readKey) === writeKey)

const getWriteKey = (readKey: ReadWriteKey): ReadWriteKey | undefined =>
	localStorage.getItem(`write:${readKey}`)

const addWriteKey = (readKey: ReadWriteKey, writeKey: ReadWriteKey) => {
	localStorage.setItem(`write:${readKey}`, writeKey)
}

const removeWriteKey = (readKey: ReadWriteKey) => {
	localStorage.removeItem(`write:${readKey}`)
}

export const TrainerLocalStorage = {
	getReadKeys,
	addReadKey,
	removeReadKey,
	getReadKey,
	getWriteKey,
	addWriteKey,
	removeWriteKey,
} as const
