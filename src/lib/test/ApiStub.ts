import type { Ability } from "$lib/pokemon/ability"
import { Url } from "$lib/site/url"

class ApiStubDefinition {
	abilities: Ability[] = []

	resolve = (url: string): Response | undefined => {
		if (url.includes(Url.api.abilities())) {
			return new Response(JSON.stringify({
				abilities: this.abilities.map((it) => it.data),
			}))
		} else {
			return undefined
		}
	}
}

export const ApiStub = new ApiStubDefinition()
