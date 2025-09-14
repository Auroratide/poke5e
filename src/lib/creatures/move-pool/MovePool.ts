import { DataClass } from "$lib/DataClass"

export class MovePool extends DataClass<{
	start: string[],
	level2?: string[],
	level6?: string[],
	level10?: string[],
	level14?: string[],
	level18?: string[],
	egg?: string[],
	tm?: number[],
}> {}
