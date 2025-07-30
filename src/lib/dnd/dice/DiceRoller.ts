export interface DiceRoller {
	roll: (sides: number) => number
}

export class RandomDiceRoller implements DiceRoller {
	static readonly instance = new RandomDiceRoller()

	roll(sides: number): number {
		return Math.floor(Math.random() * sides) + 1
	}
}
