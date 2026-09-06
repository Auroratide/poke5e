import { srdStore } from "$lib/site/stores"
import type { ContestEffectListJson } from "$lib/srd/contest-effects/schema"
import type { ContestListJson } from "$lib/srd/contest/schema"
import type { MovesListJson } from "$lib/srd/moves/schema"
import type { TmListJson } from "$lib/srd/tms/schema"
import { Move } from "./Move"

const toMoves = ([moves, contests, effects, tms]: [MovesListJson, ContestListJson, ContestEffectListJson, TmListJson]): Move[] => {
	const contestByMove = new Map(contests.values.map((it) => [it.id, it]))
	const effectById = new Map(effects.values.map((it) => [it.id, it]))
	const tmByMove = new Map(tms.values.map((it) => [it.move, it]))

	return moves.values.map((move) => {
		const contest = contestByMove.get(move.id)

		return Move.fromJson(move, {
			contest: contest,
			contestEffect: contest != null ? effectById.get(contest.effect) : undefined,
			tm: tmByMove.get(move.id),
		})
	})
}

export const MovesStore = srdStore((client) =>
	Promise.all([
		client.moves.all(),
		client.contest.all(),
		client.contestEffects.all(),
		client.tms.all(),
	]).then(toMoves),
)
