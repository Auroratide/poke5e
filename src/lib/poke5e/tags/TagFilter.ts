import { writable, type Writable } from "svelte/store"
import { TagList } from "./TagList"
import { DefaultTagSelectionMode, type TagSelectionMode } from "./TagSelectionMode"

export type TagFilter = {
	tags: TagList,
	mode: TagSelectionMode,
}

export type TagFilterStore = Writable<TagFilter>

export const TagFilter = {
	empty(): TagFilter {
		return { tags: TagList.empty(), mode: DefaultTagSelectionMode }
	},

	store(): TagFilterStore {
		return writable(TagFilter.empty())
	},

	reset(store: TagFilterStore) {
		store.set(TagFilter.empty())
	},

	applicable(filter: TagFilter, offered: TagList): TagList {
		return filter.tags.filter((it) => TagList.has(offered, it))
	},
} as const
