export type ContestMoveEffectId = string

export type ContestMoveEffect = {
	id: ContestMoveEffectId,
	name: string,
	effect: string,
}

type DenormalizedContestMove = {
	effect: ContestMoveEffectId
}

type NormalizedContestMove = {
	effect: ContestMoveEffect
}

export const ContestMoveEffect = {
	normalizeContestId<T>(denormalized: (T & DenormalizedContestMove), effects: ContestMoveEffect[]): (T & NormalizedContestMove) {
		return {
			...denormalized,
			effect: effects.find((effect) => effect.id === denormalized.effect),
		}
	}
}
