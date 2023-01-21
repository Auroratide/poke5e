export const difference = <T>(l: T[]) => (r: T[]): T[] =>
    l.filter((it) => !r.includes(it))
