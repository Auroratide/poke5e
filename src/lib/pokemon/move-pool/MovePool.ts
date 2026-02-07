import { DataClass } from "$lib/DataClass"
import type { Move, MoveId } from "$lib/moves/Move"
import type { TmId } from "$lib/moves/tms/TmDetails"

export class MovePool extends DataClass<{
	start: MoveId[],
	level2?: MoveId[],
	level6?: MoveId[],
	level10?: MoveId[],
	level14?: MoveId[],
	level18?: MoveId[],
	egg?: MoveId[],
	tm?: TmId[],
}> {
	get start() { return this.data.start }
	get level2() { return this.data.level2 }
	get level6() { return this.data.level6 }
	get level10() { return this.data.level10 }
	get level14() { return this.data.level14 }
	get level18() { return this.data.level18 }
	get egg() { return this.data.egg }
	get tm() { return this.data.tm }

	canLearn(move: Move): boolean {
		const learnsAtLevel = [
			...(this.start ?? []),
			...(this.level2 ?? []),
			...(this.level6 ?? []),
			...(this.level10 ?? []),
			...(this.level14 ?? []),
			...(this.level18 ?? []),
		].includes(move.id)
		
		const learnsAsEgg = (this.egg ?? []).includes(move.id)
		const learnsViaTm = this.canLearnViaTm(move)
		
		return learnsAtLevel || learnsAsEgg || learnsViaTm
	}

	canLearnViaTm(move: Move): boolean {
		return move.tm != null ? (this.tm ?? []).includes(move.tm.id) : false
	}
}
