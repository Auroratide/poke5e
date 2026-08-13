
import type { RequestHandler } from "./$types"
import pokemon from "../../../../static/data/pokemon.json"
import abilities from "../../../../static/data/abilities.json"
import evolutions from "../../../../static/data/evolution.json"
import { Evolution } from "$lib/pokemon/evolution"
import type { Data } from "$lib/DataClass"
import { Ability } from "$lib/pokemon/ability"
import { translateData } from "$lib/site/i18n"

export const prerender = true

export const GET: RequestHandler = async () => {
	const evolutionItems = evolutions.items as Data<Evolution>[]
	const translatedAbilities = await translateData(
		abilities.items,
		async (locale) => (await import(`../../../../static/data/${locale}/abilities.json`)).items,
	)
	const translatedPokemon = await translateData(
		pokemon.items,
		async (locale) => (await import(`../../../../static/data/${locale}/pokemon.json`)).items,
	)

	return new Response(JSON.stringify({
		items: translatedPokemon
			.map(Ability.normalizeList(translatedAbilities))
			.map(Evolution.normalizeList(evolutionItems)),
	}), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	})
}
