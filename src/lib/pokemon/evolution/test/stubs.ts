import type { Data } from "$lib/DataClass"
import { Evolution } from "../Evolution"
import type { EvolutionJson, EvolutionListJson } from "$lib/srd/evolutions/schema"

let evoId = 0
const nextEvoId = () => `evo-${++evoId}`

export function stubEvolution(template: Partial<Data<Evolution>>): Evolution {
	return new Evolution({
		id: nextEvoId(),
		from: "eevee",
		to: "flareon",
		conditions: [ {
			type: "level",
			value: 6,
		} ],
		effects: [ {
			type: "asi",
			value: 10,
		} ],
		...template,
	})
}

export function stubEvolutionJson(template: Partial<EvolutionJson>): EvolutionJson {
	return {
		id: nextEvoId(),
		from: "eevee",
		to: "flareon",
		conditions: [ {
			type: "level",
			value: 6,
		} ],
		effects: [ {
			type: "asi",
			value: 10,
		} ],
		...template,
	}
}

export function stubEvolutionListJson(...values: EvolutionJson[]): EvolutionListJson {
	return {
		values,
	}
}
