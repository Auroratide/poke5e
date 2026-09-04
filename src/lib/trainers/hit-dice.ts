import { derived } from "svelte/store"
import { currentEdition } from "$lib/site/edition"
import { HitDice } from "$lib/dnd/hit-dice"

const trainerHitDiceSize = derived(currentEdition, (rulesVersion) =>
	rulesVersion === "2018" ? new HitDice("d8") : new HitDice("d6"),
)

export const getTrainerHitDice = derived(trainerHitDiceSize, (size) => {
	return (customSize: HitDice | undefined) => {
		return customSize ?? size
	}
})
