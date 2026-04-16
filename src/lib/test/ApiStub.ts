import type { PokemonJsonResponse } from "$lib/poke5e/species/PokemonJsonResponse"
import type { Ability } from "$lib/pokemon/ability"
import { stubAbility } from "$lib/pokemon/ability/test/stubs"
import { Url } from "$lib/site/url"
import abilitiesSample from "./abilities-sample.json"

class ApiStubDefinition {
	abilities: Ability[] = abilitiesSample.items.map((it) => stubAbility({
		referenceId: it.id,
		name: it.name,
		description: it.description,
	}))

	pokemon: PokemonJsonResponse = {
		items: [],
	}

	resolve = (url: string): Response | undefined => {
		if (url.includes(Url.api.abilities())) {
			return new Response(JSON.stringify({
				abilities: this.abilities.map((it) => ({
					...it.data,
					id: it.referenceId,
				})),
			}))
		} else if (url.includes(Url.api.pokemon())) {
			return new Response(JSON.stringify(this.pokemon))
		} else {
			return undefined
		}
	}
}

export const ApiStub = new ApiStubDefinition()
