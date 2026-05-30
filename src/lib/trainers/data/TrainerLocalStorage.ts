import { TagList, TagsLocalStorage } from "$lib/poke5e/tags"
import type { PokemonId, ReadWriteKey } from "../types"

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

const tags = {
	getTrainer: (readKey: ReadWriteKey) => TagsLocalStorage.get(readKey),
	setTrainer: (readKey: ReadWriteKey, tags: TagList) => TagsLocalStorage.set(readKey, tags),
	getPokemon: (readKey: ReadWriteKey, pokemon: PokemonId) => TagsLocalStorage.get(`${readKey}:${pokemon}`),
	setPokemon: (readKey: ReadWriteKey, pokemon: PokemonId, tags: TagList) => TagsLocalStorage.set(`${readKey}:${pokemon}`, tags),
} as const

export const TrainerLocalStorage = {
	getReadKeys,
	addReadKey,
	removeReadKey,
	getReadKey,
	getWriteKey,
	addWriteKey,
	removeWriteKey,
	tags,
} as const
