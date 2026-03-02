import type { Level } from "$lib/dnd/level"
import type { MovePool } from "$lib/pokemon/move-pool"
import * as list from "$lib/utils/list"
import type { MoveId } from "./Move"

function chooseMoves(pool: MovePool, targetLevel: Level): MoveId[] {
	const available = pool.availableAtLevel(targetLevel)
	list.shuffleArray(available)

	return available.slice(0, 4)
}

export const MovesetGenerator = {
	chooseMoves,
} as const
