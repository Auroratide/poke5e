import { rulesVersion } from "$lib/site/rules-version"
import { derived } from "svelte/store"
import { StandardNatures as StandardNatures2018 } from "./StandardNature.2018"
import { StandardNatures as StandardNatures2024 } from "./StandardNature.2024"

export const StandardNatures = derived(rulesVersion, (rulesVersion) => rulesVersion === "2018" ? StandardNatures2018 : StandardNatures2024)
