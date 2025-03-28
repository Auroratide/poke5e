import type { Pokemon } from "$lib/creatures/types"
import type { Ability } from "./types"

export function pokemonWithAbilities(abilities: Ability[], pokemon: Pokemon[]): Record<Ability["id"], Pokemon[]> {
	if (abilities == null || pokemon == null || abilities?.length === 0 || pokemon?.length === 0)
		return {}

	const pokemonHasAbility = (ability: Ability) => (pokemon: Pokemon) =>
		pokemon.abilities.find((it) => it.id === ability.id) != null

	return abilities.reduce((all, ability) => ({
		...all,
		[ability.id]: pokemon.filter(pokemonHasAbility(ability)),
	}), {})
}
