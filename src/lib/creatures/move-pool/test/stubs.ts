import type { Data } from "$lib/DataClass"
import { MovePool } from "../MovePool"

export function stubMovePool(template: Partial<Data<MovePool>> = {}): MovePool {
	return new MovePool({
		start: ["helping-hand", "tackle", "tail-whip", "charm", "sand-attack", "baby-doll-eyes"],
		level2: [],
		level6: ["swift", "sing"],
		level10: ["heal-pulse", "encore", "quick-attack", "refresh"],
		level14: [ "follow-me", "me-first", "last-resort", "baton-pass"],
		level18: ["hyper-beam", "trump-card"],
		tm: [1, 10, 11, 15, 16, 17, 18, 20, 21, 27, 30, 32, 33, 42, 44, 45, 46, 48, 49, 68, 87, 88, 90, 96, 100],
		egg: [],
		...template,
	})
}
