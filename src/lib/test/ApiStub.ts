import type { PokemonJsonResponse } from "$lib/poke5e/species/PokemonJsonResponse"
import type { Ability } from "$lib/pokemon/ability"
import { stubAbility } from "$lib/pokemon/ability/test/stubs"
import type { EvolutionJsonResponse } from "$lib/pokemon/evolution/EvolutionJsonResponse"
import { Url } from "$lib/site/url"
import abilitiesSample from "./abilities-sample.json"

function isSrd(url: string, resource: string) {
	return url.includes("srd") && url.includes(`${resource}.json`)
}

class ApiStubDefinition {
	abilities: Ability[] = abilitiesSample.items.map((it) => stubAbility({
		referenceId: it.id,
		name: it.name,
		description: it.description,
	}))

	pokemon: PokemonJsonResponse = {
		items: [],
	}

	evolutions: EvolutionJsonResponse = {
		items: [],
	}

	resolve = (url: string): Response | undefined => {
		if (isSrd(url, "abilities")) {
			return new Response(JSON.stringify({
				values: this.abilities.map((it) => ({
					...it.data,
					id: it.referenceId,
				})),
			}))
		} else if (url.includes(Url.api.abilities())) {
			return new Response(JSON.stringify({
				abilities: this.abilities.map((it) => ({
					...it.data,
					id: it.referenceId,
				})),
			}))
		} else if (url.includes(Url.api.pokemon())) {
			return new Response(JSON.stringify(this.pokemon))
		} else if (url.includes(Url.api.evolutions())) {
			return new Response(JSON.stringify(this.evolutions))
		} else {
			return undefined
		}
	}
}

export const ApiStub = new ApiStubDefinition()
