export type TagList = string[]

export const TagList = {
	empty(): TagList {
		return []
	},
	from(tags: string[]): TagList {
		return tags.reduce((list, tag) => TagList.add(list, tag), [])
	},
	copy(list: TagList): TagList {
		return [...list]
	},
	has(list: TagList, tag: string): boolean {
		return list.includes(tag.toLocaleLowerCase())
	},
	add(list: TagList, tag: string): TagList {
		if (TagList.has(list, tag))
			return list
		return [...list, tag.toLocaleLowerCase()]
	},
	merge(a: TagList, b: TagList): TagList {
		return Array.from(new Set([...a, ...b]))
	},
	remove(list: TagList, tag: string): TagList {
		return list.filter((it) => it !== tag.toLocaleLowerCase())
	},
	equal(a: TagList, b: TagList): boolean {
		return a.every((a) => b.includes(a)) && b.every((b) => a.includes(b))
	},
} as const
