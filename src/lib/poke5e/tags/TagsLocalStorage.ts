import { TagList } from "./TagList"

function key(identifier): string {
	return `tags::${identifier}`
}

export const TagsLocalStorage = {
	get(identifier: string): TagList {
		const fromStorage = localStorage.getItem(key(identifier))
		return TagList.from(
			fromStorage ? JSON.parse(fromStorage) : [],
		)
	},
	set(identifier: string, list: TagList) {
		localStorage.setItem(key(identifier), JSON.stringify(list))
	},
	remove(identifier: string) {
		localStorage.removeItem(key(identifier))
	},
} as const
