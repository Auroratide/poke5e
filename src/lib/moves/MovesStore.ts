import { srdStore } from "$lib/site/stores"
import type { MovesListJson } from "$lib/srd/moves/schema"
import { Move } from "./Move"

const toMoves = (json: MovesListJson): Move[] => {
	return json.values.map((it) => new Move(it))
}

export const MovesStore = srdStore((client) =>
	client.moves.all()
		.then(toMoves),
)
