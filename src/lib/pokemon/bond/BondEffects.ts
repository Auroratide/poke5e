import { derived } from "svelte/store"
import { rulesVersion } from "$lib/design/rules-version"
import { BondEffects as BondEffects2018 } from "./BondEffects.2018"
import { BondEffects as BondEffects2024 } from "./BondEffects.2024"

export const BondEffects = derived(rulesVersion, (rulesVersion) => rulesVersion === "2018" ? BondEffects2018 : BondEffects2024)
