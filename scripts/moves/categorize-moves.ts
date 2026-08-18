import { getMoveData, writeMoveData, type MoveData } from "./files.ts"
import { getOneShowdownMove, type ShowdownMove } from "./showdown.ts"
import { superconsole } from "../superconsole.ts"

// Ability-Based Categories
// ========================================================
// Ballistic (Bulletproof)
// Biting (Strong Jaw)
// Dance (Dancer)
// Explosive (Damp)
// Powder (Overcoat)
// Pulse (Mega Launcher)
// Punch (Iron Fist)
// Slicing (Sharpness)
// Sound (Soundproof, Liquid Voice, Punk Rock)
// Wind (Wind Rider, Wind Power)
// Multistrike (Skill Link)

/** Categories that map one-to-one onto a showdown move flag. */
const FLAG_CATEGORIES: Record<string, string> = {
	ballistic: "bullet",
	biting: "bite",
	dance: "dance",
	powder: "powder",
	pulse: "pulse",
	punch: "punch",
	slicing: "slicing",
	sound: "sound",
	wind: "wind",
}

// Damp is not flag-driven in any data source; it just blocks these four moves.
const EXPLOSIVE_MOVES = ["explosion", "mind-blown", "misty-explosion", "self-destruct"]

// Categories the games cannot tell us about: moves we invented, and moves whose 5e
// description diverges from the video game. Merged on top of whatever the flags say.
const MANUAL_CATEGORIES: Record<string, string[]> = {}

const categoriesOf = (move: MoveData, showdown: ShowdownMove | undefined): string[] => {
	const categories = new Set(MANUAL_CATEGORIES[move.id] ?? [])

	if (EXPLOSIVE_MOVES.includes(move.id)) categories.add("explosive")

	if (showdown != null) {
		Object.entries(FLAG_CATEGORIES)
			.filter(([, flag]) => showdown.flags?.[flag])
			.forEach(([category]) => categories.add(category))

		// Skill Link only affects moves that hit a *variable* number of times, so a
		// fixed-hit move like Bonemerang does not count as multistrike.
		if (Array.isArray(showdown.multihit)) categories.add("multistrike")
	}

	return [...categories].sort()
}

/**
 * Adds categories to all moves. If a move has no categories, then it gets an empty list of categories.
 */
async function main() {
	const moves = await getMoveData()

	const unmatched: string[] = []
	const counts: Record<string, number> = {}

	const categorized: MoveData[] = []
	for (const move of moves) {
		const showdown = await getOneShowdownMove(move.id)

		if (showdown == null) unmatched.push(move.id)

		const categories = categoriesOf(move, showdown)
		categories.forEach((category) => counts[category] = (counts[category] ?? 0) + 1)

		categorized.push({ ...move, categories })
	}

	await writeMoveData(categorized)

	Object.entries(counts)
		.sort(([a], [b]) => a.localeCompare(b))
		.forEach(([category, count]) => superconsole.log(`${category.padEnd(12)} ${count}`))

	if (unmatched.length > 0) {
		superconsole.failure(`\n${unmatched.length} moves are not in the showdown data and were categorized by hand only:`)
		unmatched.forEach((id) => superconsole.log(`  ${id}`))
	}

	superconsole.success(`\nCategorized ${categorized.length} moves!`)
}

main()
