export const difference = <T>(l: T[]) => (r: T[]): T[] =>
	l.filter((it) => !r.includes(it))

export const equalUnordered = <T>(l: T[]) => (r: T[]): boolean =>
	l.every((it) => r.includes(it)) && r.every((it) => l.includes(it))

export const alphabetical = (a: string, b: string) =>
	a.localeCompare(b)

/**
 * Note: Shuffles in place
 * Source - https://stackoverflow.com/a/12646864
 * Posted by Laurens Holst, modified by community. See post 'Timeline' for change history
 * Retrieved 2026-03-02, License - CC BY-SA 4.0
 */
export function shuffleArray<T>(array: T[]): T[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]
	}

	return array
}

export function reorderOne<T>(array: T[], from: number, to: number): T[] {
	if (from < 0 || from >= array.length || to < 0 || to >= array.length) {
		throw new Error(`Attempted to reorder list of size ${array.length} from ${from} to ${to}`)
	}

	const newList = [...array]
	const [reordered] = newList.splice(from, 1)
	newList.splice(to, 0, reordered)

	return newList
}

/**
 * Applies a reordering that was observed within a rendered subset back onto the
 * full list, leaving items outside the subset where they are.
 *
 * A drag handle only ever reports indices into what is actually on screen, so a
 * filtered list -- or one split into a party and a box -- cannot hand those
 * indices straight to the full array. Doing that was already wrong before the
 * Box existed: dragging within a filtered roster moved whichever pokemon
 * happened to sit at that index in the unfiltered list.
 *
 * `reorderedSubset` must be a permutation of `subset`; items are poured back
 * into the slots the subset occupied, so anything outside it does not move.
 */
export function applyOrderToSubset<T>(all: T[], subset: T[], reorderedSubset: T[], id: (it: T) => string): T[] {
	const subsetIds = new Set(subset.map(id))
	const remaining = [...reorderedSubset]

	return all.map((it) => subsetIds.has(id(it)) ? remaining.shift()! : it)
}

export function fromCommaOrNewlineString(str: string): string[] {
	return str
		.split(/[,\n]/)
		.map((it) => it.trim())
		.filter((it) => it.length > 0)
}

export function sortAccordingTo<T, U>(toSort: T[], accordingTo: U[], toSortId: (it: T) => string, accordingToId: (it: U) => string): T[] {
	const order = new Map(accordingTo.map((item, i) => [accordingToId(item), i]))
	return toSort.sort((a, b) => order.get(toSortId(a)) - order.get(toSortId(b)))
}

export function replaceOrAddById<T>(arr: T[], replacement: T, id: (it: T) => string): T[] {
	const index = arr.findIndex((it) => id(it) === id(replacement))
	if (index < 0) {
		return [...arr, replacement]
	}

	const newList = [...arr]
	newList[index] = replacement

	return newList
}