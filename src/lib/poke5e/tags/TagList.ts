export type TagList = string[]

export const TagList = {
	empty(): TagList {
		return []
	},
	from(tags: string[]): TagList {
		return tags.reduce((list, tag) => TagList.add(list, tag), [])
	},
	has(list: TagList, tag: string): boolean {
		return list.includes(tag.toLocaleLowerCase())
	},
	add(list: TagList, tag: string): TagList {
		if (TagList.has(list, tag))
			return list
		return [...list, tag.toLocaleLowerCase()]
	},
	remove(list: TagList, tag: string): TagList {
		return list.filter((it) => it !== tag.toLocaleLowerCase())
	},
} as const
