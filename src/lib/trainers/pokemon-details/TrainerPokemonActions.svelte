<script lang="ts">
	import type { PokemonSpecies } from "$lib/creatures/species"
	import Button from "$lib/design/Button.svelte"
	import { ActionArea } from "$lib/ui/forms"
	import { EvolutionStore } from "$lib/pokemon/evolution"
	import { Url } from "$lib/url"
	import { PageAction } from "../page-action"
	import type { TrainerStore } from "../trainers"
	import type { TrainerPokemon } from "../types"

	const evolutions = EvolutionStore.all()

	export let species: PokemonSpecies
	export let trainer: TrainerStore
	export let pokemon: TrainerPokemon
</script>

<ActionArea>
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.removePokemon)}" variant="ghost">Remove</Button>
	{#if $evolutions?.evolvesTo(species.id).length > 0}
		<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.evolvePokemon)}" variant="ghost">Evolve</Button>
	{/if}
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.restPokemon)}" variant="success">Rest</Button>
	<Button href="{Url.trainers($trainer.info.readKey, pokemon.id, PageAction.editPokemon)}">Edit</Button>
</ActionArea>