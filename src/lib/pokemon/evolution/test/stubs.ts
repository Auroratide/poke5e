import type { Data } from "$lib/DataClass"
import { Evolution } from "../Evolution"
import type { EvolutionJsonResponse, SingleEvolutionJsonResponse } from "../EvolutionJsonResponse"

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

export function stubSingleEvolutionJsonResponse(template: Partial<SingleEvolutionJsonResponse>): SingleEvolutionJsonResponse {
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

export function stubEvolutionJsonResponse(...values: SingleEvolutionJsonResponse[]): EvolutionJsonResponse {
	return {
		items: values,
	}
}
