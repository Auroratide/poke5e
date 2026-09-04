import { derived } from "svelte/store"
import { currentEdition } from "$lib/site/edition"
import { BondEffects as BondEffects2018 } from "./BondEffects.2018"
import { BondEffects as BondEffects2024 } from "./BondEffects.2024"

export const BondEffects = derived(currentEdition, (rulesVersion) => rulesVersion === "2018" ? BondEffects2018 : BondEffects2024)
