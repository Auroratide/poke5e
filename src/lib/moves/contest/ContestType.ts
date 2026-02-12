import { m } from "$lib/site/i18n"

export type ContestType = "cool" | "beauty" | "cute" | "clever" | "tough"

export const ContestType = {
	list: ["cool", "beauty", "cute", "clever", "tough"] as ContestType[],
	name(type: ContestType): string {
		return {
			cool: () => m["moves.cool"](),
			beauty: () => m["moves.beauty"](),
			cute: () => m["moves.cute"](),
			clever: () => m["moves.clever"](),
			tough: () => m["moves.tough"](),
		}[type]()
	},
}
