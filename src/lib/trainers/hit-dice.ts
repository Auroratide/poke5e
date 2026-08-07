import { derived } from "svelte/store"
import { rulesVersion } from "$lib/site/rules-version"
import { HitDice } from "$lib/dnd/hit-dice"

const trainerHitDiceSize = derived(rulesVersion, (rulesVersion) =>
	rulesVersion === "2018" ? new HitDice("d8") : new HitDice("d6"),
)

export const getTrainerHitDice = derived(trainerHitDiceSize, (size) => {
	return (customSize: HitDice | undefined) => {
		return customSize ?? size
	}
})
