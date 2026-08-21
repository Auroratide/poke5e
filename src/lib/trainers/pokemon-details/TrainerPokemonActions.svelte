<script lang="ts">
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { EvolutionStore } from "$lib/pokemon/evolution"
	import { Url } from "$lib/site/url"
	import { PageAction } from "../page-action"
	import type { TrainerStore } from "../trainers"
	import type { TrainerPokemon } from "../types"
	import { m } from "$lib/site/i18n"
	import { PokemonStorage, isInParty } from "../pokemon-storage"

	const evolutions = EvolutionStore.all()

	export let species: PokemonSpecies
	export let trainer: TrainerStore
	export let pokemon: TrainerPokemon

	$: canEdit = $trainer.update != null
	$: inParty = isInParty(pokemon)

	// Moving a pokemon between the party and the box is undone by the very same
	// button, so it happens on the spot instead of through a confirmation card.
	// Removal, which cannot be undone, still gets one.
	let moving = false
	const move = () => {
		moving = true
		$trainer.update?.setStorage(pokemon.id, inParty ? PokemonStorage.Box : PokemonStorage.Party)
			// setStorage has already surfaced the error; this only re-enables the
			// button so the move can be retried.
			.catch(() => {})
			.finally(() => {
				moving = false
			})
	}
</script>

<ActionArea>
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.removePokemon)}" variant="danger">{m.remove()}</Button>
	{#if pokemon.level.isBelowMax()}
		<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.levelUp)}" variant="subtle">{m.levelUp()}</Button>
	{/if}
	{#if ($evolutions?.evolvesTo(species.id).length ?? 0) > 0}
		<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.evolvePokemon)}" variant="subtle">{m.evolve()}</Button>
	{/if}
	{#if canEdit}
		<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.transferPokemon)}" variant="subtle">{m.transfer()}</Button>
		<Button on:click={move} disabled={moving} variant="subtle">{inParty ? m["trainers.deposit"]() : m["trainers.withdraw"]()}</Button>
	{/if}
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.restPokemon)}" variant="success">{m.rest()}</Button>
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.editPokemon)}">{m.edit()}</Button>
</ActionArea>