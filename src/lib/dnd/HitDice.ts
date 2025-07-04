export const HitDice = ["d4", "d6", "d8", "d10", "d12", "d20"] as const
export type HitDice = typeof HitDice[number]

export function isHitDice(dice: string): dice is HitDice {
	return (HitDice as unknown as string[]).includes(dice)
}
