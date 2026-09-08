import { TagList, type TagSelectionMode } from "$lib/poke5e/tags"
import type { TrainerPokemon } from "./types"

/**
 * The text-and-tag filter shared by the party roster and the Box.
 *
 * Lifted out of Roster.svelte because the box needed the same behaviour, and a
 * second copy of it would have drifted. The tag half is delegated to
 * TagList.filterBy, which is shared with the trainer and fakemon lists; only the
 * text half -- nickname and species -- is specific to a roster.
 *
 * Typing the exact name of a tag is treated as filtering by that tag rather than
 * as a nickname search, so the text box doubles as a tag picker. That is done by
 * folding the typed tag into the selected ones, which is what makes it obey the
 * All/Any mode instead of always widening the results.
 *
 * The quirks here are the original's: only the first hyphen of a species id is
 * spaced out, and the species id is compared without lowercasing it (ids are
 * already lowercase).
 *
 * @param text  the search box's contents
 * @param tags  tags ticked in the filter panel
 * @param mode  whether a pokemon must carry all of those tags or any of them
 * @param allTags every tag on the trainer's roster, used to spot the case above
 */
export const matchesPokemonFilter = (text: string, tags: string[], mode: TagSelectionMode, allTags: TagList) => {
	const query = text.toLocaleLowerCase()
	const textIsTagName = TagList.has(allTags, text)
	const matchesTags = TagList.filterBy(textIsTagName ? tags.concat([text]) : tags, mode)

	return (it: TrainerPokemon): boolean => {
		const matchesText = textIsTagName
			|| it.nickname.toLocaleLowerCase().includes(query)
			|| it.pokemonId.data.replace("-", " ").includes(query)

		return matchesTags(it) && matchesText
	}
}
