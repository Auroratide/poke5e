import type { TagSelectionMode } from "./TagSelectionMode"
import { alphabetical } from "$lib/utils/list"

export type TagList = string[]

export const TagList = {
	empty(): TagList {
		return []
	},
	from(tags: string[]): TagList {
		return tags.reduce((list, tag) => TagList.add(list, tag), []).toSorted(alphabetical)
	},
	copy(list: TagList): TagList {
		return [...list]
	},
	has(list: TagList, tag: string): boolean {
		return list.includes(tag.toLocaleLowerCase())
	},
	overlaps(a: TagList, b: TagList): boolean {
		return a.some((a) => b.includes(a))
	},
	subsets(subset: TagList, fullSet: TagList): boolean {
		return subset.every((a) => fullSet.includes(a))
	},
	add(list: TagList, tag: string): TagList {
		if (TagList.has(list, tag))
			return list
		return [...list, tag.toLocaleLowerCase()].toSorted(alphabetical)
	},
	merge(a: TagList, b: TagList): TagList {
		return Array.from(new Set([...a, ...b])).toSorted(alphabetical)
	},
	remove(list: TagList, tag: string): TagList {
		return list.filter((it) => it !== tag.toLocaleLowerCase())
	},
	equal(a: TagList, b: TagList): boolean {
		return a.every((a) => b.includes(a)) && b.every((b) => a.includes(b))
	},

	filterBy(filterTags: TagList, mode: TagSelectionMode): (hasTags: { tags: TagList }) => boolean {
		const textFilterIsTagName = false
		const $trainerListFilterValue = ""

		return ({ tags }) => {
			const noTagsSpecified = filterTags.length === 0 && !textFilterIsTagName
			const hasDesiredTags = mode === "all" ? TagList.subsets(filterTags, tags) : TagList.overlaps(tags, filterTags) 
			const tagIsExplicitlySearched = textFilterIsTagName && TagList.has(tags, $trainerListFilterValue)

			return noTagsSpecified || hasDesiredTags || tagIsExplicitlySearched
		}
	},
} as const
