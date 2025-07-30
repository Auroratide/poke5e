import { derived } from "svelte/store"
import { rulesVersion } from "$lib/design/rules-version"
import { HitDice } from "$lib/dnd/hit-dice"

export const trainerHitDiceSize = derived(rulesVersion, (rulesVersion) =>
	rulesVersion === "2018" ? new HitDice("d8") : new HitDice("d6"),
)
