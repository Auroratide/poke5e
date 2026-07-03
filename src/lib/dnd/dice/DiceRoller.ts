export interface DiceRoller {
	roll: (sides: number) => number
}

export class RandomDiceRoller implements DiceRoller {
	static readonly instance = new RandomDiceRoller()

	roll(sides: number): number {
		return Math.floor(Math.random() * sides) + 1
	}

	*multiroll(sides: number, times: number): Generator<number> {
		for (let i = 0; i < times; ++i) {
			yield this.roll(sides)
		}
	}
}
