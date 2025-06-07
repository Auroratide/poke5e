import { derived } from "svelte/store"
import { rulesVersion } from "$lib/design/rules-version"
import type { HitDice } from "$lib/dnd/types"

export const trainerHitDiceSize = derived(rulesVersion, (rulesVersion) =>
	rulesVersion === "2018" ? "d8" as HitDice : "d6" as HitDice,
)
