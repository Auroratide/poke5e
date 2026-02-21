import { m } from "$lib/site/i18n"

export type ContestType = "cool" | "beauty" | "cute" | "clever" | "tough"

export const ContestType = {
	list: ["cool", "beauty", "cute", "clever", "tough"] as ContestType[],
	name(type: ContestType): string {
		return {
			cool: () => m["movesSection.cool"](),
			beauty: () => m["movesSection.beauty"](),
			cute: () => m["movesSection.cute"](),
			clever: () => m["movesSection.clever"](),
			tough: () => m["movesSection.tough"](),
		}[type]()
	},
}
