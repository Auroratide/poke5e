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
