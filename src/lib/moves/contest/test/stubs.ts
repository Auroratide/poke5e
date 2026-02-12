import { ContestDetails } from "../ContestDetails"
import type { ContestMoveEffect } from "../ContestMoveEffect"

export function stubContestMoveEffect(template: Partial<ContestMoveEffect> = {}): ContestMoveEffect {
	return {
		id: "1",
		name: "Quite an appealing move.",
		effect: "A crowd favorite. No extra effects.",
		...template,
	}
}

export function stubContestDetails(template: Partial<ContestDetails> = {}): ContestDetails {
	return new ContestDetails({
		contest: "beauty",
		appeal: 1,
		jam: 0,
		effect: stubContestMoveEffect(),
		...template,
	})
}
