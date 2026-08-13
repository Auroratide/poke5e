import type { RequestHandler } from "./$types"
import pokemon from "../../../../../../static/data/pokemon.json"
import abilities from "../../../../../../static/data/abilities.json"
import { Ability } from "$lib/pokemon/ability"
import { translateData } from "$lib/site/i18n"

export const GET: RequestHandler = async ({ params }) => {
	const translatedAbilities = await translateData(
		abilities.items,
		async (locale) => (await import(`../../../../../../static/data/${locale}/abilities.json`)).items,
	)
	const translatedPokemon = await translateData(
		pokemon.items,
		async (locale) => (await import(`../../../../../../static/data/${locale}/pokemon.json`)).items,
	)
	const selectedPokemon = translatedPokemon.find(it => it.id === params.id)
	if (selectedPokemon !== undefined) {
		return new Response(JSON.stringify(Ability.normalizeList(translatedAbilities)(selectedPokemon)), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		})
	} else {
		return new Response(null, {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		})
	}
}
