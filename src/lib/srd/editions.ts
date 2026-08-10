const EDITIONS = ["2018", "2024"] as const

export type Edition = (typeof EDITIONS)[number]

export const isEdition = (v: string): v is Edition =>
	(EDITIONS as readonly string[]).includes(v)

export const createEntryGenerator = () => () => EDITIONS.map((edition) => ({ edition }))
