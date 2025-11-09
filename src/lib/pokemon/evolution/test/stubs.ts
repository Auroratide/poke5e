import type { Data } from "$lib/DataClass"
import { Evolution } from "../Evolution"
import type { EvolutionJsonResponse, SingleEvolutionJsonResponse } from "../EvolutionJsonResponse"

export function stubEvolution(template: Partial<Data<Evolution>>): Evolution {
	return new Evolution({
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
