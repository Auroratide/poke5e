import { rulesVersion } from "$lib/site/rules-version"
import { derived } from "svelte/store"
import {
	StandardNature as StandardNature2018,
	StandardNatures as StandardNatures2018,
} from "./StandardNature.2018"
import {
	StandardNature as StandardNature2024,
	StandardNatures as StandardNatures2024,
} from "./StandardNature.2024"
import { AbilityScoreImprovement } from "$lib/dnd/attributes"

export const StandardNatures = derived(rulesVersion, (rulesVersion) => rulesVersion === "2018" ? StandardNatures2018 : StandardNatures2024)

export const NatureEffect = derived(rulesVersion, (rulesVersion) => (nature: string) => {
	const table = rulesVersion === "2018" ? StandardNature2018 : StandardNature2024
	const effect: Partial<AbilityScoreImprovement> = table[nature]?.effect ?? {}
	const asi = {
		...AbilityScoreImprovement.zero(),
		...effect,
	}

	return asi
})