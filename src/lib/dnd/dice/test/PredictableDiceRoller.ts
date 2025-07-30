import type { DiceRoller } from "../DiceRoller"

export class PredictableDiceRoller implements DiceRoller {
	constructor(private readonly rolls: number[]) {}

	roll(): number {
		return this.rolls.shift()
	}
}
