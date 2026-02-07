import type { ContestMoveEffect } from "../ContestMoveEffect"

export function stubContestMoveEffect(template: Partial<ContestMoveEffect> = {}): ContestMoveEffect {
	return {
		id: "1",
		name: "Quite an appealing move.",
		effect: "A crowd favorite. No extra effects.",
		...template,
	}
}
