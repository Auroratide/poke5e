import type { RulesInfo } from "$lib/poke5e/rules"
import { Url } from "$lib/site/url"

export const meta: RulesInfo = {
	name: "Shiny Pokémon",
	url: Url.rules.shinyPokemon(),
	keywords: ["shiny", "shinies", "encounter", "wild"],
}
