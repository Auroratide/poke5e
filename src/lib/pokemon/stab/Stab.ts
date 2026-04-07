import { DataClass } from "$lib/DataClass"

export type StabBase = "default" | "movepower" | "proficiency" | "ruleset18" | "none"

export class Stab extends DataClass<{
	base: StabBase,
	bonus: number,
}> {
	get base() { return this.data.base }
	get bonus() { return this.data.bonus }
}