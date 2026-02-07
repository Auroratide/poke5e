<script lang="ts">
	import type { PokemonSpecies } from "$lib/poke5e/species"
	import { Button } from "$lib/ui/elements"
	import { ActionArea } from "$lib/ui/forms"
	import { EvolutionStore } from "$lib/pokemon/evolution"
	import { Url } from "$lib/site/url"
	import { PageAction } from "../page-action"
	import type { TrainerStore } from "../trainers"
	import type { TrainerPokemon } from "../types"
	import { m } from "$lib/site/i18n";

	const evolutions = EvolutionStore.all()

	export let species: PokemonSpecies
	export let trainer: TrainerStore
	export let pokemon: TrainerPokemon
</script>

<ActionArea>
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.removePokemon)}" variant="ghost">{m["universal.remove"]()}</Button>
	{#if $evolutions?.evolvesTo(species.id).length > 0}
		<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.evolvePokemon)}" variant="ghost">{m["universal.evolve"]()}</Button>
	{/if}
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.restPokemon)}" variant="success">{m["universal.rest"]()}</Button>
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.editPokemon)}">{m["universal.edit"]()}</Button>
</ActionArea>