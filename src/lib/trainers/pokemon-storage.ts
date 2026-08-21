import type { TrainerPokemon } from "./types"

/**
 * The Box: a trainer's PC storage, one flat unlimited list per trainer.
 *
 * How the feature hangs together, for anyone reading the diff:
 *
 * - There is no box table and no second array. A trainer still has exactly one
 *   `pokemon` list, in the store and in the database, and this single field
 *   decides which of the two on-screen lists a pokemon renders in. Roster.svelte
 *   splits that list with the predicates below, and it is the only place that
 *   does; everything downstream is handed a party or a box, never both.
 * - `rank`, the column that orders a roster, is shared by the two lists. A boxed
 *   pokemon keeps its rank while it sits in the box, so a deposit never
 *   renumbers the party; a withdrawal takes MAX(rank) + 1, so it rejoins at the
 *   end. That is why reorder_pokemon has to be handed the whole roster and never
 *   just the party -- see reorderTeam in trainers.ts.
 * - Only an explicit deposit or withdrawal moves a pokemon. update_pokemon does
 *   not write the column at all, so saving a stale copy of a pokemon (from the
 *   editor, a rest, a tag change) cannot relocate it.
 * - supabase/migrations/*_pokemon_box.sql carries the schema side of this: why
 *   it is a column on private.pokemon rather than a table, why it is a location
 *   rather than a boolean, and why set_pokemon_storage is its own function.
 */
export enum PokemonStorage {
	Party = "party",
	Box = "box",
}

/**
 * Party membership is an allowlist, never `!== Box`. The set of valid locations
 * is pinned by a CHECK constraint rather than by convention, but if a third one
 * is ever added, pokemon kept there must not silently turn up in the party --
 * they should be invisible until a list is written for them.
 */
export const isInParty = (pokemon: TrainerPokemon): boolean =>
	pokemon.storage === PokemonStorage.Party

export const isInBox = (pokemon: TrainerPokemon): boolean =>
	pokemon.storage === PokemonStorage.Box
