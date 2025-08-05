export const difference = <T>(l: T[]) => (r: T[]): T[] =>
	l.filter((it) => !r.includes(it))

export const equalUnordered = <T>(l: T[]) => (r: T[]): boolean =>
	l.every((it) => r.includes(it)) && r.every((it) => l.includes(it))

export const alphabetical = (a: string, b: string) =>
	a.localeCompare(b)
