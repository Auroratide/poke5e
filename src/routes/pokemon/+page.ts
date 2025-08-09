import type { PageLoad } from "./$types"
import { base } from "$app/paths"
import { Attributes } from "$lib/dnd/attributes"
import { SkillRanks } from "$lib/dnd/skills"
import { PokemonType } from "$lib/pokemon/types-2"
import { GenderRatio } from "$lib/creatures/gender"
import { HitDice } from "$lib/dnd/hit-dice"
import { SpeciesRating } from "$lib/creatures/sr"

export const load: PageLoad = async ({ fetch }) => {
	const pokemon = await fetch(`${base}/pokemon.json`)
		.then(res => res.json())
		.then((data) => data.items.map((it) => ({
			...it,
			sr: new SpeciesRating(it.sr),
			gender: new GenderRatio(it.gender),
			type: new PokemonType(it.type),
			skills: SkillRanks.fromList(it.skills),
			attributes: new Attributes(it.attributes),
			hitDice: new HitDice(it.hitDice),
		})))

	return { pokemonList: pokemon }
}
