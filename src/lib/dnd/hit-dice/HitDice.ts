import { DataClass } from "$lib/DataClass"

export const HitDiceSize = ["d4", "d6", "d8", "d10", "d12", "d20"] as const
export type HitDiceSize = typeof HitDiceSize[number]

export class HitDice extends DataClass<HitDiceSize> {
	static readonly list = HitDiceSize

	static isHitDice(dice: string): dice is HitDiceSize {
		return (HitDiceSize as unknown as string[]).includes(dice)
	}
}