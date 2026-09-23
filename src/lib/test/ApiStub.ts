import type { Ability } from "$lib/pokemon/ability"
import { stubAbility } from "$lib/pokemon/ability/test/stubs"
import type { PokemonListJson } from "$lib/srd/pokemon/schema"
import type { EvolutionListJson } from "$lib/srd/evolutions/schema"
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

	pokemon: PokemonListJson = {
		values: [],
	}

	evolutions: EvolutionListJson = {
		values: [],
	}

	resolve = (url: string): Response | undefined => {
		if (isSrd(url, "abilities")) {
			return new Response(JSON.stringify({
				values: this.abilities.map((it) => ({
					...it.data,
					id: it.referenceId,
				})),
			}))
		} else if (isSrd(url, "pokemon")) {
			return new Response(JSON.stringify(this.pokemon))
		} else if (isSrd(url, "evolutions")) {
			return new Response(JSON.stringify(this.evolutions))
		} else {
			return undefined
		}
	}
}

export const ApiStub = new ApiStubDefinition()
